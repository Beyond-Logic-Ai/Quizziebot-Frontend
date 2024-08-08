import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const ArcadeQuestionScreen = ({ navigation, route }) => {
  const { questions, quizId, userId } = route.params;
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (questionId, selectedOption, timeTaken, answered) => {
    const newAnswer = { questionId, selectedOption, timeTaken, answered };
    setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
    console.log('New Answer:', newAnswer);
  };

  const handleSubmit = () => {
    navigation.navigate('ArcadeResultScreen', { userId, quizId, answers });
  };

  return (
    <View>
      {questions.map((question, index) => (
        <View key={question.questionId}>
          <Text>{question.questionText}</Text>
          {/* Render options here and call handleAnswer with the selected option */}
          <Button
            title="Answer"
            onPress={() => handleAnswer(question.questionId, "selectedOption", 5, true)}
          />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ArcadeQuestionScreen;
