import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { GlobalState } from '../../app/actions';
import ScheduleScreen from '../../screens/schedule';
import { State } from '../../types/schedule';
import { load } from './actions';

interface Props extends NavigationScreenProps {
  load: () => void;
  erase: () => void;
  past: [];
  future: [];
}

class ScheduleContainer extends React.Component<Props> {

  componentDidMount(): void {
    this.props.load()
  }

  render(): React.ReactNode {
    const {navigation, past, future} = this.props;

    return (
      <ScheduleScreen
        navigation={navigation}
        past={past}
        future={future}
      />
    );
  }

}

const getPast = (state: State) => state.past;
const getFuture = (state: State) => state.future;

const getPastAndFeatureList = createSelector(
  [getPast, getFuture],
  (past = [], future = []) => {
    return {past, future};
  }
);

const mapStateToProps = (state: GlobalState) => {
  return getPastAndFeatureList(state.scheduleState);
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    load: () => dispatch(load())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleContainer);
