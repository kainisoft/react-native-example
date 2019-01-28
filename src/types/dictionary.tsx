import { StateStandard } from '../app/actions';
import { Entity } from '../services/entity';

export enum DictionaryType {
  BANQUET_PLACE = 'place',
  BANQUET_TYPE = 'occasion_types',
  STAFF_TYPE = 'staff_types'
}

type DictionaryTypeState = {
  readonly [key in DictionaryType]: DictionaryEntityList;
}

export interface State extends DictionaryTypeState, StateStandard {

}

export interface DictionaryOriginal extends Entity {

}

export interface DictionaryPlaceOriginal extends DictionaryOriginal {
  address: string;
  name: string;
  photo_url: string;
  type: any;
}

export interface DictionaryStaffTypeOriginal extends DictionaryOriginal {
  val: string;
  name: string
}

export type DictionaryOriginalList = DictionaryOriginal[];

export interface DictionaryEntity extends Entity {
  readonly displayName: string;
  readonly originalDictionary: DictionaryOriginal | DictionaryPlaceOriginal | DictionaryStaffTypeOriginal;
}

export type DictionaryEntityList = DictionaryEntity[];

export type onSelectDictionary = (dictionary: DictionaryEntity) => void;

export interface DictionaryNavigationParams {
  title: string;
  type: DictionaryType;
  onSelect: onSelectDictionary;
  selected?: string;
}
