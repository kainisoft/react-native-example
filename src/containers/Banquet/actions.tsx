import { AnyAction, Dispatch } from 'redux';
import { BanquetAssignStaffSuccess } from '../../actions/banquet';
import { StaffLoadSuccess } from '../../actions/staff';
import API from '../../services';
import { GetState } from '../../app/actions';
import { BanquetEntity } from '../../types/banquet';
import { StaffEntity } from '../../types/staff';

export const STAFF_LOAD = 'staff-load';
export const STAFF_LOAD_SUCCESS = `${STAFF_LOAD}-success`;
export const STAFF_LOAD_FAILURE = `${STAFF_LOAD}-failure`;

export const STAFF_ASSIGN = 'staff-assign';
export const STAFF_ASSIGN_SUCCESS = `${STAFF_ASSIGN}-success`;

export interface Staff {
  id: number;
  name: string;
  type: number;
  photo_url?: string;
}

export interface StaffList {
  [key: string]: Staff;
}

export function loadStaff() {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    return api.getStaffService().load()
      .then(staffList => {
        dispatch(new StaffLoadSuccess(staffList));
      })
      .catch((error: any) => {
        dispatch(staffLoadFailure());
      })
  }
}

export function staffLoadSuccess(staffList: StaffList): AnyAction {
  return {
    type: STAFF_LOAD_SUCCESS,
    staffList
  }
}

export function staffLoadFailure(): AnyAction {
  return {
    type: STAFF_LOAD_FAILURE
  }
}

export function staffAssign(banquet: BanquetEntity, staff: StaffEntity, type: number) {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    const isFound = !!banquet.staff_occ.find(st => {
      return st.staff.id == String(staff.id) && type === st.type;
    });

    dispatch(new BanquetAssignStaffSuccess({banquet, staff, type}));

    if (isFound) {
      return api.getStaffService().unAssign(banquet, staff, type);
    } else {
      return api.getStaffService().assign(banquet, staff, type);
    }
  }
}

export function staffAssignSuccess(banquet: BanquetEntity, staff: Staff, role: number) {
  return {
    type: STAFF_ASSIGN,
    banquet,
    staff,
    role
  }
}
