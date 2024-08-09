import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const OwnQuizQuestionScreen = ({ route, navigation }) => {
  const { questions, quizId, userId } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answers, setAnswers] = useState([]);
  const timerInterval = useRef(null);

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [currentQuestionIndex]);

  const startTimer = () => {
    setTimer(10);
    timerInterval.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerInterval.current);
          handleAnswer(null); // Handle when time runs out
          return 10;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleAnswer = (selectedAnswer) => {
    clearInterval(timerInterval.current); // Stop the timer when the user answers
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedAnswer === currentQuestion.correctOption;
    setIsCorrect(isAnswerCorrect);

    const answerData = {
      questionId: currentQuestion.questionId,
      selectedOption: selectedAnswer,
      timeTaken: 10 - timer, // Time taken before the answer
      answered: selectedAnswer !== null,
    };

    // Update the answers array and then check if it's the last question
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers, answerData];
      if (currentQuestionIndex + 1 === questions.length) {
        submitResults(updatedAnswers);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsCorrect(null);
        }, 500); // Short delay before moving to the next question
      }
      return updatedAnswers;
    });
  };

  const submitResults = (finalAnswers) => {
    console.log("All questions answered, submitting results:", finalAnswers);
    // API call logic here

    // Navigate to results screen after API call is made
    navigation.navigate('QuizResultScreen', { userId, quizId, answers: finalAnswers });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionCounter}>{`${currentQuestionIndex + 1}/${questions.length}`}</Text>
        <View style={styles.circularProgressContainer}>
          <CircularProgress
            value={timer}
            radius={25}
            duration={1000}
            textColor="#000"
            maxValue={10}
            initialValue={10}
            showProgressValue={true}
            activeStrokeColor="#0060FF"
            inActiveStrokeColor="#E5E5E5"
            inActiveStrokeOpacity={0.2}
          />
        </View>
        <Ionicons name="close" size={24} color="#000" onPress={() => navigation.navigate('HomePageScreen')} />
      </View>
      <View style={styles.robotImageContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" style={styles.gradient}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#6F98DB" stopOpacity="1" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
        <Image source={images.logo2} style={styles.robotImage} />
      </View>
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
    </SafeAreaView>
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
    marginBottom: 35,
  },
  questionCounter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionText: {
    fontFamily: 'Nunito',
    fontSize: wp(5),
    fontWeight: 'bold',
    marginTop: hp(1.5),
    marginBottom: hp(4),
    textAlign: 'center',
  },
  robotImageContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  robotImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  answersContainer: {
    width: wp(80),
    alignSelf: 'center',
  },
  answerButton: {
    padding: 15,
    borderRadius: wp(7),
    marginVertical: 10,
    backgroundColor: '#448AF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: "#FFFFFF",
    fontFamily: 'Nunito',
  },
  correct: {
    backgroundColor: '#12D18E',
  },
  incorrect: {
    backgroundColor: '#F75555',
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
  circularProgressContainer: {
    width: 50,
    height: 50,
  },
});

export default OwnQuizQuestionScreen;
