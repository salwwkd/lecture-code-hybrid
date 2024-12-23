import { useApis } from "@/apis/section07/07-01-picture-full-screen";
import { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

// const 내컴퓨터접속주소 = "http://172.12.0.106:3000" // 내핸드폰에서 접속하기
const 내컴퓨터접속주소 = "http://10.0.2.2:3000" // 안드로이드에뮬레이터에서 접속하기
// const 내컴퓨터접속주소 = "http://127.0.0.1:3000" // IOS시뮬레이터에서 접속하기

export default function PictureFullScreenPage() {
    const webviewRef = useRef<WebView>(null)
    const { onRequest, layout } = useApis(webviewRef)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white" }} // 안드로이드 + IOS 노치 배경색
            edges={layout.isNotchTranslucent ? [] : undefined} // 안드로이드 + IOS 노치 겹치기
        >
            <StatusBar 
                style="dark" // 안드로이드 + IOS 노치 글자색
            />

            <WebView 
                ref={webviewRef}
                source={{ uri: `${내컴퓨터접속주소}/section07/07-01-picture-full-screen` }} 
                onMessage={(event) => {
                    if(!event.nativeEvent.data) return

                    const request = JSON.parse(event.nativeEvent.data)
                    onRequest(request.query, request.variables)
                }}
            />
        </SafeAreaView>
    )
}