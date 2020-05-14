import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

const asyncStorageKey = "udacityStorageKey"
const NOTIFICATION_KEY = "flashcards:notifcation"

export async function getDecks() {
    let getJSON = await AsyncStorage.getItem(asyncStorageKey, (err, result) => {
        return result
    })

    let Objects = JSON.parse(getJSON)
    let values = Objects === null ? null : Object.values(Objects)
    return values
}

export async function getDeck(key) {
    let getJSON = await AsyncStorage.getItem(`${asyncStorageKey}`, (err, result) => {
        return result
    })
    let value = JSON.parse(getJSON)[key]
    return value
}

export function saveDeckTitle({ key, title }) {
    AsyncStorage.mergeItem(`${asyncStorageKey}`, JSON.stringify(
        {
            [key]: {
                key,
                title,
                questions: []
            },
        }
    ))
}

export async function addCardToDeck(key, card) {
    let objectsJson = await AsyncStorage.getItem(`${asyncStorageKey}`)
    let objects = JSON.parse(objectsJson)
    objects[key].questions = [...objects[key].questions, card]
    AsyncStorage.setItem(`${asyncStorageKey}`, JSON.stringify(objects))
}

function createNotification() {
    return {
        title: 'Flashcard',
        body: "Don't forget to review a deck!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (Constants.isDevice && status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}