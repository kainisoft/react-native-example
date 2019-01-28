import { Text } from 'native-base';
import * as React from 'react';
import { ScrollView, TextStyle, ViewStyle } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';

export interface Header {
  title: string;
  size?: number;
}

export interface ICol {
  title: string;
  size?: number;
  style?: TextStyle;
}

export interface IRow {
  key: string;
  cols: ICol[];
  style?: ViewStyle,
}

interface Props {
  header?: {
    items: Header[];
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
  body: {
    rows: IRow[];
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
}

export default class TableView extends React.Component<Props> {

  protected renderHeader() {
    const {header} = this.props;

    if (!header) {
      return null;
    }

    return (
      <Row style={header.style}>
        {header.items.map(item => {
          return (
            <Col size={item.size} key={item.title}>
              <Text style={header.textStyle}>
                {item.title}
              </Text>
            </Col>
          );
        })}
      </Row>
    );
  }

  protected renderBody() {
    const {body} = this.props;

    if (!body.rows.length) {
      return (
        <Row style={{padding: 10}}>
          <Col>
            <Text style={{textAlign: 'center'}}>Пусто</Text>
          </Col>
        </Row>
      )
    }

    return body.rows.map(row => {
      return (
        <Row style={row.style} key={row.key}>
          {row.cols.map((col, index) => {
            return <Col size={col.size} key={`${col.title} ${index}`}>
              <Text style={[body.textStyle, col.style]}>{col.title}</Text>
            </Col>
          })}
        </Row>
      );
    });
  }

  render(): React.ReactNode {
    return (
      <ScrollView>
        <Grid>
          {this.renderHeader()}

          {this.renderBody()}
        </Grid>
      </ScrollView>
    );
  }

}
