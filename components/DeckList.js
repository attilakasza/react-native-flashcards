import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import DeckFolder from './DeckFolder'
import { getDecks } from '../utils/api'


class DeckList extends Component {

    state = {
        decks: []
    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getAllDecks()
        })
    }

    getAllDecks = async () => {
        let decks = await getDecks()
        this.setState({ decks: decks })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.decks === null ?
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>You haven't added any deck yet.</Text>
                    </View>
                    :
                    this.state.decks.map(deck => {
                        return <DeckFolder title={deck.title} key={`${deck.key}`} deck={deck} navigation={this.props.navigation} />
                    })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    empty: {
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        fontSize: 20
    }
})

export default DeckList