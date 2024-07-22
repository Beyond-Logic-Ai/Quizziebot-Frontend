// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const CreateQuizzieButton = ({ title, screenName }) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.shadowContainer}>
//       <LinearGradient
//         colors={['#FF8A35', '#F17400']} // Define your gradient colors here
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.btn}
//       >
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
//           <Text style={styles.buttonText}>{title}</Text>
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
//     // borderColor:'black',
//     // borderWidth:2
//   },
//   btn: {
//     width: '100%',
//     paddingVertical: hp(1.5),
//     borderRadius: wp(8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: hp(0),
//     marginTop:hp(-1),
//     paddingHorizontal:wp(.6)
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: wp(5),
//     textAlign: 'center',
//     fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
//     fontWeight: '900',
//     lineHeight: wp(8),
//     letterSpacing: 1.2,
//   },
//   button: {
//     width: wp(61.8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3.84,
    
//   },
// });

// export default CreateQuizzieButton;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CreateQuizzieButton = ({ title, screenName }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
      <LinearGradient
        colors={['#FF8A35', '#F17400']} // Define your gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.btn}
      >
        
          <Text style={styles.buttonText}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: wp(62),
    borderRadius: wp(4),
    marginBottom: hp(0),
    marginTop: hp(1),
    height:hp(12),
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
   
   
    
  },
  btn: {
    
    width: wp(62),
    height:hp(11),
   
    borderRadius: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button: {
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
   
    
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
    fontStyle: 'normal',
    fontWeight: '800',
     lineHeight: wp(6),
    letterSpacing: 1.0,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
 
});

export default CreateQuizzieButton;
