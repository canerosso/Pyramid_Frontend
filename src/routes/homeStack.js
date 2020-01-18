import { Image } from 'react-native'
import React from 'react'
//import { SafeAreaView } from 'react-navigation'
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import WorkoutHistory from '../Screens/WorkoutHistory'
import WorkoutDetails from '../Screens/WorkoutDetail';
import InfoScreen from '../Screens/Info'

const activeColor = "#15324A";
const inactiveColor = "#b8bece";

const screens = {
    'Workouts': {
        screen: WorkoutHistory,
        navigationOptions: {
            title: 'My Workouts',
        }
    },
    'Workout Details': {
        screen: WorkoutDetails
    }
}

const infoScreens = {
    'Info': {
        screen: InfoScreen
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#15324A'
        },
        headerTintColor: '#ffffff',
    }, 
    // headerMode: 'float'
});

const InfoStack = createStackNavigator(infoScreens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#15324A'
        },
        headerTintColor: '#ffffff',
    }
})

HomeStack.navigationOptions = {
    tabBarLabel: 'Workout',
    tabBarOptions: {
        labelStyle: {
            fontSize: 16,
        }
    },
    tabBarIcon: ({focused}) => (
        <Image 
            source={require('../../assets/images/Pyramid_centered.png')}
            fadeDuration={0}
            style= {{width: 25, height: 25, tintColor: focused ? activeColor : inactiveColor}}
        />
    )
}

InfoStack.navigationOptions ={
    tabBarLabel: 'Info',
    tabBarOptions: {
        labelStyle: {
            fontSize: 16
        }
    },
    tabBarIcon: ({ focused }) => (
        <Entypo
          name="link"
          size={25}
          color={focused ? activeColor : inactiveColor}
        />
      )
}
const TabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        InfoStack
    },
    {
        tabBarOptions: {
            activeTintColor: activeColor,
            inactiveTintColor: inactiveColor,
            style: {marginTop: 10}
        }
    }
)

export default createAppContainer(TabNavigator)