import { AnyAction, Dispatch } from 'redux';
import {
  AuthSignInAttempt,
  AuthSignInAttemptFail,
  AuthSignInAttemptSuccess,
  AuthSignOut,
  AuthUserInfoSuccess
} from '../../actions/auth';
import { SignInFormData } from '../../screens/Auth/SignIn/components/form';
import API from '../../services';
import { GetState } from '../../app/actions';

export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILURE = 'login-failure';

export const USER_INFO_SUCCESS = 'user-info-success';

export const USER_LOGOUT = 'user-logout';

export function signInAttempt(formData: SignInFormData) {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    dispatch(new AuthSignInAttempt(formData));

    return api.getAuthService().singInAttempt(formData)
      .then(entity => {
        const {token} = entity;

        if (token) {
          return dispatch(new AuthSignInAttemptSuccess({token}));
        } else {
          return dispatch(new AuthSignInAttemptFail({}));
        }
      });
  }
}

export function loginRequest(email: string, password: string): AnyAction {
  return {
    type: LOGIN_REQUEST,
    payload: {email, password},
    authSubmit: true,
    authError: false
  };
}

export function userInfo() {
  return (dispatch: any, getState: GetState, api: API) => {
    return api.getAuthService().userInfo()
      .then((json: any) => {
        if (!json.hasOwnProperty('error')) {
          dispatch(new AuthUserInfoSuccess(json));
        }
      })
  }
}

export function userInfoSuccess(user: any) {
  return {
    type: USER_INFO_SUCCESS,
    user
  };
}

export function logOut() {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    dispatch(new AuthSignOut({}));
  };
}
