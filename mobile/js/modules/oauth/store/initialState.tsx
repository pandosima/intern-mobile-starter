import {jwtDecode} from 'jwt-decode';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export type TokenInfo = {
  access_token?: string;
  refresh_token?: string;
  sub?: string | number;
  iat?: number;
  exp?: number;
  nbf?: number;
  scope: string;
  scopes: string[];
};

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  scope: string;
}

export type User = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  active?: boolean;
};

export function extractTokenInfo(data: any): TokenInfo {
  const {access_token, refresh_token} = data;
  const {sub, iat, exp, nbf, scope} = jwtDecode<JwtPayload>(access_token);
  return {
    access_token: access_token,
    refresh_token: refresh_token,
    sub: sub,
    iat: iat,
    exp: exp,
    nbf: nbf,
    scope: scope,
    scopes: scope.split(' '),
  };
}

export type Credential = {
  username?: string;
  password?: string;
  rememberMe?: boolean;
};

interface OauthState {
  tokenInfo: TokenInfo;
  credential: Credential;
  currentUser: User;
  loggingIn?: boolean;
  loggingOut?: boolean;
  refreshingToken?: boolean;
  fetchingUser?: boolean;
  registering?: boolean;
}

export default {
  tokenInfo: {
    access_token: '',
    refresh_token: '',
    sub: '',
    iat: 0,
    exp: 0,
    nbf: 0,
    scope: '',
    scopes: [],
  },
  credential: {
    username: '',
    password: '',
    rememberMe: false,
  },
  currentUser: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    active: false,
  },
  loggingIn: false,
  loggingOut: false,
  refreshingToken: false,
  fetchingUser: false,
  registering: false,
} satisfies OauthState as OauthState;
