// const baseURL = "https://salewhat.co";
const baseURL = 'http://localhost:3000'
import firebase from 'firebase'

//this is use for test by seyha
const configTest = {
  apiKey: 'AIzaSyD9_xvXL0C-k9h2ehSUhPwCtVmRX3ucCSA',
  authDomain: 'testing-e7224.firebaseapp.com',
  databaseURL: 'https://testing-e7224.firebaseio.com',
  projectId: 'testing-e7224',
  storageBucket: 'testing-e7224.appspot.com',
  messagingSenderId: '1005324053014'
}
//this is for production by kevin
const config = {
  apiKey: 'AIzaSyAEzevMw6-n6btyfqddhv5EoPbWJ84uuWY',
  authDomain: 'sale-what.firebaseapp.com',
  databaseURL: 'https://sale-what.firebaseio.com',
  projectId: 'sale-what',
  storageBucket: 'sale-what.appspot.com',
  messagingSenderId: '62082994228',
  appId: '1:62082994228:web:5316e43e70640cb962ba61',
  measurementId: 'G-614FQCNR1K'
}

export const app = firebase.initializeApp(config)
export const provider = {
  baseURL: baseURL,
  prefix: '/api/v1',
  isSuper: (roles) => roles.includes('super'),
  isAdmin: (roles) => roles.includes('admin'),
  isGM: (roles) => roles.includes('gm'),
  isCashier: (roles) => roles.includes('cashier'),
  isDecore: (roles) => roles.includes('decore'),
  isPublic: (roles) => roles.length >= 0 // we dont care whether role you are
}
