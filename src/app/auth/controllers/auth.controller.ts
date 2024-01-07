import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/requests/signUp.dto';
import { VerificationDto } from '../dto/requests/verification.dto';
import { LoginDto } from '../dto/requests/login.dto';
import { JwtTokenResponseDto } from '../dto/responses/jwt-token.response.dto';
import { Public } from '../decorators/is-public.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('verification')
  async verification(@Body() verificationDto: VerificationDto) {
    return await this.authService.verification(verificationDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JwtTokenResponseDto> {
    return await this.authService.login(loginDto);
  }
}
