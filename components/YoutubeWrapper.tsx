import { StyleSheet, View, Text} from "react-native";
import * as React from "react";
import {useScale} from "@/hooks/useScale";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import YoutubePlayer from "react-native-youtube-iframe";
import { useState, useCallback, useRef } from "react";


function extractVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    return match ? match[1] : null;
}

interface YoutubePlayerProps {
    url: string;
    title: string;
    onFinish: (event: string) => void;
    onReload: (event: string) => void;
    autoPlay?: boolean;
}

export default function YoutubeWrapper({url, title, onFinish, autoPlay, onReload}: YoutubePlayerProps) {
    const styles = useVideoStyles();
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            onFinish('finish');
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const videoId = extractVideoId(url);


    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    style={styles.video}
                    height={480}
                    width={780}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                />
                <View style={styles.buttons}>
                    <FontAwesome6.Button
                        backgroundColor='transparent'
                        name={playing ? 'pause' : 'play'}
                        size={24}
                        onPress={togglePlaying}/>
                    <FontAwesome6.Button
                        backgroundColor='transparent'
                        size={24}
                        name="rotate-right"
                        onPress={() => onReload('reload')}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
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
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flex: 1,
        },
        video: {
            flex: 1,
        },
        buttons: {
            alignItems: 'center',
            gap: 10 * scale,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'rgba(12,64,219,0.5)',
            position: 'absolute',
            bottom: 0,
        },
        title: {
            textAlign: 'center',
            fontSize: 20 * scale,
            fontWeight: 'bold',
            color: 'white',
        }

    });
};