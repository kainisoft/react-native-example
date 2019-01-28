import { Container, View } from 'native-base';
import * as React from 'react';
import { Image, ImageStyle, ViewStyle, } from 'react-native';
import SignInForm, { SignInFormData } from './SignIn/components/form';
import styles from './styles';

export interface Props {
  signInAttempt: (formDate: SignInFormData) => Promise<any>;
  singUpAttempt: () => '';
}

export interface State {

}

export default class AuthScreen extends React.Component<Props, State> {

  protected signInForm = <SignInForm
    submitForm={this.props.signInAttempt}
  />;

  render(): React.ReactNode {
    return (
      <Container style={styles.container as ViewStyle}>
        <View style={styles.elementsContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo as ImageStyle}
            />
          </View>

          <View style={styles.inputContainer}>
            {this.signInForm}
          </View>
        </View>
      </Container>
    )
  }
}
