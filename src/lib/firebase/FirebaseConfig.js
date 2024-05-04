// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export default {
	apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_KEY,
	authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
	projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
	appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: import.meta.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
