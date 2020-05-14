import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/api'


class Quiz extends Component {

    state = {
        questionNumber: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        isAnswer: false,
    }

    handleAnswer = () => {
        this.setState((prevState) => ({
            isAnswer: !prevState.isAnswer
        }))
    }

    nextQuestion = (answer) => {
        if (answer === 'correct') {
            this.setState((prevState) => ({
                correctAnswers: prevState.correctAnswers + 1,
                isAnswer: false,
                questionNumber: prevState.questionNumber + 1
            }))
        } else {
            this.setState((prevState) => ({
                incorrectAnswers: prevState.incorrectAnswers + 1,
                isAnswer: false,
                questionNumber: prevState.questionNumber + 1
            }))
        }
    }

    restart = () => {
        clearLocalNotification().then(setLocalNotification)
        this.setState({questionNumber: 0, isAnswer: false, correctAnswers: 0, incorrectAnswers: 0})
    }

    goBack = () => {
        clearLocalNotification().then(setLocalNotification)
        this.props.navigation.goBack()
    }

    render() {
        const questions = [...this.props.navigation.state.params]
        const {questionNumber, correctAnswers} = this.state
        if (questions.length) {
            if (questions.length <= questionNumber) {
                return (
                    <View style={styles.container}>
                        <Text style={styles.score}>You scored {correctAnswers} out of {questions.length}</Text>
                        <TouchableOpacity style={styles.buttonRestart} onPress={this.restart}>
                            <Text style={styles.buttonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonBack} onPress={this.goBack}>
                            <Text>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionNumber}>
                            {this.state.questionNumber}/{questions.length}
                        </Text>
                        {this.state.isAnswer
                            ? (<Text style={styles.isAnswer}>{questions[this.state.questionNumber].answer}</Text>)
                            : (<Text style={styles.isAnswer}>{questions[this.state.questionNumber].question}</Text>)
                        }
                        <TouchableOpacity style={styles.buttonView} onPress={this.handleAnswer}>
                            <Text style={styles.buttonText}>
                                View {this.state.isAnswer ? 'question' : 'answer'}
                            </Text>
                        </TouchableOpacity>
                        {this.state.isAnswer ? (
                            <View style={styles.answers}>
                                <TouchableOpacity
                                    style={styles.buttonCorrect}
                                    onPress={() => this.nextQuestion('correct')}>
                                    <Text style={styles.buttonText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonIncorrect}
                                    onPress={() => this.nextQuestion('incorrect')}>
                                    <Text style={styles.buttonText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>)
                            : null}
                    </View>
                )
            }

        } else {
            return (
                <View style={styles.noQuiz}>
                    <Text >There is no card.</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    questionNumber: {
       fontSize: 70,
       justifyContent: "center",
       marginTop: 30,
    },
    isAnswer: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 40
    },
    buttonView: {
        backgroundColor: "#555",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20,
        width: 130,
        height: 45,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff"
    },
    answers: {
        flexDirection: "row",
        marginTop: 130
    },
    buttonCorrect: {
        backgroundColor: "#007f00",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20,
        width: 130,
        height: 45,
        borderRadius: 8,
        marginRight: 20,
    },
    buttonIncorrect: {
        backgroundColor: "#d4281b",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20,
        width: 130,
        height: 45,
        borderRadius: 8,
        marginLeft: 20,
    },  
    noQuiz: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    
    buttonRestart: {
        backgroundColor: "#555",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20,
        width: 130,
        height: 45,
        borderRadius: 8,
        marginTop: 80,
        marginBottom:30
    },
    buttonBack: {
        backgroundColor: "#fff",
        borderColor: "#555",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20,
        width: 130,
        height: 45,
        borderRadius: 8,
        borderColor: '#000',
    },
    score: {
        marginTop: 100
    }
})

export default Quiz