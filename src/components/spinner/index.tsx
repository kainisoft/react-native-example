import { View } from 'native-base';
import * as React from 'react';

interface Props {

}

interface State {

}
export default class Spinner extends React.Component<Props, State> {

  render(): React.ReactNode {
    return (
      <View>
        <Spinner/>
        {this.props.children}
      </View>
    );
  }
}
