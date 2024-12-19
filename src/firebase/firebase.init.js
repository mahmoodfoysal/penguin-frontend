import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase.config.js'

const initilizationAuthentication = () => {
  initializeApp(firebaseConfig)
}

export default initilizationAuthentication
