import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Timer functional component
const Timer = ({ time }) => {
  // Format the time as "MM:SS"
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <View style={styles.timer}>
      <Text style={styles.timer__text}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    flex: 0.9,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  timer__text: {
    fontSize: 80,
    textAlign: "center",
    fontWeight: "700",
    color: "#141414",
  },
});

export default Timer;
