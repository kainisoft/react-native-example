import { StyleSheet } from 'react-native';
import platform from '../../theme/variables/platform';

export default StyleSheet.create({
  content: {
    flexGrow: 1
  },
  fieldsContainer: {
    flex: 1
  },
  fieldWrapper: {
    padding: 10
  },
  field: {
    color: platform.brandPrimary,
    marginLeft: 50
  },
  submitWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    alignContent: 'flex-end',
    marginBottom: 20
  }
});
