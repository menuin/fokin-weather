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



### #1.2 Getting the location

- navigator.geolocation 보다 expo 방식으로 가져오는게 더 많은 기능

- using location in expo (참고 : https://docs.expo.dev/versions/latest/sdk/location/)
- expo install expo-location

```js
// App.js
import * as Location from "expo-location";

export default class extends React.Component {
    getLocation = async() => {
        const locatin = await Location.getCurrentPositionAsync(options);
        console.log(location);

    }
    componentDidMount() {
        this.getLocation();
    }
    render() {
        return <Loading />
    }
}
```

에러 : Possible unhandled promise rejection : permission is required to do this operation

사용자에게 permission을 요청해야함 

### #1.3 Asking for permissions

- `Location.requestPermissionsAsync` : permission이 승인되었을 때 resolve된 promise를 리턴 >> deprecated. `requestForegroundPermissionsAsync` 사용

- alert 창은 안드로이드에서 다르게 보임 << "native" 하다는 것
- 받아온 location  데이터에서 latitude, longitude만 빼오기

```js
export default class extends React.Component {
    state = {
        isLoading: true
    }
    getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
            this.setState({ isLoading: false })
            // send to API and get weather
        }
        catch (error) {
            Alert.alert("Can't find you.", "So sad")
        }


    }
    componentDidMount() {
        this.getLocation();
    }
    render() {
        const { isLoading } = this.state;
        return isLoading ? <Loading /> : null;
    }
}
```



### #1.4 Getting the weather

- weather api (https://openweathermap.org) 에서 api key 복사
- 📌📌 api에 대한 설명 참고 (https://dev-dain.tistory.com/50)
- getting weather by geographic coordinates(documentation 참고)
- api로 얻은 데이터(url)를 fetch >> axios로

```js
getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
}
```

