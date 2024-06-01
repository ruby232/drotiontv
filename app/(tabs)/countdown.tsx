import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useScale} from "@/hooks/useScale";
import Countdown from 'react-native-countdown-component';

export default function CountdownScreen() {
    const styles = useAboutScreenStyles();

    return <View style={styles.container}>
        <Countdown
            until={11 * 24 * 60 * 60 + 12 * 60 * 60 + 56 * 60 + 28}
            timeToShow={['D', 'H', 'M', 'S']}
            timeLabels={{d: 'días', h: 'horas', m: 'min', s: 'seg'}}
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
        }
    });
};
