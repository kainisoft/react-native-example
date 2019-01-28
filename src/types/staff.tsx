import { StateStandard } from '../app/actions';
import { Entity } from '../services/entity';

export interface State extends StateStandard {
  staff: StaffEntityList;
}

export interface StaffEntity extends Entity {
  address: string;
  email: string;
  name: string;
  photo_url: string;
  telephone: string;
  type: number;
}

export type StaffEntityList = StaffEntity[];
