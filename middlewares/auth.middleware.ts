import { NextFunction, Request, Response } from "express";
import { DecodedAuthUser } from "../types";
import { getAddress } from "ethers/lib/utils";
import { getLogger } from "../utils";
import { constants } from "ethers";

import jwt from "jsonwebtoken";

const log = getLogger(__filename);

const decodeAccessToken = (request: Request): DecodedAuthUser | undefined => {
  try {
    const token: string | undefined = request.headers.authorization?.replace(
      "Bearer ",
      ""
    );
    // const token: string | undefined = request.headers["atlantis-world-access-token"] as string | undefined;
    const decoded = jwt.verify(
      token !== undefined ? token : "",
      process.env.JWT_SECRET ?? ""
    ) as DecodedAuthUser;
    log.verbose("decoded", decoded);

    return decoded;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const AuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let decodedAddress: string = constants.AddressZero;

  try {
    const decodedUser = decodeAccessToken(request);
    decodedAddress = getAddress(
      decodedUser?.username?.toLocaleLowerCase().trim() ?? constants.AddressZero
    );
    log.verbose("decodedAddress", decodedAddress);

    request.body["decoded-user"] = decodedUser;
    request.headers["decoded-address"] = decodedAddress;
  } catch (error) {
    log.error(error);
    decodedAddress = constants.AddressZero;
  }

  if (decodedAddress === getAddress(constants.AddressZero)) {
    return response.status(401).json({
      status: 401,
      error: "The decoded address is not valid.",
    });
  }

  next();
};
