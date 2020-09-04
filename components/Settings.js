import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import HairlineBorder from "./HairlineBorder";
import SettingsContent from "./SettingsContent";

export default function Settings(params) {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <SettingsContent heading="Temperature" subHeading="Celcius - °C" />
      <SettingsContent heading="Wind" subHeading="Kilometers per hour - km/h" />
      <SettingsContent heading="Precipitation" subHeading="Millimeters" />
      <SettingsContent heading="Visibility" subHeading="Kilometers - km" />
      <SettingsContent heading="Pressure" subHeading="Hectopascals - hPa" />
    </View>
  );
}
