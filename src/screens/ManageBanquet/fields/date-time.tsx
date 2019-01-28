import { Button, Input, Item, Text } from 'native-base';
import * as React from 'react';
import { DatePickerAndroid, TimePickerAndroid, ViewStyle } from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import Localization from '../../../lib/localization';
import styles from '../styles';

interface Props extends WrappedFieldProps {
  input: any;
}

export default class DateTimeField extends React.Component<Props> {

  protected setDateTime = async (): Promise<any> => {
    const date = new Date();
    const { action,
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate()
    } = await DatePickerAndroid.open({
      date,
      mode: 'calendar'
    });

    if (action !== DatePickerAndroid.dismissedAction) {
      const { action, hour, minute } = await TimePickerAndroid.open({mode: 'clock', is24Hour: true});

      if (action !== TimePickerAndroid.dismissedAction) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        this.props.input.onChange(`${dateString} ${timeString}`);
      }
    }
  };

  render(): React.ReactNode {
    const {input} = this.props;

    return <Item style={styles.fieldWrapper as ViewStyle}>
      <Input {...input} disabled style={styles.field} />

      <Button iconRight transparent dark onPress={this.setDateTime}>
        <Text>{Localization.t('banquet.time')}</Text>
      </Button>
    </Item>
  }
}
