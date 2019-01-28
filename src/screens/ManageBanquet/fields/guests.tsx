import { Button, Input, Item, Text } from 'native-base';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import Dialog from 'react-native-dialog';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import Localization from '../../../lib/localization';
import styles from '../styles';

interface Props extends WrappedFieldProps {
  input: any;
}

export type GuestsFieldProps = {
  component: any;
} & BaseFieldProps;

export interface State {
  guestDialogVisibility: boolean;
}

export default class GuestsField extends React.Component<Props> {
  readonly state: State = {
    guestDialogVisibility: false
  };

  protected guestTextInput?: any;

  protected setGuestDialogVisibility = (guestDialogVisibility: boolean) => {
    this.setState({guestDialogVisibility});
  };

  protected showGuestDialog = () => {
    this.setGuestDialogVisibility(true);
  };

  protected hideGuestDialog = () => {
    this.setGuestDialogVisibility(false);
  };

  protected getGuestInput = (input: any) => {
    this.guestTextInput = input;
  };

  protected setGuest = () => {
    const guest = this.guestTextInput._lastNativeText;

    if (!guest) {
      return;
    }

    this.setGuestDialogVisibility(false);
    this.props.input.onChange(guest);
  };

  render(): React.ReactNode {
    const { input } = this.props;

    return <Item style={styles.fieldWrapper as ViewStyle}>
      <Input {...input} disabled style={styles.field} />

      <Button iconRight transparent dark onPress={this.showGuestDialog}>
        <Text>{Localization.t('banquet.quests')}</Text>
      </Button>

      <Dialog.Container visible={this.state.guestDialogVisibility}>
        <Dialog.Title>
          Введите количество людей
        </Dialog.Title>
        <Dialog.Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt.
        </Dialog.Description>
        <Dialog.Input
          textInputRef={this.getGuestInput}
          keyboardType={'numeric'}
          autoFocus={true}
        />
        <Dialog.Button label={'Отмена'} onPress={this.hideGuestDialog} />
        <Dialog.Button label={'Сохранить'} onPress={this.setGuest} />
      </Dialog.Container>
    </Item>
  }
};
