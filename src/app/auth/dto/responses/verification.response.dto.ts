export default class VerificationResponseDto {
  constructor(data: VerificationResponseDto) {
    this.isVerified = data.isVerified;
  }
  isVerified: boolean;
}
