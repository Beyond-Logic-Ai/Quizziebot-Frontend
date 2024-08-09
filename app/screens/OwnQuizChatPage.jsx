import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { images } from '../../constants/images';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OwnQuizChatPage = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', type: 'bot', text: 'Ask anything, get your answer' }
  ]);
  const [inputText, setInputText] = useState('');
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const startChatSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (userSession && storedUserId) {
          const { token } = JSON.parse(userSession);

          const response = await axios.post(
            `https://api.quizziebot.com/api/chat/startSession?userId=${storedUserId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSessionId(response.data.id);
        }
      } catch (error) {
        console.error('Error starting chat session:', error.message);
      }
    };

    startChatSession();
  }, []);

  const handleSend = async () => {
    if (inputText.trim() && sessionId) {
      const userMessage = { id: (messages.length + 1).toString(), type: 'user', text: inputText };
      setMessages([...messages, userMessage]);

      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (userSession && storedUserId) {
          const { token } = JSON.parse(userSession);

          const response = await axios.post(
            `https://api.quizziebot.com/api/chat/sendMessage?sessionId=${sessionId}&userId=${storedUserId}`,
            inputText,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          const botMessage = { id: (messages.length + 2).toString(), type: 'bot', text: response.data.messages.slice(-1)[0].message };
          setMessages((prevMessages) => [...prevMessages, botMessage]);

          if (response.data.identifiedTopic) {
            setTimeout(() => {
              const quizPromptMessage = {
                id: (messages.length + 3).toString(),
                type: 'bot',
                text: `Do you want a quiz on ${response.data.identifiedTopic}?`,
              };
              setMessages((prevMessages) => [...prevMessages, quizPromptMessage]);
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error sending message:', error.message);
      }

      setInputText(''); // Clear the input field after sending the message
    }
  };

  const handleQuizDecision = async (decision) => {
    if (decision && sessionId) {
      const userSession = await AsyncStorage.getItem('userSession');
      const storedUserId = await AsyncStorage.getItem('userId');
      if (userSession && storedUserId) {
        const { token } = JSON.parse(userSession);

        try {
          const response = await axios.post(
            'https://api.quizziebot.com/api/quizzes/generate',
            {
              topic: messages.slice(-2)[0].text.split(' ')[5],
              confirm: decision,
              userId: storedUserId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data.questions) {
            navigation.navigate('QuizQuestionScreen', {
              questions: response.data.questions,
              quizId: response.data.quizId,
              userId: storedUserId,
            });
          }
        } catch (error) {
          console.error('Error generating quiz:', error.message);
        }
      }
    } else {
      navigation.navigate('HomePageScreen');
    }
  };

  const renderItem = ({ item }) => {
    return item.type === 'user' ? (
      <View style={styles.userMessageContainer}>
        <Text style={styles.userMessageText}>{item.text}</Text>
      </View>
    ) : (
      <View style={styles.botMessageContainer}>
        <Image source={images.logo2} style={styles.botImage} />
        <Text style={styles.botMessageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={wp(6)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.closeText}>Close</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: hp(10) }} // Add padding to avoid overlap with input field
      />

      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type Here.."
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        {messages.slice(-1)[0].text.includes('Do you want a quiz on') && (
          <View style={styles.decisionButtons}>
            <TouchableOpacity
              style={styles.decisionButton}
              onPress={() => navigation.navigate('OwnQuizLoadingPage')}
              // onPress={() => handleQuizDecision(true)}
            >
              <Text style={styles.decisionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.decisionButton}
              onPress={() => handleQuizDecision(false)}
            >
              <Text style={styles.decisionText}>No</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  closeText: {
    marginLeft: wp(8),
    fontSize: wp(5),
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#0048BF',
    padding: hp(1.5),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  userMessageText: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: 'Nunito',
  },
  botMessageContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: hp(2),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  botImage: {
    width: hp(5),
    height: hp(5),
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  botMessageText: {
    color: '#000',
    fontSize: wp(4),
    fontFamily: 'Nunito',
    flex: 1,
    flexWrap: 'wrap',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: hp(4),
    width: wp(100),
    alignItems: 'center',
    marginBottom: hp(2)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    height: hp(6),
    backgroundColor: '#f0f0f0',
    borderRadius: wp(1),
    paddingHorizontal: wp(2),
    borderWidth: wp(.2),
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    fontSize: wp(4),
  },
  sendButton: {
    backgroundColor: '#0048BF',
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  decisionButtons: {
    flexDirection: 'row',
    marginTop: hp(1),
  },
  decisionButton: {
    backgroundColor: '#0048BF',
    padding: hp(1.5),
    borderRadius: wp(2),
    marginHorizontal: wp(2),
  },
  decisionText: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: 'Nunito',
  },
});

export default OwnQuizChatPage;
