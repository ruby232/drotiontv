import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useScale} from "@/hooks/useScale";
import * as Application from 'expo-application';



export default function AboutScreen() {
    const styles = useAboutScreenStyles();


    return <View style={styles.container}>
        <Text>About Screen</Text>
        <Text>Application Version: {Application.nativeApplicationVersion}</Text>
        <Text>Build Version: {Application.nativeBuildVersion}</Text>
    </View>;
}

const useAboutScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            paddingStart: 50 * scale,
        }
    });
};
