import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import VideoPlayer from "@/components/VideoPlayer";
import {useScale} from "@/hooks/useScale";
import YoutubeWrapper from "@/components/YoutubeWrapper";

export default function YogaScreen() {
    const styles = useHomeScreenStyles();
    const [session, setSession] = useState(null);
    const [sessionPos, setSessionPos] = useState(0);
    const [sessions, setSessions] = useState(null);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSessions(null);
        setSession(null);
        setSessionPos(0);
        setAutoplay(false);

        fetch('https://drotion.onebyt.com/api/v1/yoga-session-day')
            .then(response => response.json())
            .then((data) => {
                    if (data.length === 0) {
                        return;
                    }
                    const sessions = data[0].field_remote_videos;
                    setSessions(sessions);
                    if (sessions.length > 0) {
                        setSession(sessions[0]);
                    }
                }
            )
            .catch(error => console.error(error));
    }
    const onVideoFinish = (event: string) => {
        if (sessions && sessions.length > sessionPos + 1) {
            const nextSession = sessions[sessionPos + 1];
            setSession(nextSession);
            setAutoplay(true);
        }
    };

    const onReload = (event: string) => {
        loadData();
    }


    return <View style={styles.container}>
        {session ? (
            <YoutubeWrapper url={session.uri}
                            title={session.title}
                            onFinish={onVideoFinish}
                            autoPlay={autoplay}
                            onReload={onReload}
            />
        ) : (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )}
    </View>;
}

const useHomeScreenStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(213,26,26,0.5)',
        },
        horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
        }
    });
};
