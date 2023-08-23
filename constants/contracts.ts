import { constants } from "ethers";
import { Chain } from "../types/chains";

export const ATLANTEAN_QUEST_REWARDS_ADDR: Record<Chain, string> = {
  [Chain.Avalanche]: "0xf8583c1E7455AFAfd109d56D9fCE2716E1fa498f",
  [Chain.Polygon]: constants.AddressZero, // ! not supported yet
};
