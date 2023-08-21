import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('favTrack')
export class FavTrackEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  trackId: string;

  @ManyToOne(() => TrackEntity, (track) => track.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  track: TrackEntity;
}
