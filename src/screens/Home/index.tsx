import { Container, Content } from 'native-base';
import * as React from 'react';

interface Props {
  header: React.ReactNode;
  banquetList: React.ReactNode;
}

const HomeScreen: React.SFC<Props> = ({header, banquetList, children: fab}) => {
  return (
    <Container>
      {header}

      <Content>
        {banquetList}
      </Content>

      {fab}
    </Container>
  )
};

export default HomeScreen;
