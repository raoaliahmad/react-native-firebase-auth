
import React from 'react'
import { View,StyleSheet } from 'react-native'

const Separator = () => (
  <View style={styles.separator} />
);

export default Separator

const styles = StyleSheet.create({
	separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})