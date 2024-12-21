import initilizationAuthentication from '@/firebase/firebase.init.js'
import router from '@/router'
import { useStore } from '@/store/index'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
initilizationAuthentication()

const googleProvider = new GoogleAuthProvider()

// const store = useStore()

const auth = getAuth()
export const googleSignIn = async () => {
  const store = useStore()
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const user = result.user
    const berer = user.accessToken
    store.setUserInfo(user);
    store.setBerer(berer);
    console.log('User:', user)
    console.log('Credential:', credential)
    sessionStorage.setItem('berer', berer)
  } catch (error) {
    console.error('Error during Google sign-in:', error)
  }
}

export const userCreate = (email, password, displayName, photoURL, phoneNumber) => {
  const store = useStore()
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
      })
      const user = userCredential.user;
      const berer = user.accessToken;
      sessionStorage.setItem('berer', berer);
      store.setUserInfo(user);
      store.setBerer(berer);
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      // ..
    })
}

export const signIn = async (email, password) => {
  const store = useStore()
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      const berer = user?.accessToken
      sessionStorage.setItem('berer', berer);
      store.setUserInfo(user);
      store.setBerer(berer);
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

export const logOut = async () => {
  signOut(auth)
    .then(() => {
      sessionStorage.removeItem('berer')
    })
    .catch((error) => {
      console.log(error)
    })
}

export const authChange = () => {
  const store = useStore()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = user
      store.setUserInfo(userData);
      store.setBerer(user.accessToken);
      router.push('/')
      // ...
    } else {
      // User is signed out
      // ...
    }
  })
}
