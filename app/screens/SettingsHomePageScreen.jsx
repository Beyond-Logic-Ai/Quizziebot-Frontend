
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch, Alert, Image } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Ionicons } from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
// import Fontisto from 'react-native-vector-icons/Fontisto';

// import  SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { images } from '../../constants/images';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const SettingsHomePageScreen = ({ navigation }) => {
//   const [isNotificationEnabled, setNotificationEnabled] = React.useState(false);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('userSession');
//       Alert.alert('Logged out', 'You have been logged out successfully.');
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Second' }],
//       });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to log out.');
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={22}>
//         {/* <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover" blurRadius={10}> */}
//     <SafeAreaView style={styles.container}>
      
//           <View style={styles.headerContainer}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Settings</Text>
//           </View>
//           <View style={styles.body}>
//             <View style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="notifications-outline" size={28} color="#FF0000" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Notification</Text>
//               <Switch
//                 value={isNotificationEnabled}
//                 onValueChange={(value) => setNotificationEnabled(value)}
//                 trackColor={{ false: "#FBFCF6", true: "#FFFFFF" }}
//                 thumbColor={isNotificationEnabled ? "#0044F2" : "#FFFFFF"}
//                 style={styles.switch}
//               />
//             </View>

//             <TouchableOpacity style={styles.optionRow}onPress={() => navigation.navigate('MusicAndEffectsScreen')}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="musical-notes-outline" size={28} color="#FF00FF" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Music & Effects</Text>
//               <Icon name="chevron-forward-outline" size={28} color="#FFFFFF" />
//             </TouchableOpacity>

//             {/* <View style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="language-outline" size={28} color="#00FF00" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Language</Text>
//               <Text style={styles.languageText}>English</Text>
//             </View> */}

//             <TouchableOpacity style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="information-circle-outline" size={28} left={1} color="#0048BF" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>About Quizzie Bot</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="log-out-outline" size={28} left={2} color="#FF4500" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Logout</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.privacyText} color={"#FFFFF"}>
//             <Text style={styles.privacyText1}>Privacy Policy @ Quizzie Bot</Text>
//             </TouchableOpacity>
//           </View>
//           </SafeAreaView>
//         {/* </ImageBackground> */}
//         <View style={styles.footer}>
    
//           <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomePageScreen')}>
//             <Ionicons name="home-outline" style={styles.footerIcon}color={"#9E9E9E"} />
//             <Text style={styles.footerText}>Home</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerButton}onPress={() => navigation.navigate('ProfilePage')}>
//             <Ionicons name="person-outline" style={styles.footerIcon}color={"#9E9E9E"} />
//             <Text style={styles.footerText}>Profile</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerButton}onPress={() => navigation.navigate('LeaderBoard')}>
//           <Ionicons name="trophy-outline"  style={styles.footerIcon} color={"#9E9E9E"} />
//           <Text style={styles.footerText}>Leaderboard</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerButton}>
//             <Ionicons name="options" style={styles.footerIcon} />
//             <Text style={[styles.footerText, { color: '#000' }]}>Settings</Text>
//           </TouchableOpacity>
//       </View>
//       </ImageBackground>
      
     
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
    
//   },
//   backgroundImage: {
//     flex: 1,
//     backgroundColor: '#0044F2',
//     width: '100%',
//     height: '100%',
//     justifyContent: 'space-between',
//   },
//   // overlayImage: {
//   //   flex: 1,
//   //   width: '100%',
//   //   height: '100%',
//   //   justifyContent: 'space-between',
//   // },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: 16,
//     paddingTop: hp(2),
    
    
//   },
//   backButton: {
   
//   },
//   headerTitle: {
//     fontSize: 24,
//     marginLeft:wp(10),
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     fontFamily: 'Nunito',
//   },
//   body: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: hp(10),
//     paddingBottom: hp(10),
    
