import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
	Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';


const One = ({ navigation }) => {
	const logOff = () => {
			auth()
			.signOut()
			.then(() => console.log('User signed out!'));
		}
	return (
		<SafeAreaView style={styles.container}>
			<Button
				title="Log Out"
				onPress={logOff}
			/>
		</SafeAreaView>
	)
}

export default One

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	}
})