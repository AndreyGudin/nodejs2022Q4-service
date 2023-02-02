import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsInt()
  year: number;
  @IsNotEmpty()
  artistId: string | null;
}
