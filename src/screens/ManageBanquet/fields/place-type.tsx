import { Button, Input, Item, Text } from 'native-base';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import Localization from '../../../lib/localization';
import styles from '../styles';

interface Props extends WrappedFieldProps {
  openDictionaryPlaceType: () => void
}

export type PlaceTypeFieldProps = {
  props: any;
  component: any;
} & BaseFieldProps;

export default class PlaceTypeField extends React.Component<Props> {

  render(): React.ReactNode {
    const input = this.props.input as any;

    return <Item inlineLabel style={styles.fieldWrapper as ViewStyle}>
      <Input
        {...input}
        disabled
        type={'text'}
        style={styles.field}
      />
      <Button iconRight transparent dark onPress={this.props.openDictionaryPlaceType}>
        <Text>{Localization.t('banquet.occasion_types')}</Text>
      </Button>
    </Item>
  }

}
