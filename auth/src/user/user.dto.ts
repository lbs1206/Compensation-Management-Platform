import { IsString, MinLength, MaxLength, Matches } from 'class-validator';


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

    @IsString()
    @MinLength(2)
    @MaxLength(30)
    role: string;
}

//endregion