import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

//region [[ Request ]]
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자를 포함해야 합니다',
  })
  password: string;
}

export class CreateAdminUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자를 포함해야 합니다',
  })
  password: string;

  @IsIn(['OPERATOR', 'AUDITOR', 'ADMIN'])
  role: string;
}

export class SignInDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자를 포함해야 합니다',
  })
  password: string;
}

export class GetLoginHistDto {
  @IsString()
  user_key: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  start_date: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  end_date: Date;
}

export class getUsersDto {
  @IsOptional()
  @IsString()
  role: string;
}

export class putUserRoleDto {
  @IsString()
  user_key: string;

  @IsIn(['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'])
  role: string;
}

//endregion
