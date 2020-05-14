import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'


class DeckFolder extends Component {
     
    changeView = () => {
        this
            .props
            .navigation
            .navigate('Deck', {
                deck: {
                    ...this.props.deck
                }
            })
    }

    render() {    
        return (
            <TouchableOpacity style={styles.container} onPress={this.changeView}>
                <Text style={styles.title}>{this.props.deck.title}</Text>
                <Text style={styles.card}>
                    {this.props.deck.questions.length} {this.props.deck.questions.length <= 1 ? 'card' : 'cards'}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 280,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    title:{
        textAlign: 'center',
        color: '#666',
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 21
    },
    card: {
        textAlign: 'center',
        color: '#ccc',
        paddingTop: 10,
        paddingBottom: 15,
        fontWeight: '400',
        fontSize: 16
    }
})

export default DeckFolder