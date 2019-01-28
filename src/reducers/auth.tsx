import { AuthSignInAttemptSuccess, AuthSignOut, AuthUserInfoSuccess } from '../actions/auth';
import { createReducer } from '../app/reducers';
import { State } from '../types/auth';

const initialState: State = {
  token: ''
};

const handlers = [
  AuthSignInAttemptSuccess,
  AuthSignOut,
  AuthUserInfoSuccess
];

export default createReducer(initialState, handlers);
