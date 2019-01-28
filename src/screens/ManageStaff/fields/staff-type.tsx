import { Input, ListItem } from 'native-base';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface Props {
  openDictionary: () => void
}

export type FieldProps = {
  component: any;
  props: Props | any;
} & BaseFieldProps;

interface State {

}

export default class StaffTypeField extends React.Component<Props & WrappedFieldProps, State> {

  render(): React.ReactNode {
    const { input, openDictionary, meta: {error, touched} } = this.props;

    return (
      <ListItem noIndent noBorder onPress={openDictionary}>
        <Input
          {...input as any}
          underlineColorAndroid={(touched && error) ? '#d9534f' : '#95989A'}
          disabled
          placeholder={'Тип персонала'}
        />
      </ListItem>
    );
  }

}
