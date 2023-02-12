import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: string;
  @Column({ type: 'text', nullable: true })
  artistId: string;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: string;
  @Column({ type: 'text', nullable: true })
  albumId: string;

  @Column()
  duration: number;

  @ManyToOne(() => Fav, (fav) => fav.tracks)
  favId: string;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
