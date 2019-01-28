import {
  BanquetAssignStaffSuccess,
  BanquetLoadSuccess,
  BanquetSaveSuccess,
  BanquetUpdateTimeSuccess
} from '../actions/banquet';
import { createReducer } from '../app/reducers';
import { State } from '../types/banquet';

const initialState: State = {
 banquets: [],
 group: {}
};

const handlers = [
  BanquetLoadSuccess,
  BanquetAssignStaffSuccess,
  BanquetSaveSuccess,
  BanquetUpdateTimeSuccess
];

export default createReducer(initialState, handlers);
