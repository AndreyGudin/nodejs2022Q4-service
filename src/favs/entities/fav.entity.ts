import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('fav')
export class Fav {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Artist, (artist) => artist.favId)
  @JoinColumn({ name: 'artistId' })
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favId)
  @JoinColumn()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favId)
  @JoinColumn()
  tracks: Track[];

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }

  createResponse() {
    const { albums, artists, tracks } = this;
    return { albums, artists, tracks };
  }
}

export class FavoritesResponse {
  @ApiProperty()
  artists: Artist[];
  @ApiProperty()
  albums: Album[];
  @ApiProperty()
  tracks: Track[];
}
