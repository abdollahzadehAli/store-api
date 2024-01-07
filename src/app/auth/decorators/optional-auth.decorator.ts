import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { OptionalGuard } from '../guards/optional-gaurd';

export const OptionalAuth = () => {
  return applyDecorators(
    SetMetadata('isAuthOptional', true),
    UseGuards(OptionalGuard),
  );
};
