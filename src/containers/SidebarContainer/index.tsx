import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { GlobalState } from '../../app/actions';
import Sidebar from '../../screens/Sidebar';
import { userInfo } from '../Auth/actions';
import {State as AuthState} from '../../types/auth';

export interface Props extends NavigationScreenProps {
  userInfo: Function;
  logOut: Function;
  user: any;
}

export interface State {

}

export class SidebarContainer extends React.Component<Props, State> {

  componentDidMount(): void {
    this.props.userInfo();
  }

  render(): React.ReactNode {
    return <Sidebar
      navigation={this.props.navigation}
      user={this.props.user}
    />;
  }

}

const getUser = createSelector(
  (state: AuthState) => state.user,
  user => ({user})
);

const mapStateToProps = (state: GlobalState) => {
  return getUser(state.authState);
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    userInfo: () => dispatch(userInfo()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
