import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { HandleSubmit } from '../../app/types';
import ManageBanquetScreen from '../../screens/ManageBanquet';
import { ManageBanquetFormData as ManageBanquetFormDate } from '../../screens/ManageBanquet/form';
import { saveBanquet } from './actions';

export interface Props extends NavigationScreenProps, HandleSubmit<ManageBanquetFormDate> {

}

class ManageBanquetContainer extends React.Component<Props>{

  protected submitForm = (formData: ManageBanquetFormDate) => {
    const { submitForm, navigation } = this.props;

    return submitForm(formData).then(() => {
      navigation.getParam('onSave', () => '')();

      navigation.goBack();
    });
  };

  render(): React.ReactNode {
    const { navigation } = this.props;

    return <ManageBanquetScreen
      navigation={navigation}
      submitForm={this.submitForm}
    />
  }
}

const mapStateToProps = (state: any) => {
  return {
  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    submitForm: (formData: ManageBanquetFormDate) => dispatch(saveBanquet(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBanquetContainer);
