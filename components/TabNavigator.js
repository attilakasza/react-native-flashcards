import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import AddDeck from './AddDeck'
import RootStackComponent from './StackNavigator'


const tabNavigator = createBottomTabNavigator({
  Home: {
    screen: RootStackComponent,
    navigationOptions: {
      title: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-book" color={tintColor} size={20} />
      ),
      tabBarOptions: {
        activeTintColor: "#222",
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-add" color={tintColor} size={20} />
      ),
      tabBarOptions: {
        activeTintColor: "#222",
      }
    }
  }
})

const TabNavigatorContainer = createAppContainer(tabNavigator)

export default TabNavigatorContainer