

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { images } from '../../constants/images'; // Ensure this is the correct path to your image assets

const OwnQuizChatPage = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', type: 'bot', text: 'A neural network is a computational model inspired by the structure and functioning of the brain. Do you want a quiz for this content?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: (messages.length + 1).toString(), type: 'user', text: inputText }]);
      setInputText(''); // Clear the input field after sending the message
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
          <Icon name="arrow-back" size={wp(6)} color="#000" />
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
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
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
    marginBottom:hp(2)
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
});

export default OwnQuizChatPage;
