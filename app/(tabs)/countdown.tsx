import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useScale} from "@/hooks/useScale";
import Countdown from 'react-native-countdown-component';

export default function CountdownScreen() {
    const styles = useAboutScreenStyles();

    return <View style={styles.container}>
        <Countdown
            until={11 * 24 * 60 * 60 + 12 * 60 * 60 + 56 * 60 + 28}
            // digitStyle={styles.digitStyle}
            // digitTxtStyle={styles.digitTxtStyle}
            // timeLabelStyle={styles.timeLabelStyle}
            // separatorStyle={styles.separatorStyle}
            timeToShow={['D', 'H', 'M', 'S']}
            timeLabels={{d: 'días', h: 'horas', m: 'min', s: 'seg'}}
            // showSeparator
            size={100}
        />
    </View>;
}

const useAboutScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#4a4848',
        },
        digitStyle: {
            backgroundColor: '#333',
            borderWidth: 2,
            borderColor: '#fff',
        },
        digitTxtStyle: {
            color: '#fff',
            fontSize: 20,
        },
        timeLabelStyle: {
            color: '#fff',
            fontSize: 12,
        },
        separatorStyle: {
            color: '#fff',
        },
    });
};
