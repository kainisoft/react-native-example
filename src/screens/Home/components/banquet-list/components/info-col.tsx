import { Col, Text, View } from 'native-base';
import * as React from 'react';
import { TouchableHighlight } from 'react-native';
import { Banquet } from '../../../../../containers/Home/actions';
import Localization from '../../../../../lib/localization/index';
import Staff from './staff';
import styles from '../styles';

export interface Props {
  banquet: Banquet;
  onPress: (banquet: Banquet) => void;
}

export default class InfoCol extends React.Component<Props> {

  onPress = () => {
    const {banquet, onPress} = this.props;

    onPress(banquet);
  };

  render(): React.ReactNode {
    const { banquet } = this.props;

    return (
      <Col size={80}>
        <TouchableHighlight onPress={this.onPress}>
          <View>
            <View style={styles.infoCol}>
              <View style={styles.roleName}><Text>{Localization.t('common.role.manager')}</Text></View>
              <View style={styles.staff}>
                <Staff
                  staffList={banquet.staff_occ}
                  role={1}
                />
              </View>
            </View>

            <View style={styles.infoCol}>
              <View style={styles.roleName}><Text>{Localization.t('common.role.photographer')}</Text></View>
              <View style={styles.staff}>
                <Staff
                  staffList={banquet.staff_occ}
                  role={2}
                />
              </View>
            </View>

            <View style={styles.infoCol}>
              <View style={styles.roleName}><Text>{Localization.t('common.role.it')}</Text></View>
              <View style={styles.staff}>
                <Staff
                  staffList={banquet.staff_occ}
                  role={3}
                />
              </View>
            </View>

            <View style={styles.infoCol}>
              <View style={styles.roleName}><Text>{Localization.t('common.role.distributor')}</Text></View>
              <View style={styles.staff}>
                <Staff
                  staffList={banquet.staff_occ}
                  role={4}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Col>
    );
  }
}
