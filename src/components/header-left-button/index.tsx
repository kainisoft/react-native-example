import { Button, Icon, Left } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';

export interface Props extends NavigationScreenProps {
  isDrawer?: boolean;
}

export class HeaderLeftButton extends React.PureComponent<Props> {

  protected openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  protected goBack = () => {
    this.props.navigation.goBack();
  };

  render(): React.ReactNode {
    const {isDrawer} = this.props;

    return (
      <Left>
        <Button transparent>

          {isDrawer
            ? <Icon
              active
              name={'menu'}
              onPress={this.openDrawer}
            />
            : <Icon
              active
              name={'arrow-back'}
              onPress={this.goBack}
            />
          }

        </Button>
      </Left>
    );
  }
}
