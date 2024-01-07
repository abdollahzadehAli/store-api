import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { comparePassword, encodePassword } from '../../utils/bcrypt';
import { SignUpDto } from '../dto/requests/signUp.dto';
import { DataSource } from 'typeorm';
import { RegistrationStatus } from '../../user/enums/registration.status.enum';
import { VerificationDto } from '../dto/requests/verification.dto';
import { LoginDto } from '../dto/requests/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenResponseDto } from '../dto/responses/jwt-token.response.dto';
import { JwtPayload } from '../jwt-payload-interface';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findForLogin(email);

      if (user && comparePassword(password, user.password)) {
        const payload: JwtPayload = { email };
        await this.userService.updateByIdTransactional(
          user.id,
          { lastLogin: new Date() },
          user,
          queryRunner,
        );
        await queryRunner.commitTransaction();
        return new JwtTokenResponseDto(
          await this.jwtService.signAsync(payload),
        );
      }
      throw new UnauthorizedException();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async signUp(registerDto: SignUpDto) {
    const { firstName, lastName, email, password } = registerDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findByEmail(email);
      if (user) {
        throw new UnprocessableEntityException('user already exists');
      }
      const encodedPassword = encodePassword(password);
      const validationCode = Math.random().toString().split('.')[1].slice(0, 5);
      await this.userService.saveTransactional(
        {
          email,
          firstName,
          lastName,
          password: encodedPassword,
          registrationStatus: RegistrationStatus.PENDING,
          validationCode,
        },
        null,
        queryRunner,
      );
      await this.mailService.send(email, validationCode);
      await queryRunner.commitTransaction();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async verification(verificationDto: VerificationDto) {
    const { verificationCode, email } = verificationDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findForVerification(email);

      if (user && verificationCode == user.validationCode) {
        await this.userService.updateByIdTransactional(
          user.id,
          {
            registrationStatus: RegistrationStatus.REGISTERED,
            validationCode: null,
          },
          user,
          queryRunner,
        );
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
