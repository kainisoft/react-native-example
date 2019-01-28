import { Icon } from 'native-base';
import * as React from 'react';

export interface Props {
  checked: boolean;
}

export default class CheckBoxRound extends React.Component<Props> {

  render(): React.ReactNode {
    if (this.props.checked) {
      return <Icon name={'checkmark'} style={{color: '#00BCD4'}} />
    }

    return <Icon name={'ios-radio-button-off'} style={{color: '#95989A'}} />
  }
}
