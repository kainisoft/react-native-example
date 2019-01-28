import { Container } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import HeaderSearch from '../../components/header-search';
import TabView from '../../components/tab-view';
import { ScheduleEntityList } from '../../types/schedule';
import ScheduleList from './components/list';

interface Props extends NavigationScreenProps {
  past: ScheduleEntityList;
  future: ScheduleEntityList
}

export default class ScheduleScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <Container>
        <HeaderSearch
          onSetFilter={() => ''}
          title={'Расписание'}
          navigation={this.props.navigation}
          isDrawer={true}
        />

        <TabView
          routes={[
            {key: 'future', title: 'Предстоящие', scene: <ScheduleList list={this.props.future}/>},
            {key: 'past', title: 'Пройденные', scene: <ScheduleList list={this.props.past}/>}
          ]}
        />
      </Container>
    );
  }
}
