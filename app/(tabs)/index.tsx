import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import VideoPlayer from "@/components/VideoPlayer";
import {useScale} from "@/hooks/useScale";

export default function HomeScreen() {
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

        fetch('https://drotion.onebyt.com/api/v1/session-today')
            .then(response => response.json())
            .then((sessions) => {
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
            <VideoPlayer uri={session.url}
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
            paddingTop: 20 * scale,
            justifyContent: 'center',
        },
        horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
        }
    });
};
