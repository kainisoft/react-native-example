import { Constants } from 'expo';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginBottom: 20
  },
  elementsContainer: {
    flex: 1,
  },
  avatarContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 3,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    height: 370
  },
  input: {
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    color: '#fff'
  },
  submitContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 24
  },
  submit: {
    borderColor: '#759FA6'
  }
});
