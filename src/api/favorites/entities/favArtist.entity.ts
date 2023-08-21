import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('favArtist')
export class FavArtistEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  artist: ArtistEntity;
}
