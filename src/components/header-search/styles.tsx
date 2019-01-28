import { Constants } from 'expo';
import { StyleSheet }from 'react-native';

export default StyleSheet.create({
  header: {
    marginTop: Constants.statusBarHeight
  },
  searchBody: {
    display: 'flex',
    flex: 5,
    flexDirection: 'row',
    marginRight: -4
  },
  searchInput: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    paddingLeft: 5,
    paddingRight: 5,
    height: 50,
    flex: 5
  }
})
