import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';

mapStateToProps = (state) => {
  return {
    smoke: state.smoke
  };
};

@connect(
  mapStateToProps
)
export default class MoneyBoard extends React.Component {
  static propTypes = {
    smokes: PropTypes.number
  }

  render() {
    return(
      <Text style={{ fontWeight: '600', fontSize: 20, color: 'rgb(68,68,68)' }}>
      {(this.props.smokes * this.props.smoke.cigarettePrice).toFixed(2)}€</Text>
    );
  }
}
