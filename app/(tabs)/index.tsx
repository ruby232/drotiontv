import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import VideoPlayer from "@/components/VideoPlayer";
import {useScale} from "@/hooks/useScale";


export default function HomeScreen() {
    const styles = useHomeScreenStyles();
    const [data, setData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        fetch('https://drotion.onebyt.com/api/v1/session-today')
            .then(response => response.json())
            .then((sessions) => {
                    console.log(sessions[0]);
                    setData(sessions[0]);
                    setDataLoaded(true);
                }
            )
            .catch(error => console.error(error));
    }, []);

    return <View style={styles.container}>
        {dataLoaded ? (
            <VideoPlayer uri={data.url}
                         title={data.title}/>
        ) : (<Text>Cargando datos</Text>)}
    </View>;
}

const useHomeScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            paddingTop: 20 * scale,
        }
    });
};
