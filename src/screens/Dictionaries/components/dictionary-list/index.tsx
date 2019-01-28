import { Body, Left, ListItem, Text } from 'native-base';
import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import CheckBoxRound from '../../../../components/checkbox-round/index';
import { DictionaryEntity, DictionaryEntityList, onSelectDictionary } from '../../../../types/dictionary';

export interface Props {
  list: DictionaryEntityList;
  onSelect: onSelectDictionary;
  selected?: string;
}

export default class DictionaryList extends React.Component<Props> {

  protected onDictionaryPressed = (dictionary: DictionaryEntity) => {
    return () => {
      this.props.onSelect(dictionary);
    }
  };

  protected keyExtractor = (item: DictionaryEntity, index: number): string => {
    return String(item.id ? item.id : index);
  };

  protected renderItem = (info: ListRenderItemInfo<DictionaryEntity>): React.ReactElement<any> | null =>  {
    const { selected } = this.props;
    const item = info.item;

    return <ListItem style={{marginLeft: 0, paddingTop: 10, paddingBottom: 10}} icon onPress={this.onDictionaryPressed(item)}>
      <Left style={{marginLeft: 20}}>
        <CheckBoxRound checked={!!selected && info.item.displayName === selected}/>
      </Left>
      <Body style={{alignItems: 'flex-start'}}>
        <Text>{item.displayName}</Text>
      </Body>
    </ListItem>
  };

  render(): React.ReactNode {
    const { list } = this.props;

    return <FlatList
      data={list}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
    />;
  }
}
