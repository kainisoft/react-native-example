import { Fab, Icon } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { GlobalState } from '../../app/actions';
import { NavigateTo } from '../../app/app';
import { BanquetDetails } from '../../screens/Banquet';
import { BanquetEntity } from '../../types/banquet';
import { loadStaff, Staff, staffAssign } from './actions';
import { StaffEntity, StaffEntityList, State as StaffState } from '../../types/staff';
import { State as BanquetState } from '../../types/banquet';


export interface Props extends NavigationScreenProps {
  staffList: StaffEntityList;
  banquet: BanquetEntity;
  loadStaff: Function;
  staffAssign: Function;
}

export interface State {

}

class BanquetContainer extends React.Component<Props, State> {

  componentDidMount(): void {
    this.props.loadStaff();
  }

  protected pushToManageStaff = () => {
    this.props.navigation.push(NavigateTo.MANAGE_STAFF, {
      onSave: () => ''
    });
  };

  protected handleCheckBox = (coordination: BanquetEntity, staff: Staff, type: number) => {
    this.props.staffAssign(coordination, staff, type);
  };

  render(): React.ReactNode {
    return <BanquetDetails
      banquet={this.props.banquet}
      navigation={this.props.navigation}
      staffList={this.props.staffList}
      handleCheckBox={this.handleCheckBox}>
      <Fab
        position="bottomRight"
        onPress={this.pushToManageStaff}
      >
        <Icon name="add" />
      </Fab>
    </BanquetDetails>;
  }
}

const getStaff = createSelector(
  (state: StaffState) => state.staff,
  (staff) => staff
);

const getBanquet = createSelector(
  (state: BanquetState, props: Props) => {
    const id = props.navigation.getParam('id');

    return state.banquets.find(banquet => banquet.id === id);
  },
  banquet => banquet
);

const mapStateToProps = (state: GlobalState, props: Props) => {
  return {
    banquet: getBanquet(state.banquetState, props),
    staffList: getStaff(state.staffState)
  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    loadStaff: () => dispatch(loadStaff()),
    staffAssign: (coordination: BanquetEntity, staff: StaffEntity, type: number) => dispatch(staffAssign(coordination, staff, type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BanquetContainer);
