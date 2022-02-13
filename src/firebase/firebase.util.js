import firebase from 'firebase/compat/app'
//importing firestore for database and auth for authentication
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
	apiKey: "AIzaSyAsfZBYgofTa1txxFW5ODh17XSdV9W_QT4",
	authDomain: "crwn-db-60cb4.firebaseapp.com",
	projectId: "crwn-db-60cb4",
	storageBucket: "crwn-db-60cb4.appspot.com",
	messagingSenderId: "519156425187",
	appId: "1:519156425187:web:781efdd0bb89b775b2c0d6"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//provider will provide authentication using GoogleAuthProvider authentication library
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)


//createUserProfileDocument method is the method used for storing the data in firestore database.
export const createUserProfileDocument = async (user, additionalData) => {
	//if user details [email, displayName, etc] are not available, return
	if (!user) return;

	// given the condition that users is the collection where we want to store our data
	//creating referenceObject
	const userRef = firestore.doc(`users/${user.uid}`)
	// getting snapshotObject from referenceObject
	const snapshot = await userRef.get()

	// email and displayName already exists in our userRef object create by firebase,
	// To check console.log(user)

	if (!snapshot.exists) {
		const { email, displayName } = user
		const createdAt = new Date();
		try {
			//storing the data of our user through referenceObject in database
			await userRef.set(
				{
					displayName,
					email,
					createdAt,
					...additionalData
				}
			)
		}
		catch (error) {
			console.log("Error getting the data");
		}
	}
	return userRef;
}

export default firebase