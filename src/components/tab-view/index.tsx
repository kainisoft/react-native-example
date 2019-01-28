import { Label, View } from 'native-base';
import { ReactNode } from 'react';
import * as React from 'react';
import { TextStyle } from 'react-native';
import {
  NavigationState,
  RouteBase,
  Scene,
  SceneRendererProps,
  TabBar,
  TabView as RNTabView
} from 'react-native-tab-view';
import styles from './styles';

export interface TabViewRoute extends RouteBase {
  title: string;
  scene: ReactNode;
}

interface Props {
  routes: TabViewRoute[];
}

interface State extends NavigationState<TabViewRoute> {
  loaded: string[];
}

export default class TabView extends React.Component<Props, State> {
  readonly state: State = {
    index: 0,
    loaded: [this.props.routes[0].key],
    routes: this.props.routes
  };

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    if (!Object.is(this.props, prevProps)) {
      this.setState({
        routes: this.props.routes
      });
    }

    return null;
  }


  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {

  }

  protected onIndexChange = (index: number) => {
    const { loaded, routes } = this.state;
    const { key } = routes[index];

    this.setState({
      index,
      loaded: loaded.includes(key) ? loaded : [...loaded, key]
    });
  };

  protected renderTabBar = (props: SceneRendererProps<TabViewRoute>) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={false}
        style={styles.tabBar}
        indicatorStyle={styles.tabBarIndicator}
        renderLabel={this.renderLabel}
      />
    );
  };

  protected renderLabel = (props: Scene<TabViewRoute>) => {
    return (
      <Label style={styles.label as TextStyle}>
        {props.route.title}
      </Label>
    );
  };

  protected renderScene = ({route: {key}}: SceneRendererProps<TabViewRoute> & Scene<TabViewRoute>) => {
    const {loaded, index, routes} = this.state;
    const routeIndex = routes.findIndex(route => route.key === key);

    if (routeIndex !== index && !loaded.includes(key)) {
      return <View/>
    }

    return routes[routeIndex]
      ? routes[routeIndex].scene
      : null;
  };

  render(): React.ReactNode {
    return (
      <RNTabView<TabViewRoute>
        useNativeDriver
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderTabBar={this.renderTabBar}
        renderScene={this.renderScene}
      />
    );
  }

}
