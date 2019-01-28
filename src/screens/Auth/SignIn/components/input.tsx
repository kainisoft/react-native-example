import { Input as NBInput, Item } from 'native-base';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import styles from '../../styles';

interface Props {
  label: string;
  secureTextEntry?: boolean
}

export type FieldProps = {
  props: Props | any;
  component: any;
} & BaseFieldProps;

export default class Input extends React.Component<WrappedFieldProps & Props> {

  render(): React.ReactNode {
    const { input, label, secureTextEntry } = this.props;

    return (
      <Item style={{marginLeft: 0}}>
        <NBInput
          {...input as any}
          placeholder={label}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#D4D4D4"
          style={[styles.input]}
        />
      </Item>
    );
  }
}
