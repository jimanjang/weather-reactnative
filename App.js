import { StatusBar } from "expo-status-bar"
;import React from "react";
import { View , StyleSheet, Text, ScrollView, Dimensions } from "react-native";

const { width:SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App(){
    return (
        <View style={styles.container} >
            <StatusBar style="black" />
            <View style={styles.city}>
                <Text style={styles.cityname}>Seoul</Text>
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