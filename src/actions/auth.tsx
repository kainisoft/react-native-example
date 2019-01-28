import { ActionStandard } from '../app/actions';
import { UserEntity } from '../services/auth/entity';
import { State } from '../types/auth';

export class AuthSignInAttempt extends ActionStandard<State, {}> {

}

export class AuthSignInAttemptSuccess extends ActionStandard<State, State> {

  handler(state: State, payload: State): State {
    return {
      ...state,
      ...payload
    };
  }
}

export class AuthSignInAttemptFail extends ActionStandard<State, {}> {

}

export class AuthSignOut extends ActionStandard<State, {}> {

  handler(state: State, payload: State): State {
    return {
      ...state,
      ...{
        token: ''
      }
    };
  }
}

export class AuthUserInfoSuccess extends ActionStandard<State, UserEntity> {

  handler(state: State, user: UserEntity): State {
    return this.merge({
      ...state,
      ...{user}
    });
  }

}
