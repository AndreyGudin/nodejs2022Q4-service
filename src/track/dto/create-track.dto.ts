import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  artistId: string | null;
  @ApiProperty()
  albumId: string | null;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
