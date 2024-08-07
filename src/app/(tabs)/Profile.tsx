import { theme } from '@/theme';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.Container}>
        <Text style={styles.text}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.black
    },
    text:{
        fontSize: 22,
        color: theme.colors.white,
        fontFamily: theme.fontFamily.bold
    }
});