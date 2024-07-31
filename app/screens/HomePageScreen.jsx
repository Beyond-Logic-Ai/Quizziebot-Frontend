import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CreateQuizzieButton from '../components/CreateQuizzieButton';

const { width, height } = Dimensions.get('window');

const HomePageScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deferredLoading, setDeferredLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { token } = JSON.parse(userSession);

        const response = await axios.get('https://api.quizziebot.com/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setUsername(data.username);
        setCoins(data.coins != null ? data.coins : 0);
        
        await AsyncStorage.setItem('userId', data.userId);
      } else {
        navigation.navigate('SignInFirst');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();

      const interval = setInterval(() => {
        fetchUserData();
      }, 30000);

      return () => clearInterval(interval);
    }, [fetchUserData])
  );

  useEffect(() => {
    if (!loading) {
      // Defer loading of additional content
      setTimeout(() => {
        setDeferredLoading(true);
      }, 500); // Adjust this delay as needed
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#366EFF" />
      </View>
    );
  }

  return (
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={images.profilepic} style={styles.profileImage} />
          <Text style={styles.username}>{username || 'Shiva Nagendra'}</Text>
          
            <View style={styles.coinContainer}>
              <Text style={styles.coinText}>{coins}</Text>
              <View style={styles.coinborder}>
              <Image source={images.coin} style={styles.coinImage} />
              </View>
            </View>
          
          <Image source={images.badge} style={styles.badgeImage} />
          <TouchableOpacity  onPress={() => navigation.navigate('SettingsHomePageScreen')}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {deferredLoading && (
          <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover">
            <View style={styles.body}>
              <View style={styles.textBox}>
                <Text style={styles.subtitle}>Unleash the power of AI! Discover quizzes made just for you</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ArcadePage')} style={styles.play}>
                  <LinearGradient
                    colors={['#9DFF4F', '#1ABD00']}
                    start={{ x: 0.5, y: 0.15 }}
                    end={{ x: 0.5, y: 0.6 }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Play Now</Text>
                  </LinearGradient>                  
                </TouchableOpacity>
                <CreateQuizzieButton
              title="Create your own quiz by QUIZZIE BOT"
              screenName="HomePageScreen"
              navigation={navigation}
            
            />
              </View>
            </View>
          </ImageBackground>
        )}
      </SafeAreaView>
      {deferredLoading && <Footer navigation={navigation} />}
    </ImageBackground>
  );
};

const Footer = ({ navigation }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.footerButton}>
      <Fontisto name="home" size={32} color="#000" />
      <Text style={styles.footerText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton}>
      <Ionicons name="person-outline" size={32} color="#000" />
      <Text style={styles.footerText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton}>
      <Ionicons name="trophy-outline" style={styles.footerIcon} />
      <Text style={styles.footerText}>Leaderboard</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SettingsHomePageScreen')}>
      <Ionicons name="options-outline" style={styles.footerIcon} />
      <Text style={styles.footerText}>Settings</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp(1.5),
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    
    
  },
  profileImage: {
    width: 43,
    height: 43,
    borderRadius: 22,
    // borderColor: 'black',
    // borderWidth: 2,
    
  },
  username: {
    flex:0.95,
    marginLeft:5,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    
    
    
  },
  // coinBadgeContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderColor: 'black',
  //   borderWidth: 2,
  // },
  coinContainer: {
    left:5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 5,
    paddingVertical: 3,
   
  },
  coinborder:
  {
    right: -2,
    backgroundColor: 'blue',
    width: 27,
    height: 27,
    borderRadius: 15,
    alignItems:"center"
    
    
  },
  coinImage: {
    top:2,
    alignSelf:"center",
    width: 22,
    height: 22,
    // borderRadius: 12,
    // borderColor:"black",
    // borderWidth:2,
    
  },
  coinText: {
    left: -4,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  badgeImage: {
    marginLeft: 7,
    width: 37,
    height: 37,
    
  },
  notificationIcon: {
    marginLeft: 7,
    fontSize: 29,
    color: '#FFFFFF',

  },
  overlayImage: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: wp(4.8),
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#366EFF',
    width: 250,
    height: 50,
    borderRadius: 20,
    // borderColor: 'black',
    // borderWidth: 2,
  },
  play: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 6,
    fontFamily: 'Nunito',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(4),
    paddingHorizontal: '5%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp(3),
    color: '#000',
  },
  footerIcon: {
    fontSize: 32,
  },
});

export default HomePageScreen;

// import React, { useEffect, useState, useCallback } from 'react';
// import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { images } from '../../constants/images';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import CreateQuizzieButton from '../components/CreateQuizzieButton';

// const { width, height } = Dimensions.get('window');

// const HomePageScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [coins, setCoins] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [deferredLoading, setDeferredLoading] = useState(false);

//   const fetchUserData = useCallback(async () => {
//     try {
//       const userSession = await AsyncStorage.getItem('userSession');
//       if (userSession) {
//         const { token } = JSON.parse(userSession);

//         const response = await axios.get('https://api.quizziebot.com/api/home', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data;
//         setUsername(data.username);
//         setCoins(data.coins != null ? data.coins : 0);
        
//         await AsyncStorage.setItem('userId', data.userId);
//       } else {
//         navigation.navigate('SignInFirst');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error.message);
//       if (error.response) {
//         console.error('Error response data:', error.response.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [navigation]);

