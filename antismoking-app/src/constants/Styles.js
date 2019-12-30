import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({

  defaultStyle: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgb(101,119,144)',
    backgroundColor: 'rgb(202,214,219)',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: 'rgb(127,150,171)',
  },

  mainMenuContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height / 400
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});