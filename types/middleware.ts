export interface DecodedAuthUser {
  id: string;
  address: string;
  name: string | undefined;
  username: string | undefined;
  sub: string;
  type: "client" | string;
  v: number;
  exp: number;
}
