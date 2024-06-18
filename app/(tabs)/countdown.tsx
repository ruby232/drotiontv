import * as React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useScale} from "@/hooks/useScale";
//import Countdown from 'react-native-countdown-component';

export default function CountdownScreen() {
    const styles = useAboutScreenStyles();

    // Cantidad de segundos desde la fecha actual al 12 de junio del 2024 a las 22:00:00
    const now = new Date();
    const futureDate = new Date(2024, 5, 12, 22, 0, 0);
    let diffInMilliseconds = futureDate.getTime() - now.getTime();
    let diffInSeconds = diffInMilliseconds / 1000;
    const image = {uri: 'https://images3.alphacoders.com/131/1319747.jpeg'};


    return <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>
                El Reino Científico estuvo aquí y te dejo una pista en el organismo vivo que tienes en la casa, que no
                es un animal.
            </Text>
            <Text style={styles.text}>
                Sé un buen cienticero, al 10 000%.
            </Text>
        </ImageBackground>
        {/*<Countdown*/}
        {/*    until={diffInSeconds}*/}
        {/*    timeToShow={['D', 'H', 'M', 'S']}*/}
        {/*    timeLabels={{d: 'días', h: 'horas', m: 'min', s: 'seg'}}*/}
        {/*    size={100}*/}
        {/*/>*/}
    </View>;
}

const useAboutScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        text: {
            paddingStart: 20,
            paddingEnd: 20,
            color: 'white',
            fontSize: 32,
            lineHeight: 48,
            textAlign: 'center',
            backgroundColor: '#000000c0',
        },
    });
};
