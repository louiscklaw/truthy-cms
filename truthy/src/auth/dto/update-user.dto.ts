import { IsBoolean, IsEmail, IsIn, IsString, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { UserStatusEnum } from 'src/auth/user-status.enum';

const statusEnumArray = [UserStatusEnum.ACTIVE, UserStatusEnum.INACTIVE, UserStatusEnum.BLOCKED];
/**
 * update user data transfer object
 */
export class UpdateUserDto {
  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  address1: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  address2: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  contact: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  state: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  meny_service: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  user_type: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  avatar: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsBoolean()
  contact_info_public: boolean;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsBoolean()
  hasDiscount: boolean;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsBoolean()
  isVerified: boolean;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsBoolean()
  isTwoFAEnabled: boolean;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsBoolean()
  available_to_hire: boolean;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsIn(statusEnumArray, {
    message: `isIn-{"items":"${statusEnumArray.join(',')}"}`,
  })
  status: UserStatusEnum;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  roleId: number;
}
