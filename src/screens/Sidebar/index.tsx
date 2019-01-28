import { Container, Content, Icon, Left, List, ListItem, Text, Thumbnail, View } from 'native-base';
import * as React from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Constants } from 'expo';
import { NavigateTo } from '../../app/app';

export interface Props extends NavigationScreenProps {
  user: any;
}

export interface State {

}

interface MenuItem {
  name: string;
  icon: string;
  navigate?: {
    navigateTo: NavigateTo;
    replace?: boolean;
    params?: {
      [key: string]: any;
    }
  }
}

export default class Sidebar extends React.Component<Props, State> {
  protected menus: MenuItem[] = [
    // {
    //   name: "Отправить отчет",
    //   route: "Anatomy",
    //   icon: "md-archive",
    //   bg: "#C5F442"
    // },
    {
      name: 'Координация',
      icon: 'md-people',
      navigate: {
        navigateTo: NavigateTo.HOME
      },
    },
    {
      name: 'Добавить банкет',
      icon: 'ios-add-circle',
      navigate: {
        navigateTo: NavigateTo.MANAGE_BANQUET
      }
    },
    {
      name: 'Расписание',
      icon: 'md-grid',
      navigate: {
        navigateTo: NavigateTo.SCHEDULE
      }
    },
    // {
    //   name: "Жалобы и предложения",
    //   route: "NHButton",
    //   icon: "md-flag",
    //   bg: "#1EBC7C",
    //   types: "9"
    // },
    // {
    //   name: "Promos",
    //   route: "NHCard",
    //   icon: "md-pricetag",
    //   bg: "#B89EF5",
    //   types: "5"
    // },
    // {
    //   name: "Purchases",
    //   route: "NHCheckbox",
    //   icon: "md-wallet",
    //   bg: "#EB6B23"
    // },
    // {
    //   name: "Social",
    //   route: "NHDeckSwiper",
    //   icon: "md-people",
    //   bg: "#3591FA",
    //   types: "2"
    // },
    {
      name: 'Выход',
      icon: 'md-exit',
      navigate: {
        navigateTo: NavigateTo.AUTH,
        replace: true,
        params: {
          logOut: true
        }
      },
    }
  ];

  render(): React.ReactNode {
    return (
      <Container>
        <Content
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <View style={style.drawerCover}>
            <Image
              source={require('../../../assets/logo.png')}
              style={style.drawerImage}
            />
            <Thumbnail
              style={style.drawerAvatar}
              source={this.props.user && this.props.user.photo_url ? {uri: this.props.user.photo_url} : require('../../../assets/icon.png')}
              resizeMode={'cover'}
            />
            {this.props.user && <Text style={{
              position: "absolute",
              left: 20,
              bottom: 20,
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }}
            >{this.props.user.name}</Text>}
          </View>
          <List
            dataArray={this.menus}
            renderRow={(menu: MenuItem) => {
              return (
                <ListItem
                  button
                  noBorder
                  onPress={() => {
                    const {navigate} = menu;

                    if (navigate) {
                      if (navigate.replace) {
                        this.props.navigation.replace(navigate.navigateTo, navigate.params);
                      } else {
                        this.props.navigation.navigate(navigate.navigateTo, navigate.params);
                      }
                    }
                  }}
                >
                  <Left>
                    <Icon
                      active
                      name={menu.icon}
                      style={{
                        color: '#777',
                        fontSize: 26,
                        width: 30
                      }}
                    />
                    <Text style={style.text}>{menu.name}</Text>
                  </Left>
                </ListItem>
              )
            }}
          >
          </List>
        </Content>
      </Container>
    )
  }
}

const deviceHeight = Dimensions.get("window").height;

const style: any = {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: Constants.statusBarHeight,
    backgroundColor: '#00BCD4'
  },
  drawerImage: {
    position: "absolute",
    right: 20,
    top: 40,
    width: 150,
    height: 40,
    resizeMode: "contain"
  },
  drawerAvatar: {
    position: "absolute",
    left: 20,
    top: 40,
    width: 64,
    height: 64,
    resizeMode: "contain",
    borderRadius: 100
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
};
