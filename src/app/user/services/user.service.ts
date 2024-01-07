import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessService } from '../../base/business.service';
import { RegistrationStatus } from '../enums/registration.status.enum';

@Injectable()
export class UserService extends BusinessService<User> {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async profile(user: User) {
    await this.assertOrFail(user.id);
    return user;
  }

  async findForVerification(email: string) {
    return await this.userRepository.findOne({
      where: { email, registrationStatus: RegistrationStatus.PENDING },
    });
  }

  async findForLogin(email: string) {
    return await this.userRepository.findOne({
      where: { email, registrationStatus: RegistrationStatus.REGISTERED },
    });
  }
}
