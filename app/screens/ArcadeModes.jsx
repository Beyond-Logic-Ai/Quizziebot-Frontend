
// import React from 'react';
// import { View, Text, StyleSheet,ScrollView, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { images } from '../../constants/images';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

// const categories = [
//   { name: 'Easy', colors: ['#AEFF6E', '#1ABD00'] },
//   { name: 'Medium', colors: ['#FFD540', '#FFA800'] },
//   { name: 'Hard', colors: ['#CA163C', '#63182F'] },
// //   { name: 'Technology', colors: ['#FF738D', '#FF3156'] },
// //   { name: 'Movies', colors: ['#AB68FF', '#7A12FF'] },
// ];

// const CategoryButton = ({ name, colors, onPress }) => (
//   <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
//     <LinearGradient colors={colors} style={styles.button}>
//       <Text style={styles.buttonText}>{name}</Text>
//     </LinearGradient>
//   </TouchableOpacity>
// );

// const ArcadeModes = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Arcade</Text>
//       <View style={styles.robotImageContainer}>
//         <Svg height="100%" width="100%" viewBox="0 0 100 100">
//           <Defs>
//             <RadialGradient
//               id="grad"
//               cx="50%"
//               cy="50%"
//               rx="50%"
//               ry="50%"
//               fx="50%"
//               fy="50%"
//               gradientUnits="userSpaceOnUse"
//             >
//               <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
//               <Stop offset="100%" stopColor="#0048BF" stopOpacity="1" />
//             </RadialGradient>
//           </Defs>
//           <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
//         </Svg>
//         <Image source={images.logo2} style={styles.robotImage} />
//       </View>
//       <View style={styles.mainContent}>
//       <Text style={styles.subtitle}>Choose your level!</Text>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <View style={styles.buttonWrapper}>
//         {categories.map((category, index) => (
//           <CategoryButton
//             key={index}
//             name={category.name}
//             colors={category.colors}
//             onPress={() => console.log(`${category.name} selected`)} // Replace with navigation logic
//           />
//         ))}
//       </View>
//       </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#0048BF',
//   },
//   title: {
//     fontSize: wp(9),
//     fontWeight: 'bold',
//     fontFamily: 'Nunito',
//     color: '#fff',
//     marginVertical: 10,
//     marginBottom: hp(4), // Adjust spacing as needed
//   },
//   robotImageContainer: {
//     width: wp(35),
//     height: wp(35),
//     borderRadius: wp(17.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 18,
//     bottom:20,
    
//   },
//   robotImage: {
//     position: 'absolute',
//     width: '80%',
//     height: '80%',
//     resizeMode: 'contain',
//   },
//   subtitle: {
//     fontSize: wp(5),
//     color: '#fff',
//     textAlign: 'center',
//     marginTop:hp(3.5),
//     marginBottom:hp(2.7),
//     fontWeight: 'bold',
//     fontFamily: 'Nunito',
//     // borderColor:'black',
//     // borderWidth:2
//   },
//   mainContent:{
//     // flex:.75,
//     width:wp(78),
//     height:hp(40),
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.08)',
//     borderRadius:15,
    
//   },

//   buttonWrapper: {
//     marginTop:30,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     width: '80%',
//     marginVertical: 7,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   button: {
//     padding: 13,
//     alignItems: 'center',
//     borderRadius: 25,
//     marginTop:9
    
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontFamily: 'Nunito',
//   },
// });

// export default ArcadeModes;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const categories = [
  { name: 'Easy', colors: ['#AEFF6E', '#1ABD00'] },
  { name: 'Medium', colors: ['#FFD540', '#FFA800'] },
  { name: 'Hard', colors: ['#CA163C', '#63182F'] },
];

const CategoryButton = ({ name, colors, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={() => onPress(name)}>
    <LinearGradient colors={colors} style={styles.button}>
      <Text style={styles.buttonText}>{name}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const ArcadeModes = ({ navigation }) => {
  const handleCategoryPress = (categoryName) => {
    if (categoryName === 'Hard') {
      // Replace 'HardLevelScreen' with the actual screen name you want to navigate to
      navigation.navigate('ArcadeLoadingScreen');
    } else if(categoryName ==='Medium'){
        navigation.navigate('ArcadeLoadingScreen');
    }else if(categoryName ==='Easy'){
        navigation.navigate('ArcadeLoadingScreen')
    } else{
      console.log(`${categoryName} selected`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arcade</Text>
      <View style={styles.robotImageContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#0048BF" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
        <Image source={images.logo2} style={styles.robotImage} />
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.subtitle}>Choose your level!</Text>
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
          <View style={styles.buttonWrapper}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                name={category.name}
                colors={category.colors}
                onPress={handleCategoryPress}
              />
            ))}
          </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0048BF',
  },
  title: {
    fontSize: wp(9),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    color: '#fff',
    marginVertical: 10,
    marginBottom: hp(4),
  },
  robotImageContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    bottom: 20,
  },
  robotImage: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: wp(5),
    color: '#fff',
    textAlign: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(3.7),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  mainContent: {
    width: wp(78),
    height: hp(40),
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 15,
  },
//   scrollViewContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  buttonWrapper: {
    
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 7,
    borderRadius: 25,
    overflow: 'hidden',
    
  },
  button: {
    padding: 13,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 9,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
});

export default ArcadeModes;
