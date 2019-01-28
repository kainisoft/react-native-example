import { Body, Button, Icon, Left, Right, Title } from 'native-base';
import * as React from 'react';
import { TextInput, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Header, { Props as HeaderProps} from '../header';
import { HeaderLeftButton } from '../header-left-button';
import styles from './styles';

export interface Props extends HeaderProps, NavigationScreenProps {
  filter: string;
  onSetFilter: (filter: string) => void;
  isDrawer?: boolean;
}

export interface State {
  isSearch: boolean;
  filter: string;
}

export default class HeaderSearch extends React.Component<Props, State> {
  readonly state: State = {
    isSearch: false,
    filter: this.props.filter
  };

  protected setSearch = (isSearch: boolean) => {
    this.setState({isSearch})
  };

  protected setSearchFalse = () => {
    this.setSearch(false);
  };

  protected serSearchTrue = () => {
    this.setSearch(true);
  };

  protected setFilter = (filter: string) => {
    this.setState({filter});
    this.props.onSetFilter(filter);
  };

  protected leftIsSearch = (
    <Left>
      <Button transparent onPress={this.setSearchFalse}>
        <Icon name='arrow-back' />
      </Button>
    </Left>
  );

  protected left = (
    <HeaderLeftButton
      navigation={this.props.navigation}
      isDrawer={this.props.isDrawer}
    />
  );

  protected bodyIsSearch = () => (
    <Body style={styles.searchBody as ViewStyle}>
      <TextInput
        autoFocus={true}
        style={styles.searchInput}
        onBlur={this.setSearchFalse}
        onChangeText={this.setFilter}
        value={this.state.filter}
      />
    </Body>
  );

  protected body = (
    <Body style={{flex: 3}}>
      <Title>{this.props.title}</Title>
    </Body>
  );

  protected right = (
    <Right>
      <Button transparent onPress={this.serSearchTrue}>
        <Icon name='search' />
      </Button>
    </Right>
  );


  render(): React.ReactNode {
    const { isSearch } = this.state;
    const { title, navigation, left } = this.props;

    return (
      <Header
        title={title}
        navigation={navigation}
        left={isSearch ? this.leftIsSearch : (left || this.left)}
        body={isSearch ? this.bodyIsSearch() : this.body}
        right={isSearch ? null : this.right}
      />
    );
  }
}
