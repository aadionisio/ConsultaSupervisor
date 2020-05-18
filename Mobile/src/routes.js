import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import LogIn from './pages/Login';
import Menu from './pages/Menu';
// import Desconto from './pages/Desconto';
import Vendarca from './pages/Vendarca';
import SelectDados from './pages/autDesconto/SelectDados';
import Confirm from './pages/autDesconto/Confirm';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: LogIn,

        App: createBottomTabNavigator(
          {
            Menu: {
              screen: createStackNavigator(
                { Menu, Vendarca },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitle: '',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    headerTitleAlign: 'center',
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Vendas',
                tabBarIcon: (
                  <Icon
                    name="local-atm"
                    size={20}
                    color="rgba(255,255,255,0.6)"
                  />
                ),
              },
            },
            AutDesconto: {
              screen: createStackNavigator(
                {
                  SelectDados,
                  Confirm,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    headerTitleAlign: 'center',
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Autorizar Desconto',
                tabBarIcon: (
                  <Icon
                    name="control-point"
                    size={20}
                    color="rgba(255,255,255,0.6)"
                  />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#2E8B57',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
        // initialRouteName: 'Sign',
      }
    )
  );
