import { Button, Input, Item, Text } from 'native-base';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import Localization from '../../../lib/localization';
import styles from '../styles';

interface Props extends WrappedFieldProps {
  openDictionaryPlace: () => void
}

export type PlaceFieldProps = {
  props: any;
  component: any;
} & BaseFieldProps;

export default class PlaceField extends React.Component<Props> {

  render(): React.ReactNode {
    const { input } = this.props;

    return <Item inlineLabel style={styles.fieldWrapper as ViewStyle}>
      <Input
        {...input as any}
        disabled
        type={'text'}
        style={styles.field}
      />
      <Button iconRight transparent dark onPress={this.props.openDictionaryPlace}>
        <Text>{Localization.t('banquet.place')}</Text>
      </Button>
    </Item>
  }

}
