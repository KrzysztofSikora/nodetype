import { IsString } from 'class-validator';

export class CreateZombieDto {
  @IsString()
  public name: string;
}
