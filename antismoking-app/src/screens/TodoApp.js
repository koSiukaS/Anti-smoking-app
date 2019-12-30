import React from 'react';
import { Button, Text, View } from 'react-native';

import AddTodo from '../containers/AddTodo.js';
import VisibleTodos from '../containers/VisibleTodos.js';

export default class TodoAppScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'Todo App'
    };
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AddTodo />
        <View>
          <VisibleTodos/>
        </View>
      </View>
    );
  }
}
