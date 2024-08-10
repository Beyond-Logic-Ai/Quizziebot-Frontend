// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { images } from '../../constants/images';

// const { width } = Dimensions.get('window');

// const OwnQuizWelcomePage = ({ navigation }) => {
//   const [sessionId, setSessionId] = useState(null);
//   const [messages, setMessages] = useState([
//     { id: '1', type: 'bot', text: 'Ask anything, get your answer' }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [identifiedTopic, setIdentifiedTopic] = useState(null);
//   const flatListRef = useRef(null); // Reference for FlatList

//   useEffect(() => {
//     const startSession = async () => {
//       try {
//         const userSession = await AsyncStorage.getItem('userSession');
//         const storedUserId = await AsyncStorage.getItem('userId');
        
//         if (userSession && storedUserId) {
//           const { token } = JSON.parse(userSession);

//           const response = await axios.post(
//             `https://api.quizziebot.com/api/chat/startSession?userId=${storedUserId}`, 
//             {}, 
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           setSessionId(response.data.id);
//         } else {
//           navigation.navigate('SignInFirst');
//         }
//       } catch (error) {
//         console.error('Failed to start session:', error);
//       }
//     };

//     startSession();
//   }, [navigation]);

//   const handleSend = async () => {
//     if (inputText.trim() && sessionId) {
//       const userMessage = { id: (messages.length + 1).toString(), type: 'user', text: inputText };
//       setMessages([...messages, userMessage]);

//       try {
//         const userSession = await AsyncStorage.getItem('userSession');
//         const storedUserId = await AsyncStorage.getItem('userId');
//         if (userSession && storedUserId) {
//           const { token } = JSON.parse(userSession);

//           const response = await axios.post(
//             `https://api.quizziebot.com/api/chat/sendMessage?sessionId=${sessionId}&userId=${storedUserId}`,
//             { message: inputText },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               },
//             }
//           );

//           const botMessage = { id: (messages.length + 2).toString(), type: 'bot', text: response.data.messages.slice(-1)[0].message };
//           setMessages((prevMessages) => [...prevMessages, botMessage]);

//           if (response.data.identifiedTopic) {
//             setIdentifiedTopic(response.data.identifiedTopic);
//             setTimeout(() => {
//               const quizPromptMessage = {
//                 id: (messages.length + 3).toString(),
//                 type: 'bot',
//                 text: `Do you want a quiz on ${response.data.identifiedTopic}?`,
//               };
//               setMessages((prevMessages) => [...prevMessages, quizPromptMessage]);
//             }, 1000);
//           }
//         }
//       } catch (error) {
//         console.error('Error sending message:', error.message);
//       }

//       setInputText(''); // Clear the input field after sending the message
//       Keyboard.dismiss(); // Dismiss the keyboard when the message is sent
//     }
//   };

//   const handleQuizDecision = async (decision) => {
//     if (decision && sessionId && identifiedTopic) {
//       const userSession = await AsyncStorage.getItem('userSession');
//       const storedUserId = await AsyncStorage.getItem('userId');
//       if (userSession && storedUserId) {
//         const { token } = JSON.parse(userSession);

//         try {
//           // Navigate to loading screen and fetch questions in the loading page
//           navigation.navigate('OwnQuizLoadingPage', {
//             sessionId,
//             identifiedTopic,
//             userId: storedUserId,
//             token,
//           });
//         } catch (error) {
//           console.error('Error handling quiz decision:', error.message);
//         }
//       }
//     } else {
//       navigation.navigate('HomePageScreen');
//     }
//   };

//   const renderItem = ({ item }) => {
//     return item.type === 'user' ? (
//       <View style={styles.userMessageContainer}>
//         <Text style={styles.userMessageText}>{item.text}</Text>
//       </View>
//     ) : (
//       <View style={styles.botMessageContainer}>
//         <Image source={images.logo2} style={styles.botImage} />
//         <Text style={styles.botMessageText}>{item.text}</Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
//       >
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={wp(6)} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.closeText}>Close</Text>
//         </View>

//         <View style={styles.robotImageContainer}>
//           <Svg height="75%" width="75%" viewBox="0 0 100 100" style={styles.gradient}>
//             <Defs>
//               <RadialGradient
//                 id="grad"
//                 cx="47%"
//                 cy="50%"
//                 r="50%"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <Stop offset="40%" stopColor="#6F98DB" stopOpacity="1" />
//                 <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
//               </RadialGradient>
//             </Defs>
//             <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
//           </Svg>
//           <Image source={images.logo2} style={styles.robotImage} />
//         </View>
        
//         <Text style={styles.title}>Welcome to{'\n'}Quizzie Bot</Text>

//         <FlatList
//           ref={flatListRef} // Assign the ref to FlatList
//           data={messages}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           style={styles.chatContainer}
//           contentContainerStyle={{ paddingBottom: hp(10) }} // Add padding to avoid overlap with input field
//           onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Scroll when content size changes
//         />

//         <View style={styles.bottomContainer}>
//           {messages.slice(-1)[0].text.includes('Do you want a quiz on') && (
//             <View style={styles.decisionButtons}>
//               <TouchableOpacity
//                 style={styles.decisionButton}
//                 onPress={() => handleQuizDecision(true)}
//               >
//                 <Text style={styles.decisionText}>Yes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.decisionButton}
//                 onPress={() => handleQuizDecision(false)}
//               >
//                 <Text style={styles.decisionText}>No</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Type Here.."
//               placeholderTextColor="#aaa"
//               value={inputText}
//               onChangeText={setInputText}
//               onSubmitEditing={handleSend} // Send message and dismiss keyboard when Enter is pressed
//               returnKeyType="send" // Customize the return key to display "Send"
//             />
//             <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//               <Icon name="send" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingTop: hp(2),
//     paddingBottom: hp(1),
    
