import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  artistId: string | null;
  @IsNotEmpty()
  albumId: string | null;
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
