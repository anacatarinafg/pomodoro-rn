import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// Define the options for the tabs
const optionsTab = ["Pomodoro", "Short break", "Long break"];

// Functional component for the tab
const Tab = ({ setTime, currentTab, setCurrentTab }) => {
  // Function to handle tab button press
  function handleButton(index) {
    // Calculate the new time based on the selected tab
    const newTab = index === 0 ? 25 : index === 1 ? 5 : 15;
    
    // Set the current tab and update the time
    setCurrentTab(index);
    setTime(newTab * 60);
  }

  return (
    <View style={styles.tab__box}>
      {/* Map through the optionsTab array and create a TouchableOpacity for each */}
      {optionsTab.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab__item,
            currentTab !== index && { borderColor: "transparent" },
          ]}
          onPress={() => handleButton(index)}
        >
          <Text style={styles.tabs__text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tab__box: {
    flexDirection: "row",
  },
  tab__item: {
    width: "33%",
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderColor: "#fff",
    borderRadius: 5,
    marginVertical: 20,
  },
  tabs__text: {
    fontWeight: "bold",
  },
});

export default Tab;