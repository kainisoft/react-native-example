import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  section: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    backgroundColor: '#00BCD4',
    color: '#fff',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    paddingTop: 3,
    paddingBottom: 3
  },
  iconCol: {
    minHeight: 40,
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 10
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'row'
  },
  roleName: {
    width: 100,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10,
    borderColor: '#00BCD4',
    borderEndWidth: 1,
    borderStartWidth: 1
  },
  staff: {
    flex: 1,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10
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
});
