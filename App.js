import * as Location from 'expo-location';
import { StatusBar } from "expo-status-bar"
;import React, { useEffect, useState } from "react";
import { 
    ActivityIndicator, 
    View , 
    StyleSheet, 
    Text, 
    ScrollView, 
    Dimensions 
} from "react-native";
import { Fontisto } from '@expo/vector-icons'; 
const { width:SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "d4aa61fc1cf40274db0323b48b85b194";

const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Atomsphere: "cloudy-gustst",
    Snow: "snow",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
};

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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`);
        const json = await response.json();
        setDays(json.daily);
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
                {days.length === 0 ? (
                <View style={styles.day}>
                    <ActivityIndicator 
                    color="black" 
                    style={{ marginTop:10 }} 
                    size="large">
                    </ActivityIndicator>
                </View>
                 ) : ( 
                   days.map((day, index) => 
                    <View key={index} style={styles.day}>
                        <View style={{
                            flexDirection:"row" , 
                            alignItems: "center" ,
                            justifyContent:"space-between" ,
                            width: "100%"
                            }}
                            >
                            <Text style={styles.temp}>
                                {parseFloat(day.temp.day).toFixed(1)}
                            </Text>
                            <Fontisto name={icons[day.weather[0].main]} size={68} color="black" />
                        </View>
                        <Text style={styles.description}>{day.weather[0].main}</Text>
                        <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                    </View>
                   )
                )}
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
        alignItems: "flex-start",
    },
    temp: {
        marginTop: 50,
        fontSize: 138,
    },
    description: {
        marginTop: -30,
        fontSize: 60,
    },
    tinyText: {
        fontSize: 20,
    }
});