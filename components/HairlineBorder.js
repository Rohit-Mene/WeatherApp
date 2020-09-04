import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function HairlineBorder(params) {
  return <View style={styles.hairline} />;
}
const styles = StyleSheet.create({
  hairline: {
    backgroundColor: "#A2A2A2",
    height: 0.4,
    width: "100%",
  },
});
