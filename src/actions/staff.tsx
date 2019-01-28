import { ActionStandard } from '../app/actions';
import { State, StaffEntity, StaffEntityList } from '../types/staff';

export class StaffSaveSuccess extends ActionStandard<State, StaffEntity> {

  handler(state: State, payload: StaffEntity): State {
    const staff = state.staff.concat(payload);

    return this.merge({
      ...state,
      ...{staff}
    });
  }
}

export class StaffLoadSuccess extends ActionStandard<State, StaffEntityList> {

  handler(state: State, staff: StaffEntityList): State {
    return {
      ...state,
      ...{staff}
    };
  }
}

export class StaffAssignSuccess extends ActionStandard<State, {}> {

}
