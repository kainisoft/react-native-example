import { Text, View } from 'native-base';
import * as React from 'react';
import { Image, ImageStyle } from 'react-native';
import loginStyles from '../../screens/Auth/styles';
import styles from './styles';
import Localization from '../../lib/localization';

export interface Props {

}

export default class SplashScreen extends React.Component<Props> {

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<Props>, nextContext: any): boolean {
    return false;
  }

  render(): React.ReactNode {
    return (
      <View style={loginStyles.container}>
        <View style={loginStyles.elementsContainer}>
          <View style={loginStyles.logoContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={loginStyles.logo as ImageStyle} />
          </View>
          <View style={[loginStyles.inputContainer, styles.inputContainer]}>
            <Text style={styles.tagLine}>{Localization.t('splashScreen.promptly')}</Text>
            <Text style={styles.tagLine}>{Localization.t('splashScreen.qualitatively')}</Text>
            <Text style={styles.tagLine}>{Localization.t('splashScreen.inexpensively')}</Text>
          </View>
        </View>
      </View>
    );
  }
}
