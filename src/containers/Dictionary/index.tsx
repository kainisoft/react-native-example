import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { GlobalState } from '../../app/actions';
import DictionariesScreen from '../../screens/Dictionaries';
import {
  DictionaryEntity,
  DictionaryEntityList,
  DictionaryNavigationParams,
  DictionaryType, onSelectDictionary, State
} from '../../types/dictionary';
import { load } from './actions';

export interface Props extends NavigationScreenProps<DictionaryNavigationParams> {
  load: (type: DictionaryType) => void;
  dictionaries: DictionaryEntityList;
}

class DictionaryContainer extends Component<Props> {

  componentDidMount(): void {
    const { navigation, load} = this.props;

    load(
      navigation.getParam('type', DictionaryType.BANQUET_PLACE)
    );
  }

  protected onSelect: onSelectDictionary = (dictionary: DictionaryEntity) => {
    const { navigation } = this.props;
    const { onSelect } = navigation.state.params as DictionaryNavigationParams;

    onSelect(dictionary);
    navigation.goBack();
  };

  render(): React.ReactNode {
    const { dictionaries, navigation } = this.props;
    const { title, selected } = navigation.state.params as DictionaryNavigationParams;

    return <DictionariesScreen
      title={title}
      dictionaries={dictionaries}
      navigation={navigation}
      onSelect={this.onSelect}
      selected={selected}
    />;
  }
}

const getDictionaries = createSelector(
  (state: State, props: Props) => {
    const type = props.navigation.getParam('type');

    return state[type];
  },
  dictionaries => ({dictionaries})
);

const mapStateToProps = (state: GlobalState, props: Props) => {
  return getDictionaries(state.dictionaryState, props);
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    load: (type: DictionaryType) => dispatch(load(type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryContainer);
