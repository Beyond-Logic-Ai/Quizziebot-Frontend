import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const QuizScreen = ({ route, navigation }) => {
  const { userId, mode } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await axios.get(`https://api.quizziebot.com/api/quizzes/questions?userId=${userId}&mode=${mode}`);
        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [userId, mode]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleAnswer(null);
    }
  }, [timer]);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    const isAnswerCorrect = selectedAnswer === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(10);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 2000); // Show correct/incorrect screen for 2 seconds
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C58F2" />
        <Text>Loading Questions...</Text>
      </View>
    );
  }

  if (showResult) {
    return <ResultScreen navigation={navigation} />;
  }

  if (!questions.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No Questions Available</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer}</Text>
      </View>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answerButton}
            onPress={() => handleAnswer(answer)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isCorrect !== null && (
        <View style={[styles.feedbackContainer, isCorrect ? styles.correct : styles.incorrect]}>
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={24}
            color={isCorrect ? "green" : "red"}
          />
          <Text style={styles.feedbackText}>{isCorrect ? "Correct!" : "Incorrect!"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answersContainer: {
    flex: 1,
  },
  answerButton: {
    padding: 15,
    backgroundColor: '#1C58F2',
    borderRadius: 10,
    marginVertical: 10,
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correct: {
    backgroundColor: '#DFF2BF',
  },
  incorrect: {
    backgroundColor: '#FFBABA',
  },
  feedbackText: {
    fontSize: 18,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
