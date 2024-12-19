import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase.config'

const initilizationAuthentication = () => {
  initializeApp(firebaseConfig)
}

export default initilizationAuthentication
