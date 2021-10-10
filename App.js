import * as Location from 'expo-location';
import { StatusBar } from "expo-status-bar"
;import React, { useEffect, useState } from "react";
import { View , StyleSheet, Text, ScrollView, Dimensions } from "react-native";

const { width:SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "d4aa61fc1cf40274db0323b48b85b194";

export default function App(){
    const [city, setCity] = useState("Loading...");
    const [days, setDays] = useState([]);
    const [ok, Setok] = useState(true);
    const getWeaher = async() => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if(!granted){
            Setok(false);
        }
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
        const location = await Location.reverseGeocodeAsync(
            {latitude, longitude}, 
            {useGoogleMaps: false}
        );
        setCity(location[0].city);
        const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}');
        const json = await response.json();
        console.log(json);
    };
    useEffect(() => {
        getWeaher();
    }, [])
    return (
        <View style={styles.container} >
            <StatusBar style="black" />
            <View style={styles.city}>
                <Text style={styles.cityname}>{city}</Text>
            </View>
            <ScrollView 
                pagingEnabled 
                horizontal
                showsHorizontalScrollIndicator={false} 
                contentContainerstyle={styles.weather}
            >
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>sunny</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "white"
    },
    city: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cityname: {
        fontSize: 68,
        fontWeight: "500",
    },
    weather: {
        backgroundColor:"blue",
    },
    day:{
        width: SCREEN_WIDTH,
        alignItems: "center",
    },
    temp: {
        marginTop: 50,
        fontSize: 178,
    },
    description: {
        marginTop: -30,
        fontSize: 60,
    }
});