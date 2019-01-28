import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Root as NativeBaseRoot } from 'native-base';
import AuthContainer from '../containers/Auth/index';
import Home from '../containers/Home/index';
import Banquet from '../containers/Banquet/index';
import ManageBanquetContainer from '../containers/ManageBanquet/index';
import ManageStaffContainer from '../containers/ManageStaff/index';
import DictionaryContainer from '../containers/Dictionary/index';
import Sidebar from '../containers/SidebarContainer/index';
import ScheduleContainer from '../containers/Schedule/index';

export enum NavigateTo {
  AUTH = 'auth',
  HOME = 'home',
  DRAWER = 'drawer',
  BANQUET = 'banquet',
  MANAGE_BANQUET = 'manageBanquet',
  MANAGE_STAFF = 'manageStaff',
  DICTIONARY = 'dictionary',
  SCHEDULE = 'schedule'
}

const Drawer = createDrawerNavigator(
  {
    [NavigateTo.HOME]: Home,
    [NavigateTo.SCHEDULE]: ScheduleContainer
  },
  {
    drawerWidth: Dimensions.get('window').width - 50,
    drawerPosition: 'left',
    contentComponent: (props: any) => <Sidebar {...props} />,
    initialRouteName: NavigateTo.HOME,
  }
);

const App = createStackNavigator(
  {
    [NavigateTo.AUTH]: AuthContainer,
    [NavigateTo.DRAWER]: Drawer,
    [NavigateTo.BANQUET]: Banquet,
    [NavigateTo.MANAGE_BANQUET]: ManageBanquetContainer,
    [NavigateTo.MANAGE_STAFF]: ManageStaffContainer,
    [NavigateTo.DICTIONARY]: DictionaryContainer,
  },
  {
    initialRouteName: NavigateTo.AUTH,
    headerMode: 'none'
  }
);

export interface Props {

}

export interface State {

}

class Root extends React.PureComponent<Props, State> {

  render(): React.ReactNode {
    return (
      <NativeBaseRoot>
        <App />
      </NativeBaseRoot>
    );
  }

}

export default Root;
