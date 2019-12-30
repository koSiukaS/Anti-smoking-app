import React from 'react';
import { Button, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class Cigarette extends React.Component {
  static propTypes = {
    smoke: PropTypes.func
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={this.props.smoke}>
        <View style={{ backgroundColor:'rgba(255, 0, 255, 0.0)', width: '100%', height: '100%' }}/>
      </TouchableWithoutFeedback>
    );
  }
}

export default Cigarette;
