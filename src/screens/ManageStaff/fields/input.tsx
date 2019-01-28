import { ListItem, Input as NBInput, Text, View } from 'native-base';
import * as React from 'react';
import { KeyboardType } from 'react-native';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

export interface Props {
  placeholder: string;
  type: KeyboardType;
}

export type FieldProps = {
  component: any;
  props: Props | any;
} & BaseFieldProps;

interface State {
  isFocused: boolean;
}

export default class Input extends React.Component<Props & WrappedFieldProps, State> {
  readonly state: State = {
    isFocused: false
  };

  protected onFocus = () => this.setState({isFocused: true});

  protected onBlur = () => this.setState({isFocused: false});

  render(): React.ReactNode {
    const { input, placeholder, type, meta: {touched, error, submitFailed} } = this.props;
    const { isFocused } = this.state;

    return (
      <ListItem noBorder noIndent>
        <NBInput
          {...input}
          keyboardType={type}
          placeholder={placeholder}
          underlineColorAndroid={(touched && error) ? '#d9534f' : isFocused ? '#36ADB9' : '#95989A'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        {submitFailed && error === 'busy' && <View
          style={{position: 'absolute', right: 20, bottom: 5}}
        >
          <Text
            style={{fontSize: 12, color: '#d9534f'}}
          >
            Почтовый ящик занят другим пользователем
            </Text>
        </View>}
      </ListItem>
    );
  }
};
