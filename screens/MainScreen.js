import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Loc } from "react-native";
import { Feather, EvilIcons, Entypo } from "@expo/vector-icons";

import * as Location from "expo-location";

import MainCard from "../components/MainCard";
import InfoCard from "../components/InfoCard";
import getCurrentWeather from "../api/ConsultApi";

export default function MainScreen({ navigation }) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState("27");
  const [location, setLocation] = useState("IN,Mumbai");
  const [currentHour, setCurrentHour] = useState("13:00");

  const [wind, setWind] = useState("65");
  const [humidity, setHumidity] = useState("80");
  const [tempMin, setTempMin] = useState("0");
  const [tempMax, setTempMax] = useState("20");
  const [locationCoords, setLocationCoords] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? "#232634" : "#f2f2f2",
      alignItems: "center",
    },
    temperature: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? "#e0e0e0" : "#000",
      fontSize: 50,
    },
    refreshButton: {
      position: "absolute",
      margin: 30,
      alignSelf: "flex-start",
      marginTop: 50,
    },
    cardView: {
      color: darkTheme ? "black" : "white",
      margin: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    info: {
      alignItems: "center",
      backgroundColor: darkTheme ? "#393e54" : "#8f8f8f",
      borderRadius: 20,
      width: 350,
      height: 230,
    },
    infoText: {
      color: darkTheme ? "#e0e0e0" : "white",
      margin: 15,
      fontSize: 20,
      fontWeight: "bold",
    },
    infoCard: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,

      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    squareButton: {
      backgroundColor: darkTheme ? "#f2f2f2" : "#8f8f8f",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
    circleButton: {
      backgroundColor: darkTheme ? "#232634" : "#f2f2f2",
      alignSelf: darkTheme ? "flex-end" : "flex-start",
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    tripledotIcon: { alignSelf: "flex-end", marginTop: 50, margin: 30 },
  });

  async function setCurrentWeather() {
    let date = new Date();
    setCurrentHour(date.getHours() + ":" + date.getMinutes());
    await getLocation();
    const data = await getCurrentWeather(locationCoords);
    //current,min,max,location,wind,humidity
    setCurrentTemperature(convertKelvintoCenti(data[0]));
    setTempMin(convertKelvintoCenti(data[1]));
    setTempMax(convertKelvintoCenti(data[2]));
    setLocation(data[3]);
    setWind(data[4]);
    setHumidity(data[5]);
  }

  function convertKelvintoCenti(kelvin) {
    return parseInt(kelvin - 273);
  }

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Need Permission");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      await setLocationCoords(location.coords);
    }
  }

  useEffect(() => {
    setCurrentWeather();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setCurrentWeather()}
        style={styles.refreshButton}
      >
        <EvilIcons
          name="refresh"
          size={30}
          color={darkTheme ? "white" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tripledotIcon}
        onPress={() => navigation.navigate("Settings")}
      >
        <Entypo
          name="dots-three-vertical"
          size={24}
          color={darkTheme ? "white" : "black"}
        />
      </TouchableOpacity>
      <Feather name="sun" style={{ marginTop: 65 }} size={40} color="orange" />
      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, { fontSize: 15 }]}>°C</Text>
      </View>

      <Text style={[styles.temperatureText, { fontSize: 20 }]}>
        {location}, {currentHour}
      </Text>
      <View style={styles.cardView}>
        <MainCard
          title="Morning"
          backgroundColor={darkTheme ? "#ff073d" : "#cc6e30"}
          temperature={"24°"}
          icon={"morning"}
        ></MainCard>
        <MainCard
          title="Noon"
          backgroundColor={darkTheme ? "#D29600" : "#FCC63F"}
          temperature={"31°"}
          icon={"afternoon"}
        ></MainCard>
        <MainCard
          title="Evening"
          backgroundColor={darkTheme ? "#008081" : "#38B788"}
          temperature={"21°"}
          icon={"night"}
        ></MainCard>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}> Additonal Info</Text>
        <View style={styles.infoCard}>
          <InfoCard title={"Wind"} value={wind + " m/h"}></InfoCard>
          <InfoCard title={"Humidity"} value={humidity + "%"}></InfoCard>
          <InfoCard title={"Temp. Min"} value={tempMin + "°"}></InfoCard>
          <InfoCard title={"Temp. Max"} value={tempMax + "°"}></InfoCard>
        </View>
      </View>

      <View style={styles.themeButton}>
        <View style={styles.squareButton}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() =>
              darkTheme ? setDarkTheme(false) : setDarkTheme(true)
            }
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
