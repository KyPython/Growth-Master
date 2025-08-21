import React, { useState, useEffect } from "react";
import { StyleSheet, Switch, TouchableOpacity, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ParallaxScrollView } from "../../components/ParallaxScrollView";
import { ThemedView, ThemedText } from "../../components/Themed";
import {
  getNotificationSettings,
  scheduleDailyReminder,
} from "../../services/notificationService";
import { useTheme } from "../../constants/ThemeContext";
import Colors from "../../constants/Colors";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getNotificationSettings();
      setNotificationsEnabled(settings?.granted || false);

      const savedTimeJson = await AsyncStorage.getItem("notifTime");
      if (savedTimeJson) {
        const { hours, minutes } = JSON.parse(savedTimeJson);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        setReminderTime(date);
      }
      // Theme is loaded by context, no need to setTheme here
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    if (value) {
      const hours = reminderTime.getHours();
      const minutes = reminderTime.getMinutes();
      await scheduleDailyReminder(hours, minutes);
    } else {
      if (Platform.OS !== "web" && typeof window !== "undefined") {
        try {
          const Notifications = require("expo-notifications");
          await Notifications.cancelAllScheduledNotificationsAsync();
        } catch (error) {
          console.warn("Error canceling notifications:", error);
        }
      }
    }
  };

  const handleTimeChange = async (
    _event: unknown,
    selectedDate?: Date | undefined
  ) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setReminderTime(selectedDate);
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      await AsyncStorage.setItem(
        "notifTime",
        JSON.stringify({ hours, minutes })
      );
      if (notificationsEnabled) {
        await scheduleDailyReminder(hours, minutes);
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Theme-aware colors
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const sectionBg = theme === "dark" ? Colors.dark.card : Colors.light.card;
  const borderColor = theme === "dark" ? "#333" : "#eee";
  const buttonBg = theme === "dark" ? "#222" : "#f0f0f0";
  const buttonSelectedBg = "#4263eb";
  const textColor = theme === "dark" ? "#fff" : "#222";
  const textSelectedColor = "#fff";

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <ParallaxScrollView>
        <ThemedView
          style={[styles.container, { flexGrow: 1, minHeight: "100%" }]}
        >
          <ThemedText type="title" style={{ color: textColor }}>
            Settings
          </ThemedText>

          <ThemedView style={[styles.section, { backgroundColor: sectionBg }]}>
            <ThemedText type="subtitle" style={{ color: textColor }}>
              Appearance
            </ThemedText>
            <ThemedView
              style={[styles.settingRow, { borderBottomColor: borderColor }]}
            >
              <ThemedText style={{ color: textColor }}>Theme</ThemedText>
              <ThemedView style={styles.themeSwitchContainer}>
                <TouchableOpacity
                  style={[
                    styles.themeButton,
                    {
                      backgroundColor:
                        theme === "light" ? buttonSelectedBg : buttonBg,
                    },
                  ]}
                  onPress={() => setTheme("light")}
                >
                  <ThemedText
                    style={{
                      color: theme === "light" ? textSelectedColor : textColor,
                      fontWeight: theme === "light" ? "700" : "500",
                    }}
                  >
                    Light
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeButton,
                    {
                      backgroundColor:
                        theme === "dark" ? buttonSelectedBg : buttonBg,
                    },
                  ]}
                  onPress={() => setTheme("dark")}
                >
                  <ThemedText
                    style={{
                      color: theme === "dark" ? textSelectedColor : textColor,
                      fontWeight: theme === "dark" ? "700" : "500",
                    }}
                  >
                    Dark
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={[styles.section, { backgroundColor: sectionBg }]}>
            <ThemedText type="subtitle" style={{ color: textColor }}>
              Notifications
            </ThemedText>
            <ThemedView
              style={[styles.settingRow, { borderBottomColor: borderColor }]}
            >
              <ThemedText style={{ color: textColor }}>
                Daily Reminder
              </ThemedText>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: "#767577", true: "#4263eb" }}
                thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
              />
            </ThemedView>
            {notificationsEnabled && (
              <ThemedView
                style={[styles.settingRow, { borderBottomColor: borderColor }]}
              >
                <ThemedText style={{ color: textColor }}>
                  Reminder Time
                </ThemedText>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={[styles.timeButton, { backgroundColor: buttonBg }]}
                >
                  <ThemedText style={[styles.timeText, { color: textColor }]}>
                    {formatTime(reminderTime)}
                  </ThemedText>
                </TouchableOpacity>
                {(showTimePicker || Platform.OS === "ios") && (
                  <DateTimePicker
                    value={reminderTime}
                    mode="time"
                    is24Hour={false}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleTimeChange}
                  />
                )}
              </ThemedView>
            )}
          </ThemedView>

          <ThemedView style={[styles.section, { backgroundColor: sectionBg }]}>
            <ThemedText type="subtitle" style={{ color: textColor }}>
              About
            </ThemedText>
            <ThemedView
              style={[styles.aboutRow, { borderBottomColor: borderColor }]}
            >
              <ThemedText style={{ color: textColor }}>Version</ThemedText>
              <ThemedText style={{ color: textColor }}>1.0.0</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, // No padding, fills the screen
    minHeight: "100%",
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
    opacity: 0.7,
  },
  section: {
    marginTop: 0,
    borderRadius: 0,
    overflow: "hidden",
    // Remove flex: 1 so sections don't stretch
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  timeButton: {
    padding: 8,
    borderRadius: 6,
    minWidth: 80,
    maxWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 16,
    flexShrink: 1,
    flexWrap: "nowrap",
    overflow: "hidden",
    textAlign: "center",
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  themeSwitchContainer: {
    flexDirection: "row",
    gap: 8,
  },
  themeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