//   useFocusEffect(
//     useCallback(() => {
//       fetchUserData();

//       const interval = setInterval(() => {
//         fetchUserData();
//       }, 30000);

//       return () => clearInterval(interval);
//     }, [fetchUserData])
//   );

//   useEffect(() => {
//     if (!loading) {
//       // Defer loading of additional content
//       setTimeout(() => {
//         setDeferredLoading(true);
//       }, 500); // Adjust this delay as needed
//     }
//   }, [loading]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#366EFF" />
//       </View>
//     );
//   }

//   return (
//     <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover">
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <Image source={images.profilepic} style={styles.profileImage} />
//           <Text style={styles.username}>{username || 'Shiva Nagendra'}</Text>
//           <View style={styles.coinContainer}>
//             <Text style={styles.coinText}>{coins}</Text>
//             <View style={styles.coinborder}>
//               <Image source={images.coin} style={styles.coinImage} />
//             </View>
//           </View>
//           <Image source={images.badge} style={styles.badgeImage} />
//           <TouchableOpacity onPress={() => navigation.navigate('SettingsHomePageScreen')}>
//             <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
//           </TouchableOpacity>
//         </View>

//         {deferredLoading && (
//           <View style={styles.coinsbg}>
//           <Image source={images.homepagecoins} style={styles.coinsimg} />
//           </View>

//           <View style={styles.overlayImage}>
            
//             <View style={styles.body}>
//               <View style={styles.textBox}>
//                 <Text style={styles.subtitle}>Unleash the power of AI! Discover quizzes made just for you</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('ArcadePage')} style={styles.play}>
//                   <LinearGradient
//                     colors={['#9DFF4F', '#1ABD00']}
//                     start={{ x: 0.5, y: 0.15 }}
//                     end={{ x: 0.5, y: 0.6 }}
//                     style={styles.button}
//                   >
//                     <Text style={styles.buttonText}>Play Now</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//                 <CreateQuizzieButton
//                   title="Create your own quiz by QUIZZIE BOT"
//                   screenName="HomePageScreen"
//                   navigation={navigation}
//                 />
//               </View>
//             </View>
//           </View>
//         )}
//       </SafeAreaView>
//       {deferredLoading && <Footer navigation={navigation} />}
//     </ImageBackground>
//   );
// };

// const Footer = ({ navigation }) => (
//   <View style={styles.footer}>
//     <TouchableOpacity style={styles.footerButton}>
//       <Fontisto name="home" size={32} color="#000" />
//       <Text style={styles.footerText}>Home</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.footerButton}>
//       <Ionicons name="person-outline" size={32} color="#000" />
//       <Text style={styles.footerText}>Profile</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.footerButton}>
//       <Ionicons name="trophy-outline" style={styles.footerIcon} />
//       <Text style={styles.footerText}>Leaderboard</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SettingsHomePageScreen')}>
//       <Ionicons name="options-outline" style={styles.footerIcon} />
//       <Text style={styles.footerText}>Settings</Text>
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: hp(1.5),
//     backgroundColor: 'rgba(0, 0, 0, 0.03)',
//   },
//   profileImage: {
//     width: 43,
//     height: 43,
//     borderRadius: 22,
//   },
//   username: {
//     flex: 0.95,
//     marginLeft: 5,
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   coinContainer: {
//     left: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     paddingHorizontal: 5,
//     paddingVertical: 3,
//   },
//   coinborder: {
//     right: -2,
//     backgroundColor: 'blue',
//     width: 27,
//     height: 27,
//     borderRadius: 15,
//     alignItems: 'center',
//   },
//   coinImage: {
//     top: 2,
//     alignSelf: 'center',
//     width: 22,
//     height: 22,
//   },
//   coinText: {
//     left: -4,
//     marginLeft: 4,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   badgeImage: {
//     marginLeft: 7,
//     width: 37,
//     height: 37,
//   },
//   notificationIcon: {
//     marginLeft: 7,
//     fontSize: 29,
//     color: '#FFFFFF',
//   },
//   overlayImage: {
//     flex: 1,
//     width: '100%',
//     height: '50%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   coinsbg: {
//     width: wp(100),
//     height: wp(90),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor:'black',
//     borderWidth:2
//   },
//   coinsimg: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover', // This will make the image cover the entire container
//   },
//   body: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//     marginBottom: hp(.5),
//   },
//   textBox: {
//     backgroundColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 18,
//     padding: 20,
//     alignItems: 'center',
//   },
//   subtitle: {
//     fontSize: wp(4.8),
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontFamily: 'Nunito',
//   },
//   button: {
//     backgroundColor: '#366EFF',
//     width: 250,
//     height: 50,
//     borderRadius: 20,
//   },
//   play: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#FFF',
//     fontSize: 27,
//     fontWeight: 'bold',
//     marginTop: 6,
//     fontFamily: 'Nunito',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: '4%',
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: wp(4),
//     borderTopRightRadius: wp(4),
//     borderTopWidth: 1,
//     borderTopColor: '#F5F5F5',
//     paddingBottom: hp(4),
//     paddingHorizontal: '5%',
//   },
//   footerButton: {
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: wp(3),
//     color: '#000',
//   },
//   footerIcon: {
//     fontSize: 32,
//   },
// });

// export default HomePageScreen;
