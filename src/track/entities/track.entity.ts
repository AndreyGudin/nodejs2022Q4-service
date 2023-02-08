import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artistId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  albumId: string | null;
  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
