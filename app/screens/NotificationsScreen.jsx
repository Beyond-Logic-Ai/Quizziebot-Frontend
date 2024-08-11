import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const NotificationsScreen = ({ route, navigation }) => {
  const { notifications: initialNotifications, token } = route.params;
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={clearAllNotifications} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, notifications]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      console.log('Marking notification as read:', notificationId);
      await axios.post(
        `https://api.quizziebot.com/api/notifications/mark-as-read/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  const clearAllNotifications = async () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              const unreadNotifications = notifications.filter(notification => !notification.read);
              for (let notification of unreadNotifications) {
                await markNotificationAsRead(notification.id);
              }
              setNotifications([]); // Clear the notifications from the list
              navigation.goBack(); // Go back to the previous screen
            } catch (error) {
              console.error('Error clearing notifications:', error.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        markNotificationAsRead(item.id);
        navigation.navigate('NotificationDetailScreen', { notification: item });
      }}
    >
      <View style={styles.notificationItem}>
        <View style={styles.notificationIcon}>
          <Text style={styles.notificationIconText}>T</Text>
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
          <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.noNotificationsText}>No notifications available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C6DD0',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#FF0000', // Red color for emphasis
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFD700', // gold color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  noNotificationsText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    marginTop: 50,
  },
});

export default NotificationsScreen;
