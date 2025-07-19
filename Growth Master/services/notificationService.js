import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notifications only if not on web
if (Platform.OS !== 'web') {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.warn('Error setting up notification handler:', error);
  }
}

// Request permissions
export async function getNotificationSettings() {
  // Skip on web platform
  if (Platform.OS === 'web') {
    return { granted: false, status: 'unavailable' };
  }
  
  if (Device.isDevice) {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      return {
        granted: finalStatus === 'granted',
        status: finalStatus
      };
    } catch (error) {
      console.warn('Error checking notification permissions:', error);
      return { granted: false, status: 'error' };
    }
  }
  
  return { granted: false, status: 'unavailable' };
}

// Schedule a daily reminder
export async function scheduleDailyReminder(hours, minutes) {
  // Skip on web platform
  if (Platform.OS === 'web') {
    return false;
  }
  
  try {
    // Cancel any existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    // Only proceed if we're on a physical device
    if (!Device.isDevice) return false;
    
    // Get permission if not already granted
    const settings = await getNotificationSettings();
    if (!settings.granted) return false;
    
    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Reflection",
        body: "How are you feeling today? Take a moment to reflect on your growth.",
        sound: true,
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });
    
    return true;
  } catch (error) {
    console.warn('Error scheduling notification:', error);
    return false;
  }
}

// Cancel all notifications
export async function cancelAllNotifications() {
  // Skip on web platform
  if (Platform.OS === 'web') {
    return false;
  }
  
  try {
    return await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.warn('Error canceling notifications:', error);
    return false;
  }
}
