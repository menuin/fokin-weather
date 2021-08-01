import React from 'react';
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from 'react-native';
import axios from 'axios';

const API_KEY = "3e04b18f88579f170d13a7a0c2381705";

export default class extends React.Component {
    state = {
        isLoading: true
    }
    getWeather = async (latitude, longitude) => {
        const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
        );
        console.log(data);
    }
    getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
            this.setState({ isLoading: false })
            // send to API and get weather
            this.getWeather(latitude, longitude);
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

