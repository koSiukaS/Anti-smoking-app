import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";

import { items } from '../constants/Constants';

class Item extends React.Component {
  static propTypes = {
    smokes: PropTypes.number
  }
  
  _getImage = (imageSource) => {
    return <Image style={{ height: 200, width: 200 }} source={imageSource}/>;
  }

  _valueCheck = (spentAmount) => {
    for (let i = 0; i < items.length; i++) {
    if (!items[i + 1]) return this._getImage(items[i].source);
    if (spentAmount < items[i + 1].price) return this._getImage(items[i].source);
    }
  };

  render() {
    return <View>{this._valueCheck(this.props.smokes)}</View>;
  }
}

export default Item;
