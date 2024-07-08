import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants/images';

const SignUpSuccessScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomePageScreen');
      // navigation.replace('AfterSignedScreen');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Image
          source={images.logosuccess} // Replace with your bot logo path
          style={styles.logo}
        />
        <Text style={styles.successText}>Successful</Text>
        <Text style={styles.infoText}>
          Please wait a moment we are {'\n'}
          preparing for you...
        </Text>
        <LottieView
          source={images.logoloading} // Replace with your loading animation file
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C58F2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
});

export default SignUpSuccessScreen;


// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Image, Modal } from 'react-native';
// import LottieView from 'lottie-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { images } from '../../constants/images';

// const SignUpSuccessScreen = ({ visible }) => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('AfterSignedScreen');
//     }, 3000); // 3 seconds delay

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//     >
//       <View style={styles.overlay}>
//         <View style={styles.popup}>
//           <Image
//             source={images.logosuccess} // Replace with your bot logo path
//             style={styles.logo}
//           />
//           <Text style={styles.successText}>Successful</Text>
//           <Text style={styles.infoText}>
//             Please wait a moment we are {'\n'}
//             preparing for you...
//           </Text>
//           <LottieView
//             source={images.logoloading} // Replace with your loading animation file
//             autoPlay
//             loop
//             style={styles.loadingAnimation}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   popup: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     marginBottom: 20,
//   },
//   successText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1C58F2',
//     marginBottom: 10,
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   loadingAnimation: {
//     width: 100,
//     height: 100,
//   },
// });

// export default SignUpSuccessScreen;



