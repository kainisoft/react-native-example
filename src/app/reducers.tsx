import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { ActionStandard, StateStandard } from './actions';

import authReducer from '../reducers/auth';
import banquetReducer from '../reducers/banquet';
import staffReducer from '../reducers/staff';
import scheduleReducer from '../reducers/schedule';
import dictionaryReducer from '../reducers/dictionary';

export default combineReducers({
  authState: authReducer,
  banquetState: banquetReducer,
  staffState: staffReducer,
  scheduleState: scheduleReducer,
  dictionaryState: dictionaryReducer,

  form: formReducer
});

export function createReducer<A extends ActionStandard<any, any>>(initialState: StateStandard, handlers: any[]) {
  return (state = initialState, action: A) => {
    const indexOf = handlers.indexOf(action.type);

    return indexOf === -1 ? state : handlers[indexOf].prototype.handler.call(action.context, state, action.payload);
  };
}
