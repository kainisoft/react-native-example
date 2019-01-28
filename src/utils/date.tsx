import { StringUtils } from './string';

export class CustomDate extends Date {

  constructor(year: number, month: number, date: number, hours: number, minutes: number, seconds: number) {
    super(year, month - 1, date, hours, minutes, seconds);
  }

  getYearString(): string {
    return super.getFullYear().toString();
  }

  getMonth(): number {
    return (super.getMonth() + 1);
  }

  getMonthStr(): string {
    return this.getMonth().toString().padStart(2, '0');
  }


  getDateStr(): string {
    return super.getDate().toString().padStart(2, '0');
  }

  getHoursStr(): string {
    return super.getHours().toString().padStart(2, '0');
  }


  getMinutesStr(): string {
    return super.getMinutes().toString().padStart(2, '0');
  }

  getSecondsStr(): string {
    return super.getSeconds().toString().padStart(2, '0');
  }

}

export interface FullDateStringParse {
  divider: string;
  dayDivider: string;
  timeDivider: string;
}

export class DateUtils {

  static fromFullString(dateStr: string, options?: FullDateStringParse) {
    const {divider = ' ', dayDivider = '-', timeDivider = ':'} = (options || {});
    const [day, time] = dateStr.split(divider);
    const [year, month, date] = StringUtils.toInt(day.split(dayDivider));
    const [hours, minutes, seconds] = StringUtils.toInt(time.split(timeDivider));

    return new CustomDate(year, month, date, hours, minutes, seconds);
  }

  static fromDateString(dateStr: string, divider = '-') {
    const [year, month, date] = StringUtils.toInt(dateStr.split(divider));

    return new CustomDate(year, month, date, 0, 0 ,0);
  }

  static fromDate(date: Date) {
    return new CustomDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  }

}
