import { DictionaryLoadFail, DictionaryLoadSuccess } from '../actions/dictionary';
import { createReducer } from '../app/reducers';
import { DictionaryType, State } from '../types/dictionary';

const initialState: State = {
  [DictionaryType.BANQUET_PLACE]: [],
  [DictionaryType.BANQUET_TYPE]: [],
  [DictionaryType.STAFF_TYPE]: []
};

const handlers = [
  DictionaryLoadSuccess,
  DictionaryLoadFail
];

export default createReducer(initialState, handlers);
