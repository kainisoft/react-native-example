import { Button, Content, Spinner, Text, View } from 'native-base';
import React, { Component } from 'react';
import { ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { NavigateTo } from '../../app/app';
import { FormData, HandleSubmit } from '../../app/types';
import Localization from '../../lib/localization/index';
import { DictionaryEntity, DictionaryType } from '../../types/dictionary';
import styles from './styles';
import DateTimeField from './fields/date-time';
import GuestsField, { GuestsFieldProps } from './fields/guests';
import PlaceField, { PlaceFieldProps } from './fields/place';
import PlaceTypeField, { PlaceTypeFieldProps } from './fields/place-type';

export interface ManageBanquetFormData extends FormData {
  [DictionaryType.BANQUET_PLACE]: string;
  [DictionaryType.BANQUET_TYPE]: string;
  guests: number;
  time: string;
}

export interface Props extends NavigationScreenProps, HandleSubmit<ManageBanquetFormData> {
  formValues?: ManageBanquetFormData;
}

export type InjectedProps = InjectedFormProps<ManageBanquetFormData, Props>;

const required = (value: any) => !!value ? undefined : 'Required';

class ManageBanquetForm extends Component<Props & InjectedProps> {

  protected openDictionary = (type: DictionaryType.BANQUET_PLACE | DictionaryType.BANQUET_TYPE) => {
    const { navigation, formValues } = this.props;

    navigation.push(NavigateTo.DICTIONARY, {
      type,
      title: Localization.t(`banquet.${type}`),
      onSelect: this.onSelectDictionary(type),
      selected: formValues && formValues[type]
    });
  };

  protected openDictionaryPlace = () => this.openDictionary(DictionaryType.BANQUET_PLACE);

  protected openDictionaryType = () => this.openDictionary(DictionaryType.BANQUET_TYPE);

  protected onSelectDictionary = (type: DictionaryType) => (dictionary: DictionaryEntity) => {
    this.props.change(type, dictionary.displayName);
  };

  protected handleSubmit = (formData: ManageBanquetFormData) => {
    return this.props.submitForm(formData);
  };

  render(): React.ReactNode {
    const { handleSubmit, submitting } = this.props;

    return <Content contentContainerStyle={styles.content as ViewStyle}>
      <View style={styles.fieldsContainer}>
        <Field<PlaceFieldProps>
          name={DictionaryType.BANQUET_PLACE}
          component={PlaceField}
          props={{openDictionaryPlace: this.openDictionaryPlace}}
          validate={required}
        />

        <Field<GuestsFieldProps>
          name={'guests'}
          component={GuestsField}
          validate={required}
        />

        <Field<PlaceTypeFieldProps>
          name={DictionaryType.BANQUET_TYPE}
          component={PlaceTypeField}
          props={{openDictionaryPlaceType: this.openDictionaryType}}
          validate={required}
        />

        <Field
          name={'time'}
          component={DateTimeField}
          validate={required}
        />
      </View>

      <View style={styles.submitWrapper}>
        <Button
          rounded
          block
          disabled={submitting}
          onPress={handleSubmit(this.handleSubmit)}
        >
          {submitting
            ? <Spinner color='green' />
            : <Text>Сохранить</Text>
          }
        </Button>
      </View>
    </Content>
  }
}

const form = reduxForm<ManageBanquetFormData, Props>({
  form: 'manage-banquet-form'
})(ManageBanquetForm);

const mapStateToProps = (state: any) => {
  const form = state.form['manage-banquet-form'];

  return {
    formValues: form && form.values
  }
};

export default connect(mapStateToProps)(form);
