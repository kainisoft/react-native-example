import { Col, Text } from 'native-base';
import * as React from 'react';
import { DatePickerAndroid, Image, TextInput, TimePickerAndroid, TouchableHighlight } from 'react-native';
import Dialog from 'react-native-dialog';
import { BanquetEntity } from '../../../../../types/banquet';
import { DateUtils } from '../../../../../utils/date';
import styles from '../styles';

interface Props {
  banquet: BanquetEntity;
  onPress: (id: string, guests: number, time: string) => void;
}

interface State {
  dialogVisibility: boolean;
  guests: number;
  dateTime: string;
}

export default class IconCol extends React.Component<Props, State> {

  protected guestTextInput?: TextInput;

  constructor(props: Props) {
    super(props);

    const { banquet } = this.props;
    const date = DateUtils.fromFullString(banquet.date);

    this.state = {
      dialogVisibility: false,
      guests: banquet.guests_adult,
      dateTime: `${date.getYearString()}-${date.getMonthStr()}-${date.getDateStr()} ${date.getHoursStr()}:${date.getMinutesStr()}`
    };
  }

  protected setGuestDialogVisibility = (dialogVisibility: boolean) => {
    this.setState({dialogVisibility});
  };

  protected showGuestDialog = () => {
    this.setGuestDialogVisibility(true);
  };

  protected hideGuestDialog = () => {
    this.setGuestDialogVisibility(false);
  };

  protected getTimeInput = (input: any) => {
    this.guestTextInput = input;
  };

  protected submit = () => {
    // @ts-ignore
    const { guests, dateTime } = this.state;
    const { banquet } = this.props;

    if (!guests) {
      return;
    }

    this.setGuestDialogVisibility(false);
    this.props.onPress(String(banquet.id), guests, dateTime);
  };

  onPress = () => this.showGuestDialog();

  protected onTextChange = (text: string) => {
    this.setState({
      guests: parseInt(text, 10) || 0
    });
  };

  protected onTimeFocus = async () => {
    const { banquet } = this.props;
    const date = DateUtils.fromFullString(banquet.date);

    const {
      action,
      year = date.getFullYear(),
      month = date.getMonth(),
      day
    } = await DatePickerAndroid.open({ date });

    if (action !== DatePickerAndroid.dismissedAction) {
      const {action: a2, hour, minute} = await TimePickerAndroid.open({
        hour: date.getHours(),
        minute: date.getMinutes(),
        mode: 'clock',
      });

      if (a2 !== TimePickerAndroid.dismissedAction) {
        this.setState({
          dateTime: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`
        });
      }
    }

    this.guestTextInput && this.guestTextInput.blur();
  };

  render(): React.ReactNode {
    const { banquet } = this.props;
    const { dialogVisibility, dateTime, guests } = this.state;
    const date = DateUtils.fromFullString(banquet.date);

    return (
        <Col size={20} style={styles.iconCol}>
          <TouchableHighlight
            onPress={this.onPress}
            style={{paddingTop: 10}}>

            <Image
              style={{width: 64, height: 64}}
              resizeMode={'contain'}
              source={banquet.place_obj.photo_url
                ? {uri: banquet.place_obj.photo_url}
                : require('../../../../../../assets/icon.png')}
            />
          </TouchableHighlight>

          <Text>{banquet.guests_adult}</Text>
          <Text>
            {`${date.getHoursStr()}:${date.getMinutesStr()}`}
          </Text>

          <Dialog.Container visible={dialogVisibility}>
            <Dialog.Title>
              Гости и время
            </Dialog.Title>
            <Dialog.Input
              placeholder={'Количество готей'}
              keyboardType={'numeric'}
              onChangeText={this.onTextChange}
              value={String(guests)}
            />

            <Dialog.Input
              placeholder={'Время'}
              textInputRef={this.getTimeInput}
              onFocus={this.onTimeFocus}
              value={dateTime}
            />
            <Dialog.Button label={'Отмена'} onPress={this.hideGuestDialog} />
            <Dialog.Button label={'Сохранить'} onPress={this.submit} />
          </Dialog.Container>
        </Col>
      );
  }

}
