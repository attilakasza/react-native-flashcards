import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck } from '../utils/api'


class DeckView extends Component {

    state = {
        deck: {
            questions: []
        }
    }

    addCard = () => {
        this.props.navigation.navigate('AddCard', {
                ...this.props.navigation.state.params.deck
            })
    }

    startQuiz = () => {
        this.props.navigation.navigate('Quiz', [...this.state.deck.questions])
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getDeck()
        })
    }

    getDeck = async() => {
        let deck = await getDeck(this.props.navigation.state.params.deck.key)
        this.setState({deck: deck})
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonQuiz} onPress={this.startQuiz}>
                    <Text style={styles.buttonQuizText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={this.addCard}>
                    <Text style={styles.buttonAddText}>Add Card</Text>
                </TouchableOpacity>
                <Text style={styles.card}>
                    {this.state.deck.questions.length} {this.state.deck.questions.length <= 1 ? 'card' : 'cards'}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 70
    },
    buttonQuiz: {
        backgroundColor: "#555",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 50,
        marginTop: 15,
        borderRadius: 8
    },
    buttonQuizText: {
        color: "#fff"
    },
    buttonAdd: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#555",
        borderWidth: 1,
        width: 150,
        height: 50,
        marginTop: 15,
        borderRadius: 8
    },
    buttonAddText: {
        color: "#555"
    },
    card: {
        color: "#555",
        marginTop: 70
    },
})

export default DeckView