//   },
//   closeText: {
//     top:-wp(.4),
//     marginLeft: wp(3),
//     fontSize: wp(5),
//     color: '#000',
//     fontWeight: 'bold',
//     fontFamily: 'Nunito',
//   },

//   robotImageContainer: {
//     width: hp(20),
//     height: hp(22),
//     borderRadius: wp(17.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: wp(7),
//     overflow: 'hidden',
//   },
//   gradient: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   robotImage: {
//     width: hp(20),
//     height: hp(20),
//     resizeMode: 'contain',
//   },
//   title: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//     fontSize: hp(4),
//     color: '#000',
//     marginTop: wp(4),
//   },
//   chatContainer: {
//     flex: 1,
//     paddingHorizontal: wp(5),
//     paddingTop: hp(2),
//   },
//   userMessageContainer: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#0048BF',
//     padding: hp(1.5),
//     borderRadius: wp(3),
//     marginBottom: hp(2),
//   },
//   userMessageText: {
//     color: '#fff',
//     fontSize: wp(4),
//     fontFamily: 'Nunito',
//   },
//   botMessageContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: hp(2),
//     borderRadius: wp(3),
//     marginBottom: hp(2),
//   },
//   botImage: {
//     width: hp(5),
//     height: hp(5),
//     resizeMode: 'contain',
//     marginRight: wp(3),
//   },
//   botMessageText: {
//     color: '#000',
//     fontSize: wp(4),
//     fontFamily: 'Nunito',
//     flex: 1,
//     flexWrap: 'wrap',
//   },
//   bottomContainer: {
//     width: wp(100),
//     alignItems: 'center',
//     paddingBottom: hp(2),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: wp(90),
//     height: hp(6),
//     backgroundColor: '#f0f0f0',
//     borderRadius: wp(1),
//     paddingHorizontal: wp(2),
//     borderWidth: wp(0.2),
//     borderColor: '#ccc',
//   },
//   input: {
//     flex: 1,
//     fontSize: wp(4),
//   },
//   sendButton: {
//     backgroundColor: '#0048BF',
//     width: hp(4.5),
//     height: hp(4.5),
//     borderRadius: hp(1),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: wp(2),
//   },
//   decisionButtons: {
//     flexDirection: 'row',
//     marginBottom: hp(1),
//   },
//   decisionButton: {
//     backgroundColor: '#0048BF',
//     padding: hp(1.5),
//     borderRadius: wp(2),
//     marginHorizontal: wp(2),
//   },
//   decisionText: {
//     color: '#fff',
//     fontSize: wp(4),
//     fontFamily: 'Nunito',
//   },
// });

// export default OwnQuizWelcomePage;
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
const { width } = Dimensions.get('window');
const OwnQuizWelcomePage = ({ navigation }) => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    { id: '1', type: 'bot', text: 'Ask anything, get your answer' }
  ]);
  const [inputText, setInputText] = useState('');
  const [identifiedTopic, setIdentifiedTopic] = useState(null);
  const flatListRef = useRef(null); // Reference for FlatList
  useEffect(() => {
    const startSession = async () => {
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
        } else {
          navigation.navigate('SignInFirst');
        }
      } catch (error) {
        console.error('Failed to start session:', error);
      }
    };
    startSession();
  }, [navigation]);
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
            { message: inputText },
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
            setIdentifiedTopic(response.data.identifiedTopic);
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
      Keyboard.dismiss(); // Dismiss the keyboard when the message is sent
    }
  };
  const handleQuizDecision = async (decision) => {
    if (decision && sessionId && identifiedTopic) {
      const userSession = await AsyncStorage.getItem('userSession');
      const storedUserId = await AsyncStorage.getItem('userId');
      if (userSession && storedUserId) {
        const { token } = JSON.parse(userSession);
        try {
          // Navigate to loading screen and fetch questions in the loading page
          navigation.navigate('OwnQuizLoadingPage', {
            sessionId,
            identifiedTopic,
            userId: storedUserId,
            token,
          });
        } catch (error) {
          console.error('Error handling quiz decision:', error.message);
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={wp(6)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.closeText}>Close</Text>
        </View>
        
       
        <FlatList
          ref={flatListRef} // Assign the ref to FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: hp(10) }} // Add padding to avoid overlap with input field
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Scroll when content size changes
        />
        <View style={styles.bottomContainer}>
          {messages.slice(-1)[0].text.includes('Do you want a quiz on') && (
            <View style={styles.decisionButtons}>
              <TouchableOpacity
                style={styles.decisionButton}
                onPress={() => handleQuizDecision(true)}
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type Here.."
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend} // Send message and dismiss keyboard when Enter is pressed
              returnKeyType="send" // Customize the return key to display "Send"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  robotImageContainer: {
    width: hp(20),
    height: hp(22),
    borderRadius: wp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp(7),
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  robotImage: {
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: hp(4),
    color: '#000',
    marginTop: wp(4),
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
    backgroundColor: '#F0F0F0',
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
    width: wp(100),
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    height: hp(6),
    backgroundColor: '#F0F0F0',
    borderRadius: wp(1),
    paddingHorizontal: wp(2),
    borderWidth: wp(0.2),
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
    marginBottom: hp(1),
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
export default OwnQuizWelcomePage;