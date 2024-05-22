import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useScale} from "@/hooks/useScale";
import * as Application from 'expo-application';



export default function AboutScreen() {
    const styles = useAboutScreenStyles();


    return <View style={styles.container}>
        <Text>About Screen</Text>
        <Text>Version {Application.nativeApplicationVersion}</Text>
        <Text>Version {Application.nativeBuildVersion}</Text>
    </View>;
}

const useAboutScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            paddingTop: 20 * scale,
        }
    });
};
