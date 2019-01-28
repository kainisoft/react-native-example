import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { HandleSubmit } from '../../app/types';
import Header from '../../components/header';
import Localization from '../../lib/localization';
import ManageStaffScreen from '../../screens/manage-staff';
import ManageStaffForm, { ManageStaffFormData } from '../../screens/manage-staff/form';
import { saveStaff } from './actions';

export interface Props extends NavigationScreenProps, HandleSubmit<ManageStaffFormData> {

}

class ManageStaffContainer extends React.Component<Props> {

  protected handleSubmit = (formData: ManageStaffFormData) => {
    return this.props.submitForm(formData).then(() => {
      this.props.navigation.goBack();
    });
  };

  protected header = <Header title={Localization.t('staff.add')} navigation={this.props.navigation} />;

  protected form = <ManageStaffForm navigation={this.props.navigation} submitForm={this.handleSubmit} />;

  render(): React.ReactNode {
    return <ManageStaffScreen
      header={this.header}
      form={this.form}
    />;
  }
}

const mapStateToProps = (state: any) => {
  return {

  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    submitForm: (formData: ManageStaffFormData) => dispatch(saveStaff(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageStaffContainer);
