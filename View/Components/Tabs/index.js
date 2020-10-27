import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import One from '../../Pages/page_one';
import Two from '../../Pages/page_two/index';
import Three from '../../Pages/page_three/index';
import Four from '../../Pages/page_four/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="One"
				activeColor="#f0edf6"
				inactiveColor="#3e2465"
				style={{ backgroundColor: '#694fad' }}
			>
				<Tab.Screen
					name="One"
					component={One}
					options={{
						tabBarLabel: 'One',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						)
					}}
				/>
				<Tab.Screen
					name="Two"
					component={Two}
					options={{
						tabBarLabel: 'Two',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="bell" color={color} size={26} />
						)
					}}
				/>
				<Tab.Screen
					name="Three"
					component={Three}
					options={{
						tabBarLabel: 'Three',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="account" color={color} size={26} />
						)
					}}
				/>
				<Tab.Screen
					name="Four"
					component={Four}
					options={{
						tabBarLabel: 'Four',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="account" color={color} size={26} />
						)
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}
export default BottomTabs