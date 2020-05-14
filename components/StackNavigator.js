import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DeckList from './DeckList'
import DeckView from './DeckView'
import AddCard from './AddCard'
import Quiz from './Quiz'


const rootStack = createStackNavigator({
  Home: {
    screen: DeckList,
    headerBackTitle: "Home",
    navigationOptions: {
      headerShown: false,
    }
  },
  Deck: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      headerTitle: `${navigation.state.params.deck.title}`,
      headerBackTitle: `${navigation.state.params.deck}`,
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Add Card",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Quiz",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    })
  }
})

const RootStackComponent = createAppContainer(rootStack)
  
export default RootStackComponent