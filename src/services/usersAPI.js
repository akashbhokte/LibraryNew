import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../firestore/config';

//get user
export const validateUser = (email, password) => {
  return new Promise((res, rej) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential?.user;
          res(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          rej(errorMessage);
        });
    } catch (err) {
      rej('something went wrong');
    }
  });
};

//create admin

export const createAdminUser = () => {
  const email = 'jaiganesh2528@gmail.com';
  const password = '1234567890';
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('user', user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorMessage);
    });
};
