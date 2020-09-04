import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Feather, Fontisto } from "@expo/vector-icons";

const mainCard = (props) => {
  const Icon = () => {
    if (props.icon === "morning") {
      return (
        <Feather name="sun" style={styles.cardIcon} size={40} color="orange" />
      );
    }
    if (props.icon === "afternoon") {
      return <Fontisto name="day-cloudy" size={40} color="white" />;
    }
    if (props.icon === "night") {
      return (
        <Feather
          name="cloud-rain"
          style={styles.cardIcon}
          size={40}
          color="white"
        />
      );
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: props.backgroundColor,

      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      margin: 10,
      width: 110,
      height: 210,
    },

    refreshButton: {
      position: "absolute",
      margin: 30,
      alignSelf: "flex-start",
      marginTop: 50,
    },
    cardTitle: {
      color: "white",
      margin: 15,
      fontSize: 20,
    },
    cardIcon: {
      color: "white",
      margin: 15,
    },
    text: {
      color: "white",
      margin: 15,
      fontSize: 20,
    },
  });
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Icon></Icon>
      <Text style={styles.text}>{props.temperature}</Text>
    </View>
  );
};

export default mainCard;
