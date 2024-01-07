import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../../base/business.entity';
import { Exclude } from 'class-transformer';
import { Product } from '../../product/entities/product.entity';
import { RegistrationStatus } from '../enums/registration.status.enum';

@Entity()
export class User extends BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  verificationCode: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: RegistrationStatus, nullable: true })
  registrationStatus: RegistrationStatus;

  @Column({ nullable: true })
  lastLogin: Date;

  @OneToMany(() => Product, (product: Product) => product.createdBy)
  products: Product[];
}
