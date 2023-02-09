import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artistId: string;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  albumId: string;
  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
