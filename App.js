import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';
import AuthScreen from './screens/AuthScreen';
import ComplaintScreen from './screens/ComplaintScreen';

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Icon } from 'react-native-elements';



const store = createStore(reducers, { },
    compose(
        applyMiddleware(thunk)
    )
);

//Creating the main navigation
const MainNavigator = createBottomTabNavigator({

        map: {
            screen: createStackNavigator({
                map: { screen: MapScreen  },
                complaint: { screen: ComplaintScreen },
                auth: { screen: AuthScreen }
            } )
            ,
            navigationOptions:{
                title:'Mapa',
                tabBarIcon : ({tintColor}) => {
                    return <Icon name='my-location' size={30} color={tintColor}/>
                },
                header: null
            }},
        about:{ screen: AboutScreen, navigationOptions: {
                title:'Acerca de',
                tabBarIcon : ({tintColor}) => {
                    return <Icon name='question'  type='antdesign' size={30} color={tintColor}/>
                }
            } }



    },
    {
        navigationOptions: () => ({


        })
    }
);


const AppContainer = createAppContainer(MainNavigator);




export default class App extends React.Component {
  render() {
    return (
        <Provider store={ store }>

            <AppContainer />
        </Provider>
    );
  }
}


