import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/responses/user.response.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async profile(@GetUser() user: User) {
    return new UserResponseDto(await this.userService.profile(user));
  }
}
