// import React from 'react';
// import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity,ScrollView} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import ClassicButton from '../components/ClassicButton';
// import ArcadeButton from '../components/ArcadeButton';
// import CreateQuizzieButton from '../components/CreateQuizzieButton';
// import { images } from '../../constants/images';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const ArcadePage = ({ navigation }) => {
//   return (
//     <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} blurRadius={15}>
//       <SafeAreaView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
//             <Icon name="arrow-back" size={wp(6)} color="#FFF" />
//           </TouchableOpacity>
//         </View>

//         {/* Robot Image */}
//         <View style={styles.robotContainer}>
//           <Image source={images.arcaderobo} style={styles.robotImage} />
//         </View>

//         {/* Main Content */}
//         <View style={styles.mainContent}>
//           <Text style={styles.title}>Pick your path: Creator, Classic, or Arcade. Dive in!</Text>
//           <ClassicButton 
//             title="Classic"
//             screenName="Homepage"
//             image={images.classicimg}
//           />
//           <ArcadeButton
//             title="Arcade"
//             screenName="Homepage"
//             image={images.arcadeimg}
//           />
//           <CreateQuizzieButton 
//             title="Create your own quiz by QUIZZIE BOT"
//             screenName="Homepage"
//           />
//         </View>
//       </SafeAreaView>
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.footerButton}>
//           <Image source={images.emptyhomeicon} style={styles.footerIcon} />
//           <Text style={styles.footerText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerButton}>
//           <Image source={images.profileicon} style={styles.footerIcon} />
//           <Text style={styles.footerText}>Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerButton}>
//           <Image source={images.trophyicon} style={styles.footerIcon} />
//           <Text style={styles.footerText}>Leaderboard</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerButton}>
//           <Image source={images.settingsicon} style={styles.footerIcon} />
//           <Text style={styles.footerText}>Settings</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: '4%',
//   },
//   backButton: {
//     marginRight: '4%',
//   },
//   robotContainer: {
//     alignItems: 'center',
//     marginBottom: '-5%',
//   },
//   robotImage: {
//     width: '70%',
//     height: undefined,
//     aspectRatio: 1,
//     marginTop: '2%',
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: '5%',
//     borderRadius: wp(5),
//     marginHorizontal: '5%',
//     marginTop: '5%',
//     marginBottom: '2%',
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//   },
//   title: {
//     fontSize: wp(5),
//     textAlign: 'center',
//     color: '#FFF',
//     marginBottom: '2%',
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: '2%',
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: wp(5),
//     borderTopRightRadius: wp(5),
//     borderTopWidth: 1,
//     borderTopColor: '#F5F5F5',
//     paddingBottom: '3%',
//     paddingHorizontal: '5%',
//   },
//   footerButton: {
//     alignItems: 'center',
//   },
//   footerIcon: {
//     width: wp(6),
//     height: wp(6),
//   },
//   footerText: {
//     fontSize: wp(3),
//     color: '#000',
//   },
// });

// export default ArcadePage;

import React from 'react';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ClassicButton from '../components/ClassicButton';
import ArcadeButton from '../components/ArcadeButton';
import CreateQuizzieButton from '../components/CreateQuizzieButton';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height: screenHeight } = Dimensions.get('window');

const ArcadePage = ({ navigation }) => {
  return (
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} blurRadius={15}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePageScreen')}>
            <Icon name="arrow-back" size={wp(6)} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.robotContainer}>
            <Image source={images.arcaderobo} style={styles.robotImage} />
          </View>
          
          <View style={styles.mainContent}>
            <Text style={styles.title}>Pick your path: Creator, Classic, or Arcade. Dive in!</Text>
            <ClassicButton 
              title="Classic"
              screenName="HomePageScreen"
              image={images.classicimg}
            />
            <ArcadeButton
              title="Arcade"
              screenName="HomePageScreen"
              image={images.arcadeimg}
            />
            <CreateQuizzieButton 
              title="Create your own quiz by QUIZZIE BOT"
              screenName="HomePageScreen"
            />

          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.emptyhomeicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.profileicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.trophyicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.settingsicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4%',
  },
  backButton: {
    marginRight: '4%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight > 800 ? hp(3) : 0, // Add some padding for larger devices
  },
  robotContainer: {
    alignItems: 'center',
    marginBottom: '-5%',
  },
  robotImage: {
    width: wp(30),
    height: hp(30),
    aspectRatio: 1,
    marginTop: '2%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    borderRadius: wp(5),
    marginHorizontal: wp(6),
    marginTop: hp(0),
    marginBottom: hp(0),
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontSize: wp(5),
    textAlign: 'center',
    color: '#FFF',
    marginTop:hp(2),
    marginBottom: hp(-1),
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(3),
    paddingHorizontal: '5%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: wp(6),
    height: wp(6),
  },
  footerText: {
    fontSize: wp(3),
    color: '#000',
  },
});

export default ArcadePage;
