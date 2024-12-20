import initilizationAuthentication from '@/firebase/firebase.init.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
initilizationAuthentication()

const googleProvider = new GoogleAuthProvider()

const auth = getAuth()
export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const user = result.user
    console.log('User:', user)
    console.log('Credential:', credential)
  } catch (error) {
    console.error('Error during Google sign-in:', error)
  }
}

export const userCreate = async (email, password, displayName, photoURL, phoneNumber) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      const berer = user.accessToken
      updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
      })

      console.log('user', user)
      console.log('token', berer)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      // ..
    })
}

export const signIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      const berer = user?.accessToken
      console.log('user', user)
      console.log('berer', berer)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}
