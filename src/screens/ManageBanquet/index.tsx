import { Container } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { HandleSubmit } from '../../app/types';
import Header from '../../components/header';
import Localization from '../../lib/localization';
import ManageBanquetForm, { ManageBanquetFormData } from './form';

export interface Props extends NavigationScreenProps, HandleSubmit<ManageBanquetFormData> {

}

export default class ManageBanquetScreen extends React.Component<Props> {

  render(): React.ReactNode {
    const { navigation, submitForm } = this.props;

    return <Container>
      <Header
        title={Localization.t('banquet.add')}
        navigation={navigation}
      />

      <ManageBanquetForm
        navigation={navigation}
        submitForm={submitForm}
      />
    </Container>;
  }
}
