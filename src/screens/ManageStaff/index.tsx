import { Container, Content } from 'native-base';
import * as React from 'react';

export interface Props {
  header: React.ReactNode;
  form: React.ReactNode;
}

export default class ManageStaffScreen extends React.Component<Props> {

  render(): React.ReactNode {
    const { header, form } = this.props;

    return <Container>
      {header}

      <Content>
        {form}
      </Content>
    </Container>;
  }
}
