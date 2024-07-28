// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { images } from '../../constants/images'; // Import your images

// const ClassicButton = ({ title, screenName, image }) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.shadowContainer}>
//       <LinearGradient
//         colors={['#FFC107', '#FF5722']} // Define your gradient colors here
//         start={{ x: 1, y: 5 }}
//         end={{ x: 4, y: 1 }}
//         style={styles.btn}
//       >
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
//           <View style={styles.content}>
//             <Image source={image} style={styles.buttonImage} />
//             <Text style={styles.buttonText}>{title}</Text>
//           </View>
//         </TouchableOpacity>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   shadowContainer: {
//     width: '100%',
//     borderRadius: wp(10),
//     marginBottom: hp(1),
//     marginTop: hp(2),
//     alignItems: 'center',
//     justifyContent: 'center',
//     // iOS shadow properties
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.6,
//     shadowRadius: 8,
//   },
//   btn: {
//     width: '100%',
//     paddingVertical: hp(0),
//     borderRadius: wp(10),
//     alignItems: 'center',
//     backgroundColor: '#FFC107',
//     marginBottom: hp(-1),
//   },
//   button: {
//     width: '100%',
//     shadowColor: '#000',
//     paddingHorizontal:wp(18),
//     shadowOffset: { width: 4, height: 7 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3.84,
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: wp(5),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
//     fontStyle: 'normal',
//     fontWeight: '800',
//     lineHeight: wp(6),
//     letterSpacing: 1.2,
//   },
//   buttonImage: {
//     width: wp(15),
//     height: hp(7),
//     marginLeft: -wp(7), // Adjust the spacing as needed
//   },
// });

// export default ClassicButton;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { images } from '../../constants/images'; // Import your images

const ClassicButton = ({ title, screenName, image }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
      <LinearGradient
        colors={['#FFC107', '#FF5722']} // Define your gradient colors here
        start={{ x: .5, y: .3 }}
        end={{ x: .5, y: 1.8 }}
        style={styles.btn}
      >
        
          <View style={styles.content}>
            <Image source={image} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        
      </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // 
  shadowContainer: {
    width: wp(62),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
    marginTop: hp(1),
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    
    borderRadius: wp(10),
  },
  btn: {
    width: wp(62),
    height:hp(7),
    paddingHorizontal:hp(8.5),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderRadius: wp(10),
    overflow: 'hidden',
    
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp(5),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: wp(8),
    letterSpacing: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  buttonImage: {
    marginTop: 10,
    width: wp(15),
    height: hp(7),
    marginLeft: -wp(7),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5, // Adjust the spacing as needed
  },
});

export default ClassicButton;
