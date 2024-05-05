import {
	onAuthStateChanged as _onAuthStateChanged,
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithEmailAndPassword,
	updatePassword,
	signInWithPopup,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth";

import { auth } from "@/src/lib/firebase/firebase";

export function onAuthStateChanged(cb) {
	return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	try {
		await signInWithPopup(auth, provider);
	} catch (error) {
		console.error("Error signing in with Google", error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error("Error signing out with Google", error);
	}
}

export async function doPasswordReset(email) {
	let auth = getAuth();
	await sendPasswordResetEmail(auth, email);
}

export async function doSignInWithEmailAndPassword(email, password) {
	let auth = getAuth();
	await signInWithEmailAndPassword(auth, email, password);
}

export async function doChangePassword(email, oldPassword, newPassword) {
	const auth = getAuth();
	let credential = EmailAuthProvider.credential(email, oldPassword);
	console.log(credential);
	await reauthenticateWithCredential(auth.currentUser, credential);

	await updatePassword(auth.currentUser, newPassword);
	await doSignOut();
}

export async function doCreateUserWithEmailAndPassword(
	email,
	password,
	displayName
) {
	const auth = getAuth();
	await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(auth.currentUser, { displayName: displayName });
}
