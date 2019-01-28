import { Body, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import * as React from 'react';
import { BanquetEntity } from '../../../types/banquet';
import { StaffEntity } from '../../../types/staff';
import StaffCheckbox from '../checkbox';

interface Props {
  staff: StaffEntity;
  checked: boolean;
  banquet: BanquetEntity;
  handleCheckBox: Function;
  type: number;
}

export default class Item extends React.PureComponent<Props> {

  render(): React.ReactNode {
    const { staff, checked, handleCheckBox, banquet, type } = this.props;

    return (
      <ListItem avatar key={staff.id}>
        <Left>
          <Thumbnail
            source={staff.photo_url ? {uri: staff.photo_url} : require('../../../../assets/icon.png')}
            resizeMode={'cover'}
          />
        </Left>
        <Body style={{borderBottomWidth: 0, alignItems: 'flex-start'}}>
        <Text>{staff.name}</Text>
        </Body>
        <Right style={{borderBottomWidth: 0, alignItems: 'center'}}>
          <StaffCheckbox
            checked={checked}
            onPress={() => handleCheckBox(banquet, staff, type)} />
        </Right>
      </ListItem>
    );
  }
}
