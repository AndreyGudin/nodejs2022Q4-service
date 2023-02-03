import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Fav {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
