import { Content } from 'native-base';
import * as React from 'react';
import TableView, { IRow } from '../../../components/table-view';
import platform from '../../../theme/variables/platform';
import { ScheduleEntityList } from '../../../types/schedule';

interface Props {
  list: ScheduleEntityList
}

export default class ScheduleList extends React.Component<Props> {

  protected convert(): IRow[] {
    return this.props.list.map((scheduleEntity, index) => {
      const [day, time] = scheduleEntity.date.split(' ');
      const [year, month, date] = day.split('-');
      const [hour, minute] = time.split(':');
      const dateObj = new Date();

      dateObj.setFullYear(+year);
      dateObj.setMonth(+month);
      dateObj.setDate(+date);
      dateObj.setHours(+hour);
      dateObj.setMinutes(+minute);

      const dayStr = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth()).padStart(2, '0')}.${dateObj.getFullYear()}`;
      const timeStr = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;

      return {
        key: `${dayStr} ${timeStr} ${index}`,
        cols: [
          {title: String(index + 1), size: 0.2, style: {color: '#828282'}},
          {title: dayStr},
          {title: scheduleEntity.place_name},
          {title: String(scheduleEntity.guests_adult) || ''},
          {title: timeStr},
        ],
        style: {
          padding: 5
        }
      }
    });
  }

  render(): React.ReactNode {
    return (
      <Content contentContainerStyle={{padding: 5, paddingTop: 20}}>
        <TableView
          header={{
            items: [
              {title: '', size: 0.2},
              {title: 'Дата'},
              {title: 'Заведение'},
              {title: 'Заявка'},
              {title: 'Начало'},
            ],
            textStyle: {
              color: platform.backgroundMainColor,
              textAlign: 'center'
            },
            style: {
              marginTop: 5,
              marginBottom: 5
            }
          }}
          body={{
            rows: this.convert(),
            textStyle: {
              textAlign: 'center'
            },
            style: {
              marginTop: 15,
              marginBottom: 5
            }
          }}
        />
      </Content>
    );
  }
}
