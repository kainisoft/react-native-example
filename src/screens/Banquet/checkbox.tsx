import { CheckBox } from 'native-base';
import * as React from 'react';
import { GestureResponderEvent } from 'react-native';

export interface Props {
  checked: boolean;
  onPress: (event?: GestureResponderEvent) => void;
}

export interface State {
  checked: boolean;
}

export default class StaffCheckbox extends React.Component<Props, State> {

  readonly state: State = {
    checked: this.props.checked
  };

  render(): React.ReactNode {
    const {onPress} = this.props;
    const {checked} = this.state;

    return <CheckBox
      style={{left: 0}}
      checked={checked}
      onPress={() => {
        this.setState({
          checked: !checked
        });

        onPress();
      }}
    />
  }
}
