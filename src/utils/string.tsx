export class StringUtils {
  static toInt(str: string[]) {
    return str.map(s => parseInt(s, 10));
  }
}
