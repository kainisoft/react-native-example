import { StaffLoadSuccess, StaffSaveSuccess } from '../actions/staff';
import { createReducer } from '../app/reducers';
import { State } from '../types/staff';

const initialState: State = {
  staff: []
};

const handlers = [
  StaffSaveSuccess,
  StaffLoadSuccess
];

export default createReducer(initialState, handlers);
