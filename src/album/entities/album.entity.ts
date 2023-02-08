import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  year: number;

  @OneToOne(() => Artist)
  @JoinColumn()
  @ApiProperty()
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
