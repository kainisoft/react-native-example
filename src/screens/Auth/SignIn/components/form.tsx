import { Button, Form, Spinner, Text, View } from 'native-base';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { FormData, HandleSubmit } from '../../../../app/types';
import styles from '../../styles';
import Localization from '../../../../lib/localization';
import { requiredValidator } from '../../../../utils/form/validators';
import Input, {FieldProps} from './input';

export interface SignInFormData extends FormData {
  username: string;
  password: string;
}

interface Props extends HandleSubmit<SignInFormData>{

}

type InjectedProps = InjectedFormProps<SignInFormData, Props>

class SignInForm extends React.Component<Props & InjectedProps> {

  render(): React.ReactNode {
    const {handleSubmit, submitForm, submitting} = this.props;

    return (
      <Form style={{flexGrow: 1}}>
        <View style={{flex: 2}}>
          <Field<FieldProps>
            name={'username'}
            component={Input}
            validate={requiredValidator}
            props={{
              label: Localization.t('loginScreen.email')
            }}
          />

          <Field<FieldProps>
            name={'password'}
            component={Input}
            validate={requiredValidator}
            props={{
              label: Localization.t('loginScreen.password'),
              secureTextEntry: true
            }}
          />
        </View>

        <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
          <Button
            rounded
            block
            disabled={submitting}
            onPress={handleSubmit(submitForm)}
            style={styles.submit as ViewStyle}>
            {submitting
              ? <Spinner color='green' />
              : <Text>Войти</Text>
            }
          </Button>
        </View>
      </Form>
    );
  }
}

export default reduxForm<SignInFormData, Props>({
  form: 'sign-in-form'
})(SignInForm);
