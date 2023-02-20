import { ApiProperty } from '@nestjs/swagger';
import { Fav } from 'src/favs/entities/fav.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  grammy: boolean;

  @ManyToOne(() => Fav, (fav) => fav.artists)
  favId: string;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
