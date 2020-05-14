import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { addCardToDeck } from '../utils/api'


class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    onChangeText = (text, inputType) => {
        if (inputType === 'question') {
            this.setState({question: text})
        } else {
            this.setState({answer: text})
        }
    }

    addNewCard = () => {
        let deckDetails = {
            ...this.props.navigation.state.params
        }
        let key = deckDetails.key
        let questionAnswer = {
            question: this.state.question,
            answer: this.state.answer
        }
        addCardToDeck(key, questionAnswer)
        this.setState({ question: '', answer: '' })
        this.props.navigation.goBack()
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a question"
                    onChangeText={(text) => this.onChangeText(text, 'question')}
                    value={this.state.question} />
                <TextInput
                    style={styles.input}
                    placeholder="Add an answer"
                    onChangeText={(text) => this.onChangeText(text, 'answer')}
                    value={this.state.answer} />
                <TouchableOpacity
                    style={this.state.question === '' || this.state.answer === "" ? [styles.buttonSubmit, { backgroundColor: '#bbb' }] : styles.buttonSubmit}
                    onPress={this.addNewCard}
                    disabled={this.state.question === '' || this.state.answer === ""}>
                    <Text style={styles.buttonSubmitText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        width: 280,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonSubmit: {
        backgroundColor: "#555",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 50,
        marginTop: 15,
        borderRadius: 8
    },
    buttonSubmitText: {
        color: "#fff"
    }
})
export default AddCard