import config            from './config'
import { getFirestore }  from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebase = initializeApp(config)
export const db = getFirestore(firebase)