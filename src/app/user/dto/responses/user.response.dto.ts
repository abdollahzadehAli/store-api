import { User } from '../../entities/user.entity';

export class UserResponseDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  token: string;
}
