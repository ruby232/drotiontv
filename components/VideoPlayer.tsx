import {Button, StyleSheet, View, Text} from "react-native";
import {Video, ResizeMode, AVPlaybackStatus} from "expo-av";
import * as React from "react";
import {useScale} from "@/hooks/useScale";

interface VideoPlayerProps {
    uri: string;
    title: string;
    onFinish: (event: string) => void;
    autoPlay?: boolean;
}

export default function VideoPlayer({uri, title, onFinish, autoPlay}: VideoPlayerProps) {
    const styles = useVideoStyles();
    const videoRef  = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
        setStatus(playbackStatus);
        if (playbackStatus.isLoaded && playbackStatus.didJustFinish){
            onFinish('finish');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{
                        uri: uri,
                    }}
                    useNativeControls
                    shouldPlay={autoPlay}
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate= {onPlaybackStatusUpdate} />
                <View style={styles.buttons}>
                    <Button
                        title={status.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                            status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
                        }
                    />
                    <Button
                        title='Fullscreen'
                        onPress={() =>
                            videoRef.current.presentFullscreenPlayer()
                        }
                    />
                    <Button
                        title='Start againt'
                        onPress={() =>
                            videoRef.current.setStatusAsync({ shouldPlay: true, positionMillis: 0 })
                        }
                    />
                </View>
            </View>
            <Text style={styles.title}>{ title }</Text>
        </View>
    );
}

const useVideoStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        videoContainer: {
            width: '100%',
            flex: 1,
        },
        video: {
            flex: 1,
        },
        buttons: {
            gap: 10 * scale,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        title: {
            textAlign: 'center',
            fontSize: 30 * scale,
            fontWeight: 'bold',
            paddingTop: 5 * scale,
            paddingBottom: 5 * scale,
        }

    });
};