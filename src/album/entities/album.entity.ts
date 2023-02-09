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

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  year: number;

  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  @ApiProperty()
  artistId: string;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
