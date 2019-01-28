import { ScheduleLoadSuccess } from '../actions/schedule';
import { createReducer } from '../app/reducers';
import { State } from '../types/schedule';

const initialState: State = {
  past: [],
  future: []
};

const handlers = [
  ScheduleLoadSuccess
];

export default createReducer(initialState, handlers);
