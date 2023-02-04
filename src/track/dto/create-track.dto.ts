import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
