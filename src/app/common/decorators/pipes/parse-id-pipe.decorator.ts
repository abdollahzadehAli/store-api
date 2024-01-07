import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isInt, isPositive } from 'class-validator';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any) {
    if (isNaN(value)) {
      throw new BadRequestException(
        `${value} is not a valid number for id. Id must be a positive integer number.`,
      );
    }
    if (value) {
      value = parseInt(value);
      if (!isPositive(value) || !isInt(value)) {
        throw new BadRequestException(
          `${value} is not a valid number for id. Id must be a positive integer number.`,
        );
      }
      return value;
    }
  }
}
