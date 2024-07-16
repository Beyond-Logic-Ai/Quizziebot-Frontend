
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const AfterSignedScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.progressBar}>
            <View style={styles.progress} />
          </View>
          <Text style={styles.title}>
            What type of account do you like to <Text style={styles.createText}>create</Text> ? 👦
          </Text>
          <Text style={styles.subtitle}>You can skip it if you're not sure.</Text>

          <TouchableOpacity style={styles.optionButton}>
            <View style={[styles.iconContainer, styles.personalIcon]}>
              <Ionicons name="person-circle-outline" size={24} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionText}>Personal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <View style={[styles.iconContainer, styles.teacherIcon]}>
              <Ionicons name="people-circle-outline" size={24} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionText}>Teacher</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <View style={[styles.iconContainer, styles.studentIcon]}>
              <Ionicons name="school-outline" size={24} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionText}>Student</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <View style={[styles.iconContainer, styles.professionalIcon]}>
              <Ionicons name="briefcase-outline" size={24} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionText}>Professional</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#3b82f6',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginVertical: 40,
    overflow: 'hidden',
  },
  progress: {
    width: '60%',
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  createText: {
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 60,
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  personalIcon: {
    backgroundColor: '#3b82f6',
  },
  teacherIcon: {
    backgroundColor: '#f59e0b',
  },
  studentIcon: {
    backgroundColor: '#10b981',
  },
  professionalIcon: {
    backgroundColor: '#ef4444',
  },
  skipButton: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default AfterSignedScreen;

