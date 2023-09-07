import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Tab from "./src/components/Tab";
import Timer from "./src/components/Timer";

const bgColors = ["#d9ff00", "#ffa1e6", "#3f2eff"];

export default function App() {
  // State variables
  const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running
  const [time, setTime] = useState(25 * 60); // Initial time set to 25 minutes
  const [currentTab, setCurrentTab] = useState("Pomodoro" | "Short" | "Long"); // Tracks the current tab
  const [isActive, setIsActive] = useState(false); // Tracks if the timer is active (running)

  useEffect(() => {
    let interval = null;

    if (isActive) {
      // If the timer is active, run this interval
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      // If the timer is not active, clear the interval
      clearInterval(interval);
    }

    if (time === 0) {
      // When time reaches 0
      setIsActive(false); // Deactivate the timer
      setIsRunning((prev) => !prev); // Toggle the isRunning state
      setTime(isRunning ? 300 : 1500); // Reset the time to 5 minutes if it was running, otherwise set it to 25 minutes
    }

    return () => clearInterval(interval); // Cleanup by clearing the interval
  }, [isActive, time]);

  function handleActivateButton() {
    playClick(); // Play a click sound
    setIsActive(!isActive); // Toggle the isActive state
  }

  async function playClick() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    );
    await sound.playAsync(); // Play the click sound
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColors[currentTab] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Tab
          setTime={setTime}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleActivateButton}>
          <Text style={styles.buttonText}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 60,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#141414",
    padding: 15,
    marginTop: 5,
    alignItems: "center",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
