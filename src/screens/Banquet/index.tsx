import { Constants } from 'expo';
import { Body, Button, Container, Header, Icon, Left, Right, Title } from 'native-base';
import * as React from 'react';
import { TextInput } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TabView from '../../components/tab-view';
import { BanquetEntity, BanquetStaffList } from '../../types/banquet';
import { StaffEntityList } from '../../types/staff';
import BanquetTab from './tabs';

export interface Props extends NavigationScreenProps {
  banquet: BanquetEntity;
  staffList: StaffEntityList;
  handleCheckBox: Function;
}

export interface State {
  isSearch: boolean;
  filter: string;
}

export class BanquetDetails extends React.Component<Props, State> {
  readonly state: State = {
    isSearch: false,
    filter: '',
  };

  protected filterByRole(staffList: BanquetStaffList, role: number): BanquetStaffList {
    return staffList.filter(staff => staff.type === role);
  }

  renderHeader(): React.ReactNode {
    const {isSearch, filter} = this.state;

    if (isSearch) {
      return <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.setState({isSearch: false})}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{display: 'flex', flex: 5, flexDirection: 'row', marginRight: -4}}>
            <TextInput
              autoFocus={true}
              style={{backgroundColor: '#fff', alignSelf: 'stretch', paddingLeft: 5, paddingRight: 5, height: 50, flex: 5}}
              onBlur={() => this.setState({isSearch: false})}
              onChangeText={(filter: string) => this.setState({filter})}
              value={filter}
            />
          </Body>
        </Header>;
    }

    return <Header hasTabs>
      <Left>
        <Button transparent>
          <Icon
            active
            name="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
          />
        </Button>
      </Left>
      <Body>
        <Title>Координация</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => this.setState({isSearch: true})}>
          <Icon name='search'/>
        </Button>
      </Right>
    </Header>;
  }

  protected getScene = (role: number) => {
    const { filter } = this.state;
    const { banquet: {staff_occ} } = this.props;
    const photo = this.filterByRole(staff_occ, role);

    return (
      <BanquetTab
        type={role}
        banquet={this.props.banquet}
        staffList={this.props.staffList}
        banquetStaffList={photo}
        handleCheckBox={this.props.handleCheckBox}
        filter={filter}
      />
    );
  };

  render(): React.ReactNode {
    return <Container style={{marginTop: Constants.statusBarHeight}}>
      {this.renderHeader()}

      <TabView
         routes={[
           {key: 'photo', title: 'Фотографы', scene: this.getScene(2)},
           {key: 'it', title: 'IT', scene: this.getScene(3)},
           {key: 'distributor', title: 'Раздача', scene: this.getScene(4)},
           {key: 'manager', title: 'Куратор', scene: this.getScene(1)},
         ]}
      />

      {this.props.children}
    </Container>;
  }
}
