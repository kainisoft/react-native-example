import { StateStandard } from '../app/actions';
import { Entity } from '../services/entity';
import { StaffEntity } from './staff';

export interface State extends StateStandard {
  banquets: BanquetEntityList;
  group: GroupBanquet;
}

export interface BanquetEntity extends Entity {
  date: string;
  guests_adult: number;
  place_obj: {
    id: number;
    name: string;
    photo_url: string;
  };
  staff_occ: BanquetStaffList
}

export type BanquetEntityList = BanquetEntity[];
export type BanquetStaffList = BanquetStaff[];

export interface BanquetStaff extends Entity {
  staff: StaffEntity;
  staff_id: string;
  type: number;
}

export interface GroupStaffList {
  [key: string]: BanquetStaffList;
}

export interface GroupBanquet {
  [key: string]: BanquetEntityList;
}

export interface ManageBanquetEntity extends Entity {
  guests: number;
  time: string;
  type: string;
  place_id: string;
}
