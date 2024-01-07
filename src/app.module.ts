import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './app/product/product.module';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    ProductModule,
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}
