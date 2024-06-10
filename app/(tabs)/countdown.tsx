import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useScale} from "@/hooks/useScale";
import Countdown from 'react-native-countdown-component';

export default function CountdownScreen() {
    const styles = useAboutScreenStyles();

    // Cantidad de segundos desde la fecha actual al 12 de junio del 2024 a las 22:00:00
    const now = new Date();
    const futureDate = new Date(2024, 5, 12, 22, 0, 0);
    let diffInMilliseconds = futureDate.getTime() - now.getTime();
    let diffInSeconds = diffInMilliseconds / 1000;

    return <View style={styles.container}>
        <Countdown
            until={diffInSeconds}
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
