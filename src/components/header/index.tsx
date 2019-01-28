import { Constants } from 'expo';
import { Body, Button, Icon, Left, Header as NBHeader, Title } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';

export interface Props extends NavigationScreenProps {
  title: string;
  left?: React.ReactNode;
  body?: React.ReactNode;
  right?: React.ReactNode;
  icon?: string;
}

export interface State {
  selected: string;
}

export default class Header extends React.PureComponent<Props, State> {

  protected left = (
    <Left>
      <Button transparent>
        <Icon
          active
          name={this.props.icon || 'md-arrow-back'}
          onPress={() => this.props.navigation.goBack()}
        />
      </Button>
    </Left>
  );

  protected body = (
    <Body style={{flex: 3}}>
      <Title>{this.props.title}</Title>
    </Body>
  );

  protected right = null;

  render(): React.ReactNode {
    const { left, body, right } = this.props;

    return <NBHeader style={{marginTop: Constants.statusBarHeight}}>
      {left || this.left}

      {body || this.body}

      {right || this.right}

    </NBHeader>
  }
}
