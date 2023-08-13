import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('favAlbum')
export class FavAlbumEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  albumId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  album: AlbumEntity;
}
