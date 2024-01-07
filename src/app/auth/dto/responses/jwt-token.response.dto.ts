export class JwtTokenResponseDto {
  constructor(token: string) {
    this.token = token;
  }
  token: string;
}
