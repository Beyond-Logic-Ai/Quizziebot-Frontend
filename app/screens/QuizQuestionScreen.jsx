import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { images } from '../../constants/images';

const QuizQuestionScreen = ({ route, navigation }) => {
  const { questions, quizId, userId } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleAnswer(null);
    }
  }, [timer]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedAnswer === currentQuestion.correctOption;
    setIsCorrect(isAnswerCorrect);

    const answerData = {
      questionId: currentQuestion.id,
      selectedOption: selectedAnswer,
      timeTaken: 10 - timer,
      answered: selectedAnswer !== null,
    };
    setAnswers((prevAnswers) => [...prevAnswers, answerData]);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(10);
        setIsCorrect(null);
      } else {
        navigation.navigate('QuizResultScreen', { userId, quizId, answers });
      }
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionCounter}>{`${currentQuestionIndex + 1}/${questions.length}`}</Text>
        <CircularProgress
          value={timer}
          radius={25}
          duration={10000}
          textColor="#000"
          maxValue={10}
          initialValue={10}
          showProgressValue={true}
        />
        <Ionicons name="close" size={24} color="#000" onPress={() => navigation.navigate('HomePageScreen')} />
      </View>
      <Image source={images.logo2} style={styles.robotImage} />
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      <View style={styles.answersContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              isCorrect !== null && (option === currentQuestion.correctOption ? styles.correct : styles.incorrect),
            ]}
            onPress={() => handleAnswer(option)}
            disabled={isCorrect !== null}
          >
            <Text style={styles.answerText}>{option}</Text>
            {isCorrect !== null && option === currentQuestion.correctOption && (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            )}
            {isCorrect !== null && option !== currentQuestion.correctOption && (
              <Ionicons name="close-circle" size={24} color="red" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {isCorrect !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={isCorrect ? styles.correctFeedback : styles.incorrectFeedback}>
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionCounter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  robotImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  answersContainer: {
    flex: 1,
  },
  answerButton: {
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 18,
  },
  correct: {
    backgroundColor: '#DFF2BF',
  },
  incorrect: {
    backgroundColor: '#FFBABA',
  },
  feedbackContainer: {
    padding: 15,
    alignItems: 'center',
  },
  correctFeedback: {
    fontSize: 18,
    color: 'green',
  },
  incorrectFeedback: {
    fontSize: 18,
    color: 'red',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizQuestionScreen;
