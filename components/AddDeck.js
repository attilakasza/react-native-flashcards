import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { saveDeckTitle, getDeck } from '../utils/api'


class AddDeck extends Component {
    
    state = {
        title: ''
    }

    onChangeText = (text) => {
        this.setState({ title: text })
    }

    createDeck = async () => {
        let key = (Date.now()).toString()
        let title = this.state.title
        await saveDeckTitle({ key, title })
        this.setState({ title: '' })
        let deck = await getDeck(key)
        this
            .props
            .navigation
            .navigate('Deck', {
                deck: {
                    ...deck
                }
            })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a title"
                    onChangeText={this.onChangeText}
                    value={this.state.title} />
                <TouchableOpacity
                    style={this.state.title === '' ? [styles.buttonSubmit, { backgroundColor: '#bbb' }] : styles.buttonSubmit}
                    onPress={this.createDeck}
                    disabled={this.state.title === ''}>
                    <Text style={styles.buttonSubmitText}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee"
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: '#000',
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

export default AddDeck