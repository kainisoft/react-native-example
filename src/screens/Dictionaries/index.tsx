import { Container, Content } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { DictionaryEntityList, onSelectDictionary } from '../../types/dictionary';
import DictionaryList from './components/dictionary-list';
import HeaderSearch from '../../components/header-search';

export interface Props extends NavigationScreenProps<any> {
  title: string;
  dictionaries: DictionaryEntityList;
  onSelect: onSelectDictionary;
  selected?: string;
}

export interface State {
  filter: string;
}

export default class DictionariesScreen extends Component<Props, State> {

  readonly state: State = {
    filter: ''
  };

  protected onSetFilter = (filter: string) => {
    this.setState({filter});
  };

  protected useFilter(list: DictionaryEntityList, filter: string): DictionaryEntityList {
    if (!filter) {
      return list;
    }

    return list.filter(dictionaryEntity => dictionaryEntity.displayName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  };

  render(): React.ReactNode {
    const { title, navigation, dictionaries, onSelect, selected } = this.props;
    const { filter } = this.state;

    return <Container>
      <HeaderSearch
        title={title}
        onSetFilter={this.onSetFilter}
        navigation={navigation}
      />

      <Content>
        <DictionaryList
          list={this.useFilter(dictionaries, filter)}
          onSelect={onSelect}
          selected={selected}
        />
      </Content>

    </Container>;
  }
}
