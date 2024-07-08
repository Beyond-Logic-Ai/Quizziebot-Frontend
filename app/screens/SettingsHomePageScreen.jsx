// import { View, Text, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Switch } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { images } from '../../constants/images';

// const { width, height } = Dimensions.get('window');

// const SettingsHomePageScreen = ({ navigation }) => {
//   const [isNotificationEnabled, setNotificationEnabled] = React.useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={10}>
//         <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover" blurRadius={10}>
//           <View style={styles.headerContainer}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Settings</Text>
//             <View style={{ width: 24 }} />
//           </View>

//           <View style={styles.body}>
//             <View style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="notifications-outline" size={24} color="#FF0000" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Notification</Text>
//               <Switch
//                 value={isNotificationEnabled}
//                 onValueChange={(value) => setNotificationEnabled(value)}
//                 trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
//                 thumbColor={isNotificationEnabled ? "#0044F2" : "#FFFFFF"}
//                 style={styles.switch}
//               />
//             </View>

//             <TouchableOpacity style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="musical-notes-outline" size={24} color="#FF00FF" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Music & Effects</Text>
//               <Icon name="chevron-forward-outline" size={24} color="#FFFFFF" />
//             </TouchableOpacity>

//             <View style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="language-outline" size={24} color="#00FF00" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Language</Text>
//               <Text style={styles.languageText}>English</Text>
//             </View>

//             <TouchableOpacity style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="information-circle-outline" size={24} color="#00FFFF" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>About Quizzie Bot</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.optionRow}>
//               <View style={styles.iconContainer}>
//                 <View style={styles.iconBackground}>
//                   <Icon name="log-out-outline" size={24} color="#FF4500" />
//                 </View>
//               </View>
//               <Text style={styles.optionText}>Logout</Text>
//             </TouchableOpacity>

//             <Text style={styles.privacyText}>Privacy Policy @ Quizzie Bot</Text>
//           </View>
//         </ImageBackground>

//         <View style={styles.footer}>
//           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <View style={styles.footerItem}>
//               <Icon name="home-outline" size={28} color="#000" />
//               <Text style={styles.footerText}>Home</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={styles.footerItem}>
//               <Icon name="person-outline" size={28} color="#000" />
//               <Text style={styles.footerText}>Profile</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={styles.footerItem}>
//               <Icon name="trophy-outline" size={28} color="#000" />
//               <Text style={styles.footerText}>Leaderboard</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={[styles.footerItem, styles.activeFooterItem]}>
//               <Icon name="settings-outline" size={28} color="#35383F" />
//               <Text style={[styles.footerText, styles.activeFooterText]}>Settings</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0044F2',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlayImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'space-between',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: 16,
//     marginTop: 16,
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   body: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     justifyContent: 'center',
//   },
//   optionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   iconContainer: {
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconBackground: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   optionText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#FFFFFF',
//     marginLeft: 10,
//   },
//   languageText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//   },
//   switch: {
//     marginRight: 10,
//   },
//   privacyText: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 12,
//     backgroundColor: '#FFF',
//     paddingBottom: 20, // Add extra padding for safe area
//   },
//   footerItem: {
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: 12,
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


import { View, Text, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants/images';

const { width, height } = Dimensions.get('window');

const SettingsHomePageScreen = ({ navigation }) => {
  const [isNotificationEnabled, setNotificationEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={10}>
        <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover" blurRadius={10}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={{ width: 24 }} />
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
                trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                thumbColor={isNotificationEnabled ? "#0044F2" : "#FFFFFF"}
                style={styles.switch}
              />
            </View>

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                  <Icon name="musical-notes-outline" size={28} color="#FF00FF" />
                </View>
              </View>
              <Text style={styles.optionText}>Music & Effects</Text>
              <Icon name="chevron-forward-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.optionRow}>
              <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                  <Icon name="language-outline" size={28} color="#00FF00" />
                </View>
              </View>
              <Text style={styles.optionText}>Language</Text>
              <Text style={styles.languageText}>English</Text>
            </View>

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                  <Icon name="information-circle-outline" size={28} color="#00FFFF" />
                </View>
              </View>
              <Text style={styles.optionText}>About Quizzie Bot</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                  <Icon name="log-out-outline" size={28} color="#FF4500" />
                </View>
              </View>
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.privacyText}>Privacy Policy @ Quizzie Bot</Text>
          </View>
        </ImageBackground>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('HomePageScreen')}>
            <View style={styles.footerItem}>
              <Icon name="home-outline" size={28} color="#000" />
              <Text style={styles.footerText}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="person-outline" size={28} color="#000" />
              <Text style={styles.footerText}>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="trophy-outline" size={28} color="#000" />
              <Text style={styles.footerText}>Leaderboard</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.footerItem, styles.activeFooterItem]}>
              <Icon name="settings-outline" size={28} color="#35383F" />
              <Text style={[styles.footerText, styles.activeFooterText]}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0044F2',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    justifyContent: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    marginVertical: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  languageText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  switch: {
    marginRight: 10,
  },
  privacyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    paddingBottom: 20, // Add extra padding for safe area
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
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





