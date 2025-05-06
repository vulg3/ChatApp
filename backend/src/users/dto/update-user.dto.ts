import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsArray()
  friends?: string[];

  @IsOptional()
  @IsArray()
  blockedUsers?: string[];
}
