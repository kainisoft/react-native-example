import {
  Grid
} from 'native-base';
import * as React from 'react';
import {
  DatePickerAndroid,
  ListRenderItemInfo,
  SectionList, SectionListData,
  TimePickerAndroid,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { NavigateTo } from '../../../../app/app';
import { BanquetEntity, BanquetEntityList, GroupBanquet } from '../../../../types/banquet';
import { DateUtils } from '../../../../utils/date';
import IconCol from './components/icon-col';
import InfoCol from './components/info-col';
import { SectionHeader } from './components/section-header';


export interface Props extends NavigationScreenProps {
  banquets: GroupBanquet;
  onUpdateTime: (id: string, guests: number, time: string) => void;
}

export interface State {
  filterDate: Date | null;
  onlyDate: boolean;
}

interface ISectionList {
  title: string;
  data: BanquetEntityList;
}

export class BanquetList extends React.Component<Props, State> {
  readonly state: State = {
    filterDate: null,
    onlyDate: true
  };

  protected pressOnCoordination = (banquet: BanquetEntity) => {
    this.props.navigation.push(NavigateTo.BANQUET, {
      id: banquet.id
    });
  };

  protected pressOnIcon = (id: string, guests: number, time: string) => {
    this.props.onUpdateTime(id, guests, time);
  };

  protected setFilterByDate = async (date: string): Promise<any> => {
    const today = this.state.filterDate || DateUtils.fromDateString(date);
    const {
      action,
      year = today.getFullYear(),
      month = today.getMonth(),
      day = today.getDate()
    } = await DatePickerAndroid.open({
      date: today
    });

    if (action !== DatePickerAndroid.dismissedAction) {
      const {action: a2, hour, minute} = await TimePickerAndroid.open({
        hour: today.getHours(),
        minute: today.getMinutes(),
        mode: 'clock',
      });

      if (a2 !== TimePickerAndroid.dismissedAction) {
        this.setState({
          filterDate: new Date(year, month, day, hour, minute),
          onlyDate: false
        });
      } else {
        this.setState({
          filterDate: new Date(year, month, day),
          onlyDate: true
        });
      }
    } else {
      this.setState({
        filterDate: null
      });
    }
  };

  protected filterCoordination(coordinations: GroupBanquet): GroupBanquet {
    let result = Object.assign({}, coordinations);

    result = this.filterByDate(result);

    return result;
  }

  protected filterByDate(coordinations: GroupBanquet): GroupBanquet {
    const { filterDate } = this.state;

    if (filterDate === null) {
      return coordinations;
    }

    const result: GroupBanquet = {};
    const date = DateUtils.fromDate(filterDate);
    const group = `${date.getYearString()}-${date.getMonthStr()}-${date.getDateStr()}`;
    const list = coordinations[group] || [];

    if (this.state.onlyDate) {
      result[group] = list;
    } else {
      const [hour, minute] = [filterDate.getHours(), filterDate.getMinutes()];

      result[group] = list.filter(coordination => {
        const date = DateUtils.fromFullString(coordination.date);

        return date.getHours() === hour && date.getMinutes() === minute;
      });
    }

    return result;
  }

  protected convertGroupCoordinationToSectionList(coordinations: GroupBanquet): ISectionList[] {
    const result: ISectionList[] = [];

    Object.keys(coordinations).forEach(date => {
      result.push({
        title: date,
        data: coordinations[date]
      });
    });

    return result;
  };

  protected keyExtractor(item: BanquetEntity): string {
    return String(item.id).toString();
  }

  protected onSectionPress = (date: string) => {
    this.setFilterByDate(date);
  };

  protected renderSectionHeader = (info: {section: SectionListData<ISectionList>}): React.ReactElement<any> => {
    return (
      <SectionHeader
        title={info.section.title}
        onPress={this.onSectionPress}
      />
    );
  };

  protected renderItem = ({item: coordination}: ListRenderItemInfo<BanquetEntity>): React.ReactElement<any> => {
    return <Grid style={{padding: 10}}>
      <IconCol
        banquet={coordination}
        onPress={this.pressOnIcon}
      />

      <InfoCol
        banquet={coordination}
        onPress={this.pressOnCoordination}
      />
    </Grid>
  };

  protected renderCoordinationList(coordinations: GroupBanquet): React.ReactNode {
    const tmpCoords = this.filterCoordination(coordinations);

    return (
      <SectionList
        sections={this.convertGroupCoordinationToSectionList(tmpCoords)}
        keyExtractor={this.keyExtractor}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
      />
    );
  }

  render(): React.ReactNode {
    const {banquets} = this.props;

    return this.renderCoordinationList(banquets);
  }
}
