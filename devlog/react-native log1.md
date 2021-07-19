# log 1

requirements : nodejs, npm, expo(on the appstore) , npm install -g expo-cli

#### what is expo

- react native cli : native 파일을 더 많이 컨트롤 하고 싶을 때 (xcode 파일 or 안드로이드 스튜디오 파일 생성)
- expo : 모든 네이티브 파일을 숨기고 관리 / 휴대폰에서 앱을 테스트해볼 수 있다는 장점



### #0.3 Creating the project

- expo init fokin-weather 
- yarn start
- expo login

### #0.5 How does React Native work?

- 리액트 네이티브 : 자바스크립트를 이용해서 ios 또는 안드로이드의 네이티브 엔진에 메세지를 보냄(브릿지)
- 리액트 컴포넌트 : 모든 div -> View / span -> Text

```react
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```



### #1.0 Layouts with flexbox in react native

- 리액트 네이티브에서 모든 flexbox의 default 는 flex direction 이 column (상하 정렬)
- flex : 1 => 사용할 수 있는 모든 공간을 가진다 (yellow/blueView 가 각각 flex:1 이므로 결과적으로 반반을 가지게 됨(상하정렬))

```react
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.yellowView}></View>
      <View style={styles.blueView}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yellowView: {
    flex: 1,
    backgroundColor: "yellow"
  },
  blueView: {
    flex: 1, // flex:2면 blueView가 2/3를 가짐
    backgroundColor: "blue",
  }

});
```



### #1.1 Loading Screen

```react
// Loading.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
    return <View style={styles.container}>
        <Text style={styles.text}>Getting the fucking weather</Text>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 30,  // paddingHorizontal/Vertical : 기존 css에 없음
        paddingVertical: 100,
        backgroundColor: "#FDF6AA"
    },
    text: {
        color: "#2c2c2c",
        fontSize: 30,
    }
})
```

```react
// App.js
import React from 'react';
import Loading from "./Loading";

export default function App() {
  return (
    <Loading></Loading>
  );
}

```

