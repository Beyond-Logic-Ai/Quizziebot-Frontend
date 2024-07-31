// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Svg, { Defs, RadialGradient, Circle, Stop } from 'react-native-svg';
// import { images } from '../../constants/images';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const QuizResultScreen = ({ route, navigation }) => {
//   const { userId, quizId, answers } = route.params;
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const submitQuizAndFetchResults = async () => {
//       try {
//         const userSession = await AsyncStorage.getItem('userSession');
//         if (userSession) {
//           const { token } = JSON.parse(userSession);

//           if (!answers || answers.length === 0) {
//             throw new Error('No answers provided');
//           }

//           const response = await axios.post(
//             'https://api.quizziebot.com/api/quizzes/submit',
//             {
//               userId,
//               quizId,
//               answers,
//               initialQuiz: false,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               },
//             }
//           );

//           setResult(response.data);
//         } else {
//           navigation.navigate('SignInFirst');
//         }
//       } catch (error) {
//         setError(error.response ? error.response.data : error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     submitQuizAndFetchResults();
//   }, [userId, quizId, answers, navigation]);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#1C58F2" />
//         <Text>Loading Results...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   if (!result) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>No Results Available</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('HomePageScreen')} style={styles.backButton}>
//           <Ionicons name="close" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Result</Text>
//       </View>
//       <View style={styles.trophyContainer}>
//         <Svg style={styles.gradient}>
//           <Defs>
//             <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
//               <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
//               <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
//             </RadialGradient>
//           </Defs>
//           <Circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
//         </Svg>
//         <Image source={images.trophy} style={styles.trophyImage} />
//         <Image source={images.starlayer} style={styles.trophyImage} />
//       </View>
//       <Text style={styles.achievementsTitle}>Your Achievements</Text>
//       <View style={styles.achievementGrid}>
//         <View style={styles.achievementItem}>
//           <View style={styles.iconAndValue}>
//             <Image source={images.IQ} style={styles.achievementIcon} />
//             <Text style={styles.achievementValue}>00{result.iqScore}</Text>
//           </View>
//           <Text style={styles.achievementText}>IQ</Text>
//         </View>
//         <View style={styles.achievementItem}>
//           <View style={styles.iconAndValue}>
//             <Image source={images.coins} style={styles.achievementIcon} />
//             <Text style={styles.achievementValue}>000{result.coins}</Text>
//           </View>
//           <Text style={styles.achievementText}>Coins Earned</Text>
//         </View>
//         <View style={styles.achievementItem}>
//           <View style={styles.iconAndValue}>
//             <Image source={images.xp} style={styles.achievementIcon} />
//             <Text style={styles.achievementValue}>00{result.xpGained}</Text>
//           </View>
//           <Text style={styles.achievementText}>XP</Text>
//         </View>
//         <View style={styles.achievementItem}>
//           <View style={styles.iconAndValue}>
//             <Image source={images.correct} style={styles.achievementIcon} />
//             <Text style={styles.achievementValue}>00{result.correctAnswers}</Text>
//           </View>
//           <Text style={styles.achievementText}>Correct Questions</Text>
//         </View>
//         <View style={styles.achievementItem}>
//           <View style={styles.iconAndValue}>
//             <Image source={images.rank} style={styles.achievementIcon} />
//             <Text style={styles.achievementValue}>000{result.rank}</Text>
//           </View>
//           <Text style={styles.achievementText}>Rank</Text>
//         </View>
//         <View style={styles.achievementItem}>
//           <View style={styles.iconAndValue}>
//             <Image source={images.avgtime} style={styles.achievementIcon} />
//             <Text style={styles.achievementValue}>000{result.avgTime}</Text>
//           </View>
//           <Text style={styles.achievementText}>Avg Time</Text>
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePageScreen')}>
//           <Ionicons name="home-outline" size={24} color="#fff" />
//           <Text style={styles.buttonText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => {/* handle share */}}>
//           <Ionicons name="share-outline" size={24} color="#fff" />
//           <Text style={styles.buttonText}>Share</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     width: '100%',
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     position: 'relative',
//   },
//   backButton: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1C58F2',
//     fontFamily: 'Nunito',
//   },
//   trophyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     position: 'relative',
//     width: wp(50),
//     height: wp(50),
//   },
//   gradient: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   trophyImage: {
//     width: wp(45),
//     height: wp(45),
//     resizeMode: 'contain',
//     position: 'absolute',
//   },
//   achievementsTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#000',
//     fontFamily: 'Nunito',
//   },
//   achievementGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   achievementItem: {
//     alignItems: 'center',
//     width: '45%',
//     marginVertical: 6,
//     borderColor: '#887272',
//     borderWidth: 1,
//     borderRadius: 20,
//     padding: 10,
//   },
//   iconAndValue: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   achievementIcon: {
//     width: 32,
//     height: 32,
//     right:20,
//     marginRight: 5,
//   },
//   achievementText: {
//     fontSize: 14,
//     color: '#000',
//     marginTop: 5,
//     fontFamily: 'Nunito',
//     fontWeight: 'bold',

//   },
//   achievementValue: {
//     right:10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1C58F2',
//     padding: 15,
//     borderRadius: 25,
//     marginTop: hp(6),
//     width: '45%',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });

// export default QuizResultScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Circle, Stop } from 'react-native-svg';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

          if (!answers || answers.length === 0) {
            throw new Error('No answers provided');
          }

          const formattedAnswers = answers.map(answer => ({
            questionId: answer.questionId,
            selectedOption: answer.selectedOption,
            timeTaken: answer.timeTaken,
            answered: answer.answered,
          }));

          const response = await axios.post(
            'https://api.quizziebot.com/api/quizzes/submit',
            {
              userId,
              quizId,
              answers: formattedAnswers,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          setResult(response.data);
        } else {
          navigation.navigate('SignInFirst');
        }
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
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
        <Text>Error: {error}</Text>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePageScreen')} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Result</Text>
      </View>
      <View style={styles.trophyContainer}>
        <Svg style={styles.gradient}>
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
            </RadialGradient>
          </Defs>
          <Circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
        </Svg>
        <Image source={images.trophy} style={styles.trophyImage} />
        <Image source={images.starlayer} style={styles.trophyImage} />
      </View>
      <Text style={styles.achievementsTitle}>Your Achievements</Text>
      <View style={styles.achievementGrid}>
        <View style={styles.achievementItem}>
          <View style={styles.iconAndValue}>
            <Image source={images.IQ} style={styles.achievementIcon} />
            <Text style={styles.achievementValue}>00{result.iqScore}</Text>
          </View>
          <Text style={styles.achievementText}>IQ</Text>
        </View>
        <View style={styles.achievementItem}>
          <View style={styles.iconAndValue}>
            <Image source={images.coins} style={styles.achievementIcon} />
            <Text style={styles.achievementValue}>000{result.coins}</Text>
          </View>
          <Text style={styles.achievementText}>Coins Earned</Text>
        </View>
        <View style={styles.achievementItem}>
          <View style={styles.iconAndValue}>
            <Image source={images.xp} style={styles.achievementIcon} />
            <Text style={styles.achievementValue}>00{result.xpGained}</Text>
          </View>
          <Text style={styles.achievementText}>XP</Text>
        </View>
        <View style={styles.achievementItem}>
          <View style={styles.iconAndValue}>
            <Image source={images.correct} style={styles.achievementIcon} />
            <Text style={styles.achievementValue}>00{result.correctAnswers}</Text>
          </View>
          <Text style={styles.achievementText}>Correct Questions</Text>
        </View>
        <View style={styles.achievementItem}>
          <View style={styles.iconAndValue}>
            <Image source={images.rank} style={styles.achievementIcon} />
            <Text style={styles.achievementValue}>000{result.rank}</Text>
          </View>
          <Text style={styles.achievementText}>Rank</Text>
        </View>
        <View style={styles.achievementItem}>
          <View style={styles.iconAndValue}>
            <Image source={images.avgtime} style={styles.achievementIcon} />
            <Text style={styles.achievementValue}>000{result.avgTime}</Text>
          </View>
          <Text style={styles.achievementText}>Avg Time</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePageScreen')}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* handle share */}}>
          <Ionicons name="share-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C58F2',
    fontFamily: 'Nunito',
  },
  trophyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    width: wp(50),
    height: wp(50),
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  trophyImage: {
    width: wp(45),
    height: wp(45),
    resizeMode: 'contain',
    position: 'absolute',
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Nunito',
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
  },
  achievementItem: {
    alignItems: 'center',
    width: '45%',
    marginVertical: 6,
    borderColor: '#887272',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  iconAndValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 32,
    height: 32,
    right:20,
    marginRight: 5,
  },
  achievementText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontFamily: 'Nunito',
    fontWeight: 'bold',

  },
  achievementValue: {
    right:10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C58F2',
    padding: 15,
    borderRadius: 25,
    marginTop: hp(6),
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default QuizResultScreen;
