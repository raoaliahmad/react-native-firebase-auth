import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
	StatusBar,
  TextInput,
	Button,
} from 'react-native';
import Separator from '../../Components/Separator';


const Auth = () => {
	

	const [ data, setData ] = useState({
		email: "",
		password: ""
	})

	const handleTextChange = (val) => {
		setData({
			...data,
			email: val
		})
	}

	const handlePasswordChange = (val) => {
		setData({
			...data,
			password: val
		})
	}

	const createUser = () => {
		console.log("IN CRETAE USER")
		const { email, password } = data

		if (email === "" || password === "") {
			console.log("Please Enter SOmething")
			alert("PLEASE ENTER COMPLETE INFO")
			return 
		}
		console.log(email,password)
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User account created & signed in!');
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					alert('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
					alert('That email address is invalid!');
				}

			});
	}

	const LogIn = () => {
		const { email, password } = data

		if (email === "" || password === "") {
			console.log("Please Enter SOmething")
			alert("PLEASE ENTER COMPLETE INFO")
			return 
		}

		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User account created & signed in!');
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					alert('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
					alert('That email address is invalid!');
				}

				console.error(error);
			});
	}

	// const logOff = () => {
	// 	auth()
	// 		.signOut()
	// 		.then(() => console.log('User signed out!'));
	// }

	GoogleSignin.configure({
		webClientId: '151174959302-3mtrte5msvjfnqrprmfiv9egs89o8e63.apps.googleusercontent.com'
	});

	const onGoogleButtonPress = async () => {
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();
		console.log("GOT TOKEN",idToken)
		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
	  
		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	}

	const onFacebookButtonPress = async () => {
		// Attempt login with permissions
		const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
	  
		if (result.isCancelled) {
		  throw 'User cancelled the login process';
		}
	  
		// Once signed in, get the users AccesToken
		const data = await AccessToken.getCurrentAccessToken();
	  
		if (!data) {
		  throw 'Something went wrong obtaining access token';
		}
	  
		// Create a Firebase credential with the AccessToken
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
	  
		// Sign-in the user with the credential
		return auth().signInWithCredential(facebookCredential);
	  }

	return (
		<View style={styles.cont}>
			<View style={styles.form}>
				<Text style={styles.title}>Log In</Text>
				<TextInput
					placeholder="Email"
					autoCapitalize="none"
					onChangeText={(val) => handleTextChange(val)}
				/>
				<TextInput
					placeholder="Password"
					autoCapitalize="none"
					secureTextEntry={true}
					onChangeText={(val) => handlePasswordChange(val)}
				/>

				<Button
					title="Log In"
					onPress={LogIn}
				/>
				<Separator/>
				<Button
					title="Create Account"
					onPress={createUser}
				/>
				<Separator/>
				<Button
					style={styles.button}
					title="Google Sign-In"
					onPress={
						() => onGoogleButtonPress()
							.then(() => console.log('Signed in with Google!'))
							.catch(err => console.log(err))
					}
				/>
				<Separator/>
				<Button
					style={styles.button}
					title="Facebook Sign-In"
					onPress={
						() => onFacebookButtonPress()
							.then(() => console.log('Signed in with Facebook!'))
							.catch(err => console.log(err))
					}
				/>

			</View>

		</View>
	)
}

export default Auth

const styles = StyleSheet.create({
	cont: {
		flex:1,
		backgroundColor: "pink",
		padding: 20,
		flexDirection: "column",
		justifyContent: "center",
	},
	form: {
		borderRadius: 10,
		backgroundColor: "white",
		padding: 40,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold'
	}
})