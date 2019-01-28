import { Separator, Text } from 'native-base';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import Localization from '../../../../../lib/localization';
import { DateUtils } from '../../../../../utils/date';
import styles from '../styles';

interface Props {
  title: string;
  onPress: (date: string) => void;
}

export class SectionHeader extends React.PureComponent<Props> {

  protected onPress = () => {
    const {title, onPress} = this.props;

    onPress(title);
  };

  render(): React.ReactNode {
    const { title } = this.props;
    const date = DateUtils.fromDateString(title);

    return (
      <Separator style={styles.section as ViewStyle}>
        <Text
          onPress={this.onPress}
          style={styles.sectionTitle}
        >
          {`${date.getDate()} ${Localization.t(`months.${date.getMonth()}`)} ${date.getYearString()}`}
        </Text>
      </Separator>
    );
  }
}
