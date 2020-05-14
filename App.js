import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { setLocalNotification } from './utils/api'
import TabNavigatorContainer from './components/TabNavigator'


class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#bbb" />
        <TabNavigatorContainer />
      </View>
    )
  }
}

export default App