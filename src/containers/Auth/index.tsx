import {
  Toast,
} from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { GlobalState } from '../../app/actions';
import { NavigateTo } from '../../app/app';
import AuthScreen from '../../screens/Auth';
import { SignInFormData } from '../../screens/Auth/SignIn/components/form';
import { logOut, signInAttempt } from './actions';
import {State as AuthState} from '../../types/auth';

export interface Props extends NavigationScreenProps {
  token: string;
  signInAttempt: (formData: SignInFormData) => Promise<any>;
  logout: Function;
}

export interface State {
  payload: any;
  error: boolean
}

class AuthContainer extends React.Component<Props, State> {

  componentDidMount(): void {
    const { token, navigation } = this.props;

    if (navigation.getParam('logOut')) {
      this.logOut();
    } else if (token) {
      navigation.replace(NavigateTo.DRAWER);
    } else {
      this.logOut();
    }
  }

  protected logOut() {
    this.props.logout();
  }

  protected handleSubmit = (formData: SignInFormData) => {
    return this.props.signInAttempt(formData)
      .then(() => {
        this.props.navigation.replace(NavigateTo.DRAWER);
      })
      .catch(() => {
        Toast.show({
          text: 'Некорректный Email или пароль',
          duration: 2000,
          position: 'bottom',
          textStyle: {textAlign: 'center'},
        });
      });
  };

  render(): React.ReactNode {
    return (
      <AuthScreen
        signInAttempt={this.handleSubmit}
        singUpAttempt={() => ''}
      />
    );
  }
}

const getToken = createSelector(
  (state: AuthState) => state.token,
  (token) => ({token})
);

const mapStateToProps = (state: GlobalState) => {
  return getToken(state.authState);
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    signInAttempt: (formData: SignInFormData) => dispatch(signInAttempt(formData)),
    logout: () => dispatch(logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
