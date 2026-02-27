
class TokenManager {
  private accessToken: string | null = null;

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  public clearTokens(): void {
    this.accessToken = null
    localStorage.removeItem('refreshToken')
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token)
  }
}

export const tokenManager = new TokenManager()
