
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const ArcadeQuestionScreen = ({ route, navigation }) => {
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
        navigation.navigate('ArcadeResult', { userId, quizId, answers });
      }
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
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
          activeStrokeColor="#0060FF"
        />
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
    // borderColor:"black",
    // borderWidth:2
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
    // borderColor: "black",
    // borderWidth: 2,
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
});

export default ArcadeQuestionScreen;
