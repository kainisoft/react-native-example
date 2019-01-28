import { Action } from 'redux';
import {State as AuthState} from '../types/auth';
import {State as BanquetState} from '../types/banquet';
import {State as StaffState} from '../types/staff';
import {State as ScheduleState} from '../types/schedule';
import {State as DictionaryState} from '../types/dictionary';

export interface GlobalState {
  authState: AuthState,
  banquetState: BanquetState,
  staffState: StaffState,
  scheduleState: ScheduleState,
  dictionaryState: DictionaryState
}

export type GetState = () => GlobalState;

export interface StateStandard {

}

export interface PayloadStandard {

}

export class ActionStandard<S extends StateStandard, P extends PayloadStandard> implements Action {
  payload: P;
  context: any;

  constructor(payload: P) {
    this.payload = payload;
  }

  static get class() {
    return this.prototype.constructor;
  }

  get type() {
    const prototype = Object.getPrototypeOf(this);

    return prototype.constructor;
  }

  toObject() {
    const { type, payload } = this;

    return { type, payload, context: this };
  }

  handler(state: S, payload: P): S {
    return state;
  }

  protected merge(...args: any) {
    return Object.assign({} ,...args);
  }

}
