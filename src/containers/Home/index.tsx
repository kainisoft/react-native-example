import { Button, Fab, Icon, Left } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { GlobalState } from '../../app/actions';
import { NavigateTo } from '../../app/app';
import HeaderSearch from '../../components/header-search';
import HomeScreen from '../../screens/Home';
import { BanquetList } from '../../screens/Home/components/banquet-list';
import { GroupBanquet, State as BanquetState } from '../../types/banquet';
import { loadBanquets, updateBanquetTime } from './actions';

interface Props extends NavigationScreenProps {
  loadBanquets: () => void;
  onUpdateTime: (id: string, guests: number, time: string) => Promise<any>;
  group: GroupBanquet;
}

interface State {
  filter: string;
}

class HomeContainer extends React.Component<Props, State> {
  readonly state: State = {
    filter: ''
  };

  protected timer: number = 0;

  componentDidMount(): void {
    this.props.loadBanquets();

    this.timer = setInterval(this.props.loadBanquets, 15000);
  }

  protected pushToManageBanquet = () => {
    this.props.navigation.push(NavigateTo.MANAGE_BANQUET, {
      onSave: this.onSaveBanquet
    });
  };

  protected onSaveBanquet = () => {
    this.props.loadBanquets();
  };

  protected leftNode = (
    <Left>
      <Button transparent>
        <Icon
          active
          name={'menu'}
          onPress={() => this.props.navigation.openDrawer()}
        />
      </Button>
    </Left>
  );

  protected onHeaderSetFilter = (filter: string) => {
    this.setState({filter});
  };

  protected headerNode = () => (
    <HeaderSearch
      title={'Координация'}
      navigation={this.props.navigation}
      left={this.leftNode}
      onSetFilter={this.onHeaderSetFilter}
      filter={this.state.filter}
    />
  );

  protected banquetListNode = () => (
    <BanquetList
      banquets={this.getBanquets()}
      navigation={this.props.navigation}
      onUpdateTime={this.props.onUpdateTime}
    />
  );

  protected getBanquets() {
    const { filter } = this.state;
    const { group } = this.props;

    if (!filter) {
      return group;
    }

    const result: GroupBanquet = {};

    Object.keys(group).forEach(date => {
      const list = (group[date] || []).filter(coordination => {
        if (coordination.place_obj.name.includes(filter)) {
          return true;
        }

        return coordination.staff_occ.some(staff => {
          return staff.staff.name.includes(filter)
        });
      });

      if (list.length) {
        result[date] = list;
      }
    });

    return result;
  }

  protected onUpdateTime = (id: string, guests: number, time: string) => {
    this.props.onUpdateTime(id, guests, time)
      .then(() => {
        this.props.loadBanquets();
      })
      .catch(() => {
        debugger
      })
  };

  render(): React.ReactNode {
    return (
        <HomeScreen
          header={this.headerNode()}
          banquetList={this.banquetListNode()}
        >
          <Fab
            position="bottomRight"
            onPress={this.pushToManageBanquet}
          >
            <Icon name="add" />
          </Fab>
      </HomeScreen>
    );
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }
}

const getBanquets = createSelector(
  (state: BanquetState) => state.group,
  (group) => ({group})
);

const mapStateToProps = (state: GlobalState) => {
  return getBanquets(state.banquetState);
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadBanquets: () => dispatch(loadBanquets()),
    onUpdateTime: (id: string, guests: number, time: string) => dispatch(updateBanquetTime(id, guests, time))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
