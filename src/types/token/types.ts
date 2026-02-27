
export interface RefreshToken { 
  refreshToken: string; 
}

export interface Token {
 accessToken: string
 refreshToken: string
}

export type AccessToken = Pick<Token , 'accessToken'>