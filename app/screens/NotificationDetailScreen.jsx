import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationDetailScreen = ({ route, navigation }) => {
  const { notification } = route.params;

  return (
    <ImageBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.notificationDetail}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.date}>{new Date(notification.createdAt).toLocaleString()}</Text>
          <View style={styles.separator} />
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.signature}>Best wishes,</Text>
          <Text style={styles.signature}>The Quizzie Bot Team</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C6DD0',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  notificationDetail: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 50, // to adjust for back button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  signature: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default NotificationDetailScreen;
