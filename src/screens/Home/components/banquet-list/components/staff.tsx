import { Text } from "native-base";
import * as React from 'react';
import { BanquetStaff, BanquetStaffList, GroupStaffList } from '../../../../../types/banquet';

export interface Props {
  staffList: BanquetStaffList;
  role: number;
}

export default class Staff extends React.Component<Props> {
  protected groupStaffByRole(staffList: BanquetStaffList): GroupStaffList {
    return staffList.reduce((carry: GroupStaffList, staff: BanquetStaff) => {
      carry[staff.type].push(staff);

      return carry;
    }, {
      1: [],
      2: [],
      3: [],
      4: [],
    });
  }


  render(): React.ReactNode {
    const {staffList, role} = this.props;
    const group = this.groupStaffByRole(staffList);

    const names = group[role].map(staff => staff.staff.name.trim());

    return <Text
      key={role}
      style={{
        opacity: names.length,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >{names.join(', ') || '&nbsp;'}</Text>;
  }
}
