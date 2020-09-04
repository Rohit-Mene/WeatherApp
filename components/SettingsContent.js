import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import HairlineBorder from "./HairlineBorder";

export default function SettingsContent({ heading, subHeading }) {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 12, marginTop: 12 }}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>

      <HairlineBorder />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 3,

    marginBottom: 3,
  },
  heading: {
    fontSize: 20,
    color: "white",
    marginLeft: 15,
  },
  subHeading: {
    fontSize: 12,
    color: "grey",
    marginLeft: 15,
  },
});
