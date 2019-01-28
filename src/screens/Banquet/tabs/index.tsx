import { Content } from 'native-base';
import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { BanquetEntity, BanquetStaffList } from '../../../types/banquet';
import { StaffEntity, StaffEntityList } from '../../../types/staff';
import Item from './item';

export interface Props {
  type: number;
  staffList: StaffEntityList;
  banquet: BanquetEntity;
  banquetStaffList: BanquetStaffList;
  handleCheckBox: Function;
  filter: string;
}

export interface State {

}

export default class BanquetTab extends React.Component<Props> {

  protected isChecked(staff: StaffEntity): boolean {
    return !!this.props.banquet.staff_occ.find(st => {
      return st.staff.id == staff.id && this.props.type === st.type;
    });
  }

  protected keyExtractor = (item: StaffEntity) => {
    return String(item.id);
  };

  protected renderItem = (item: ListRenderItemInfo<StaffEntity>) => {
    const {item: staff} = item;
    const {type, banquet, handleCheckBox} = this.props;
    const checked = this.isChecked(staff);

    return (
      <Item staff={staff} checked={checked} banquet={banquet} handleCheckBox={handleCheckBox} type={type}/>
    );
  };

  render(): React.ReactNode {
    let {staffList, filter} = this.props;

    if (filter.length) {
      staffList = Object.values(staffList).filter(staff => staff.name.includes(filter));
    }

    staffList = staffList.filter(staff => this.isChecked(staff)).concat(staffList.filter(staff => !this.isChecked(staff)));

    return (
      <Content>
        <FlatList<StaffEntity>
          data={staffList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </Content>
    );
  }
}
