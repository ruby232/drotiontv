import {Image, Platform} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useScale} from '@/hooks/useScale';
import {Video, ResizeMode} from 'expo-av';
import * as React from 'react';
import {View, StyleSheet, Button, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const styles = useHomeScreenStyles();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://drotion.onebyt.com/sites/default/files/2024-05/MAX30%20-%20Tabata%20Strength.mp4',
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.STRETCH}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}/>
            </View>
            <View style={styles.buttons}>
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
                <Button
                    title='Fullscreen'
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
            </View>
        </View>
    );
}

const useHomeScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8 * scale,
        },
        stepContainer: {
            gap: 8 * scale,
            marginBottom: 8 * scale,
        },
        reactLogo: {
            height: 178 * scale,
            width: 290 * scale,
            bottom: 0,
            left: 0,
            position: 'absolute',
        },
        container: {
            paddingTop: 30,
            paddingLeft: 20,
            flex: 1,
        },
        videoContainer: {
            flex: 1,
        },
        video: {
            width: '100%',
            aspectRatio: width/height,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
        },


    });
};
