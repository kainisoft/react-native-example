import { Content } from 'native-base';
import { ReactNode } from 'react';
import * as React from 'react';

interface Props {
  form: ReactNode;
}

export default class SignInScreen extends React.Component<Props> {

  render(): React.ReactNode {
    return (
      <Content contentContainerStyle={{flexGrow: 1}}>

        {this.props.form}

      </Content>
    )
  }

}
