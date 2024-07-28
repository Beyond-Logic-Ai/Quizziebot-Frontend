import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizResultScreen = ({ route, navigation }) => {
  const { userId, quizId, answers } = route.params;
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const submitQuizAndFetchResults = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const { token } = JSON.parse(userSession);

          // Ensure answers are not null
          if (!answers || answers.length === 0) {
            throw new Error('No answers provided');
          }

          console.log('Submitting quiz with data:', {
            userId,
            quizId,
            answers,
            initialQuiz: false,
          });

          // Submit quiz answers and get results
          const response = await axios.post(
            'https://api.quizziebot.com/api/quizzes/submit',
            {
              userId,
              quizId,
              answers,
              initialQuiz: false,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          console.log('Quiz submission response:', response.data);

          setResult(response.data);
        } else {
          navigation.navigate('SignInFirst');
        }
      } catch (error) {
        console.error('Failed to submit quiz and fetch results:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    submitQuizAndFetchResults();
  }, [userId, quizId, answers, navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C58F2" />
        <Text>Loading Results...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: {typeof error === 'object' ? JSON.stringify(error) : error}</Text>
      </View>
    );
  }

  if (!result) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No Results Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <Text style={styles.resultText}>Your Achievements</Text>
      <View style={styles.achievementContainer}>
        <Text style={styles.achievementText}>IQ Score: {result.iqScore}</Text>
        <Text style={styles.achievementText}>Coins Earned: {result.coins}</Text>
        <Text style={styles.achievementText}>XP Gained: {result.xpGained}</Text>
        <Text style={styles.achievementText}>Correct Answers: {result.correctAnswers}</Text>
        <Text style={styles.achievementText}>Wrong Answers: {result.wrongAnswers}</Text>
        <Text style={styles.achievementText}>Total Questions: {result.totalQuestions}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePageScreen')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {/* handle share */}}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  achievementContainer: {
    marginBottom: 20,
  },
  achievementText: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#1C58F2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default QuizResultScreen;
