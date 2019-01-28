import { Constants } from 'expo';
import { StyleSheet } from 'react-native';
import platform from '../../theme/variables/platform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BCD4',
    paddingTop: Constants.statusBarHeight
  },
  elementsContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: 'contain',
    width: 300
  },
  inputContainer: {
    flex: 6,
    paddingLeft: 24,
    paddingRight: 24
  },
  input: {
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    color: '#fff'
  },
  inputError: {
    borderColor: platform.brandDanger
  },
  submitContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 24
  },
  submit: {
    backgroundColor: platform.brandPrimary,
    borderColor: '#759FA6'
  }
});
