import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image
} from 'react-native';

import { Text } from 'native-base';

import {
  StackActions,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Homepage from './screens/Homepage';
import DynamicData from './screens/DynamicData';
import StaticData from './screens/StaticData';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Homepage,
      navigationOptions: () => ({
        tabBarLabel: 'Homepage',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="home" size={23} color={tintColor} />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        },
        swipeEnabled: false,
      }),
    },
    Dynamic: {
      screen: DynamicData,
      navigationOptions: () => ({
        tabBarLabel: 'Dynamic Data',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="play" size={23} color={tintColor} />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        },
      }),
    },
    Static: {
      screen: StaticData,
      navigationOptions: () => ({
        tabBarLabel: 'Static Data',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="pause" size={23} color={tintColor} />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        },
        swipeEnabled: false,
      }),
    },
  },
  {
    screenOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#2196f3',
      showLabel: false,
      // labelPosition: 'below-icon',
      activeBackgroundColor: '#2196f3',
    },
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      TabNavigator: TabNavigator,
    },
    {
      initialRouteName: 'TabNavigator',
    },
  ),
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {

    }
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <AppContainer />
    );
  }
  render() {
    return (
      <AppContainer />
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default (App);
