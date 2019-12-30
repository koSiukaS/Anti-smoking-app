import React from 'react';
import { 
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import { store } from './src/store/index';

import MessageModal from './src/modals/Message';
import MenuScreen from './src/screens/Menu';
import HomeScreen from './src/screens/Home';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    contentComponent: ({ navigation }) => (
      <MenuScreen navigation={ navigation } />
      ),
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: DrawerStack
    },
    Message: {
      screen: MessageModal,
      navigationOptions: () => ({
        gesturesEnabled: true,
        gestureResponseDistance: { vertical: 600 },
      }),
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
    cardStyle: {
      opacity: 1.0
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  renderLoading = () => {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
