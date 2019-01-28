import { Font } from 'expo';
import { StyleProvider } from 'native-base';
import * as React from 'react';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import { Persistor } from 'redux-persist/es/types';
import API from '../services';
import SplashScreen from '../components/splash-screen';
import Localization, { Local } from '../lib/localization';
import getTheme from '../theme/components/index';
import variables from '../theme/variables/platform';
import { GlobalState } from './actions';
import App from './app';
import configureStore from './store';


interface Props { }
interface State {
  store: Store<GlobalState, AnyAction>;
  persistor: Persistor;
  isLoading: boolean;
  isReady: boolean;
}

export default class Setup extends React.Component<Props, State> {
  readonly state: State = {
    isLoading: true,
    isReady: false,
    ...configureStore(() => {
      this.configureApi();
      this.setState({isLoading: false});
    })
  };

  constructor(props: Props) {
    super(props);

    Localization.setLocale(Local.RU);
  }

  protected async loadFonts(): Promise<any> {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
  }

  protected configureApi(): void {
    API.setStore(this.state.store);
  }

  async componentDidMount(): Promise<any> {
    await this.loadFonts();

    this.setState({isReady: true});
  }

  render(): React.ReactNode {
    if (!this.state.isReady || this.state.isLoading) {
      return <SplashScreen />
    }

    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}