//   },
//   optionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     // backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     borderRadius: 10,
//     top:-hp(5),
//     marginVertical: hp(1),
   
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // borderColor:"black",
//     // borderWidth:2
//   },
//   iconBackground: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   optionText: {
//     flex: 1,
//     fontSize: 18,
//     color: '#FFFFFF',
//     marginLeft: 19,
//     fontFamily: 'Nunito',
//     fontWeight: 'bold',
//   },
//   languageText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontFamily: 'Nunito',
//     fontWeight: 'bold',
//   },
//   switch: {
//     marginRight: 10,
   
//   },
//   privacyText: {
//     alignItems:"center",
//     textAlign: 'center',
//     marginTop: hp(29),
    
//   },
//   privacyText1: {
//     color:"#FFF",
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
//   footerIcon: {
//    fontSize:32,
//   },
//   footerButton: {
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: wp(3),
//     color:"#9E9E9E",
//     top:4,
//     fontFamily: 'Nunito',
//   },
 
  
//   activeFooterItem: {
//     borderTopWidth: 0,
//     borderTopColor: '#0044F2',
//   },
//   activeFooterText: {
//     color: '#35383F',
//   },
// });

// export default SettingsHomePageScreen;

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SettingsHomePageScreen = ({ navigation }) => {
  const [isNotificationEnabled, setNotificationEnabled] = React.useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Second' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
      console.error('Error logging out:', error);
    }
  };

  return (
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={22}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.optionRow}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Icon name="notifications-outline" size={28} color="#FF0000" />
              </View>
            </View>
            <Text style={styles.optionText}>Notification</Text>
            <Switch
              value={isNotificationEnabled}
              onValueChange={(value) => setNotificationEnabled(value)}
              trackColor={{ false: "#000", true: "#FFFFFF" }} // Green when off, white when on
              thumbColor={isNotificationEnabled ? "#0044F2" : "#FFFFFF"} // Customize thumb color as needed
              style={styles.switch}
            />
          </View>

          <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('MusicAndEffectsScreen')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Icon name="musical-notes-outline" size={28} color="#FF00FF" />
              </View>
            </View>
            <Text style={styles.optionText}>Music & Effects</Text>
            <Icon name="chevron-forward-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Icon name="information-circle-outline" size={28} left={1} color="#0048BF" />
              </View>
            </View>
            <Text style={styles.optionText}>About Quizzie Bot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Icon name="log-out-outline" size={28} left={2} color="#FF4500" />
              </View>
            </View>
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.privacyText}>
            <Text style={styles.privacyText1}>Privacy Policy @ Quizzie Bot</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomePageScreen')}>
          <Ionicons name="home-outline" style={styles.footerIcon} color={"#9E9E9E"} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ProfilePage')}>
          <Ionicons name="person-outline" style={styles.footerIcon} color={"#9E9E9E"} />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('LeaderBoard')}>
          <Ionicons name="trophy-outline" style={styles.footerIcon} color={"#9E9E9E"} />
          <Text style={styles.footerText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="options" style={styles.footerIcon} />
          <Text style={[styles.footerText, { color: '#000' }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#0044F2',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: hp(2),
  },
  backButton: {},
  headerTitle: {
    fontSize: 24,
    marginLeft: wp(10),
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: hp(10),
    paddingBottom: hp(10),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    top: -hp(5),
    marginVertical: hp(1),
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 19,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  switch: {
    marginRight: 10,
  },
  privacyText: {
    alignItems: "center",
    textAlign: 'center',
    marginTop: hp(29),
  },
  privacyText1: {
    color: "#FFF",
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
  footerIcon: {
    fontSize: 32,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp(3),
    color: "#9E9E9E",
    top: 4,
    fontFamily: 'Nunito',
  },
  activeFooterItem: {
    borderTopWidth: 0,
    borderTopColor: '#0044F2',
  },
  activeFooterText: {
    color: '#35383F',
  },
});

export default SettingsHomePageScreen;
