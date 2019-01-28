import { PayloadStandard, StateStandard } from '../app/actions';
import { Entity } from '../services/entity';

export interface State extends StateStandard {
  past: ScheduleEntityList;
  future: ScheduleEntityList;
}

export interface ScheduleEntity extends Entity {
  date: string;
  place_name: string;
  guests_adult: number;
}

export type ScheduleEntityList = ScheduleEntity[];

export interface Payload extends PayloadStandard, State {

}
