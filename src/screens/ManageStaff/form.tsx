import { Button, Form, List, Spinner, Text, View } from 'native-base';
import * as React from 'react';
import { KeyboardAvoidingView, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { NavigateTo } from '../../app/app';
import { FormData, HandleSubmit } from '../../app/types';
import { DictionaryEntity, DictionaryType } from '../../types/dictionary';
import { emailValidator, requiredValidator } from '../../utils/form/validators';
import AvatarField from './fields/avatar';
import Input, { FieldProps as InputFieldProps} from './fields/input';
import StaffTypeField, {FieldProps as StaffTypeFieldProps} from './fields/staff-type';
import { phoneFormatter } from './formatters';
import { numbersOnly } from './parsers';
import styles from './styles';
import { avatarValidator, phoneValidator } from './validators';

export interface ManageStaffFormData extends FormData {
  name: string;
  address: string;
  telephone: string;
  email: string;
  photo?: string;
  type?: string;
}

export interface Props extends NavigationScreenProps, HandleSubmit<ManageStaffFormData> {
  formData?: ManageStaffFormData;
}

export type InjectedProps = InjectedFormProps<ManageStaffFormData, Props>;

class ManageStaffForm extends React.Component<Props & InjectedProps> {

  protected openDictionary = () => {
    const { navigation, formData } = this.props;

    navigation.push(NavigateTo.DICTIONARY, {
      type: DictionaryType.STAFF_TYPE,
      title: 'Тип персонала',
      onSelect: this.onSelectDictionary,
      selected: formData && formData['type']
    });
  };

  protected onSelectDictionary = (dictionary: DictionaryEntity) => {
    this.props.change('type', dictionary.displayName);
  };

  render(): React.ReactNode {
    const { handleSubmit, submitting, submitForm } = this.props;

    return <Form style={styles.container as ViewStyle}>
      <View style={styles.elementsContainer}>
        <KeyboardAvoidingView
          behavior="position"
        >
        <View style={styles.avatarContainer}>
          <Field
            name={'photo'}
            component={AvatarField}
            validate={avatarValidator}
          />
        </View>

        <List style={styles.inputContainer}>
          <Field<InputFieldProps>
            name={'name'}
            component={Input}
            validate={requiredValidator}
            props={{
              placeholder: 'Имя'
            }}
          />

          <Field<InputFieldProps>
            name={'address'}
            component={Input}
            validate={requiredValidator}
            props={{
              placeholder: 'Адрес'
            }}
          />

          <Field<InputFieldProps>
            name={'telephone'}
            component={Input}
            parse={numbersOnly}
            format={phoneFormatter}
            validate={[requiredValidator, phoneValidator]}
            props={{
              placeholder: 'Телефон',
              type: 'numeric'
            }}
          />

          <Field<InputFieldProps>
            name={'email'}
            component={Input}
            validate={[requiredValidator, emailValidator]}
            props={{
              placeholder: 'E-mail',
              type: 'email-address'
            }}
          />

          <Field<StaffTypeFieldProps>
            name={'type'}
            component={StaffTypeField}
            validate={requiredValidator}
            props={{
              openDictionary: this.openDictionary
            }}
          />
        </List>
        <View style={styles.submitContainer}>
          <Button
            rounded
            block
            disabled={submitting}
            onPress={handleSubmit(submitForm)}
            style={styles.submit as ViewStyle}>
            {submitting
              ? <Spinner color='green' />
              : <Text>Сохранить</Text>
            }
          </Button>
        </View>
      </KeyboardAvoidingView>
      </View>
    </Form>;
  }
}

const form = reduxForm<ManageStaffFormData, Props>({
  form: 'manage-staff-form'
})(ManageStaffForm);

const mapStateToProps = (state: any) => {
  const form = state.form['manage-staff-form'];

  return {
    formData: form && form.values
  }
};

export default connect(mapStateToProps)(form);
