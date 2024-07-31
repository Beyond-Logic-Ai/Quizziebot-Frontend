// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { images } from '../../constants/images'; // Ensure this path is correct
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
// import LetsGobutton from '../components/LetsGobutton';

// const { width, height } = Dimensions.get('window');

// const data = [
//   {
//     id: '1',
//     title: 'Examples',
//     content: [
//       '“Explain quantum computing in \n simple terms”',
//       '“Got any creative ideas for a 10-year \n old’s birthday?”',
//       '“How do I make an HTTP request in \n Javascript?”',
//     ],
//   },
//   {
//     id: '2',
//     title: 'Capabilities',
//     content: [
//       'Remembers what user said earlier \n in the conversation',
//       'Allows user to provide follow-up \n corrections',
//       'Trained to decline inappropriate \n requests',
//     ],
//   },
//   {
//     id: '3',
//     title: 'Limitations',
//     content: [
//       'May occasionally generate incorrect \n information',
//       'May occasionally produce harmful \n instructions or biased content',
//       'Limited knowledge of world and \n events after 2021',
//     ],
//   },
// ];

// const CreatingOwnQuizPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % data.length;
//         flatListRef.current.scrollToIndex({ index: nextIndex });
//         return nextIndex;
//       });
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const onScrollEnd = (event) => {
//     const horizontalOffset = event.nativeEvent.contentOffset.x;
//     const index = Math.round(horizontalOffset / width);
//     setCurrentIndex(index);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
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
//       <Text style={styles.title}>Welcome to {'\n'} Quzzie Bot</Text>
//       <Text style={styles.subtitle}>Ask anything, get your answer</Text>

//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.slide}>

//             <Text style={styles.sectionTitle}>{item.title}</Text>
//             {item.content.map((text, index) => (
//               <View key={index} style={styles.textContainer}>
//                 <Text style={styles.text}>{text}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//         onMomentumScrollEnd={onScrollEnd}
//         ref={flatListRef}
//       />
//       <View style={styles.indicatorContainer}>
//         {data.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.indicator,
//               currentIndex === index && styles.activeIndicator,
//             ]}
//           />
//         ))}
//       </View>
//       <LetsGobutton
//         title="Let's Go"
//         screenName="HomePageScreen"
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0048BF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   robotImageContainer: {
//     width: wp(30),
//     height: wp(30),
//     borderRadius: wp(17.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(5),
//     top: hp(3),
//   },
//   robotImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   title: {
//     bottom: hp(1),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//     fontSize: wp(7),
//     fontWeight: 'bold',
//     color: '#fff',
    
//   },
//   subtitle: {
//     top: hp(1),
//     fontSize: wp(4),
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//   },
//   slide: {
//     width: width,
//     height: hp(40),
//     alignItems: 'center',
//     padding: 20,
//     top: hp(3.5),
//     // borderColor:"black",
//     // borderWidth:2
//   },
//   sectionTitle: {
//     fontSize: wp(4),
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   textContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.08)',
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 5,
//     width: width * 0.8,
//     // borderColor:"black",
//     // borderWidth:2
//   },
//   text: {
//     color: '#fff',
//     fontSize: wp(3),
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//   },
//   indicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom:hp(4)
//   },
//   indicator: {
//     width: wp(6),
//     height: 2,
//     borderRadius: 2,
//     backgroundColor: '#888',
//     marginHorizontal: 4,
//   },
//   activeIndicator: {
//     backgroundColor: '#FFF',
//   },
// });

// export default CreatingOwnQuizPage;
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions ,Image} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';  // Importing Material Icons
// import LetsGobutton from '../components/LetsGobutton';
// import { images } from '../../constants/images';

// const { width } = Dimensions.get('window');

// const data = [
//   {
//     id: '1',
//     title: 'Examples',
//     content: [
//       '“Explain quantum computing in \n simple terms”',
//       '“Got any creative ideas for a 10-year \n old’s birthday?”',
//       '“How do I make an HTTP request in \n Javascript?”',
//     ],
//     icon: 'sun', // MaterialIcons icon name
//   },
//   {
//     id: '2',
//     title: 'Capabilities',
//     content: [
//       'Remembers what user said earlier \n in the conversation',
//       'Allows user to provide follow-up \n corrections',
//       'Trained to decline inappropriate \n requests',
//     ],
//     icon: 'build', // MaterialIcons icon name
//   },
//   {
//     id: '3',
//     title: 'Limitations',
//     content: [
//       'May occasionally generate incorrect \n information',
//       'May occasionally produce harmful \n instructions or biased content',
//       'Limited knowledge of world and \n events after 2021',
//     ],
//     icon: 'warning', // MaterialIcons icon name
//   },
// ];

// const CreatingOwnQuizPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % data.length;
//         flatListRef.current.scrollToIndex({ index: nextIndex });
//         return nextIndex;
//       });
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const onScrollEnd = (event) => {
//     const horizontalOffset = event.nativeEvent.contentOffset.x;
//     const index = Math.round(horizontalOffset / width);
//     setCurrentIndex(index);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
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
//       <Text style={styles.title}>Welcome to {'\n'} Quzzie Bot</Text>
//       <Text style={styles.subtitle}>Ask anything, get your answer</Text>

//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.slide}>
//             {/* The icon component should not directly contain text content outside the <Text> */}
//             <Feather name={item.icon} size={40} color="#fff" style={styles.icon} />
//             <Text style={styles.sectionTitle}>{item.title}</Text>
//             {item.content.map((text, index) => (
//               <View key={index} style={styles.textContainer}>
//                 <Text style={styles.text}>{text}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//         onMomentumScrollEnd={onScrollEnd}
//         ref={flatListRef}
//       />
//       <View style={styles.indicatorContainer}>
//         {data.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.indicator,
//               currentIndex === index && styles.activeIndicator,
//             ]}
//           />
//         ))}
//       </View>
//       <LetsGobutton
//         title="Let's Go"
//         screenName="HomePageScreen"
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0048BF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   robotImageContainer: {
//     width: wp(30),
//     height: wp(30),
//     borderRadius: wp(17.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(5),
//     top: hp(3),
//   },
//   robotImage: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         resizeMode: 'contain',
//       },
//   title: {
//     bottom: hp(1),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//     fontSize: wp(7),
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     top: hp(1),
//     fontSize: wp(4),
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//   },
//   slide: {
//     width: width,
//     height: hp(40),
//     alignItems: 'center',
//     padding: 20,
//     top: hp(3.5),
//   },
//   icon: {
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: wp(4),
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   textContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.08)',
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 5,
//     width: width * 0.8,
//   },
//   text: {
//     color: '#fff',
//     fontSize: wp(3),
//     textAlign: 'center',
//     fontFamily: 'Nunito',
//   },
//   indicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(4),
//   },
//   indicator: {
//     width: wp(6),
//     height: 2,
//     borderRadius: 2,
//     backgroundColor: '#888',
//     marginHorizontal: 4,
//   },
//   activeIndicator: {
//     backgroundColor: '#FFF',
//   },
// });

// export default CreatingOwnQuizPage;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import LetsGobutton from '../components/LetsGobutton';
import { images } from '../../constants/images';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: 'Examples',
    content: [
      '“Explain quantum computing in \n simple terms”',
      '“Got any creative ideas for a 10-year \n old’s birthday?”',
      '“How do I make an HTTP request in \n Javascript?”',
    ],
    iconSet: 'Feather',
    iconName: 'sun', // Feather icon name
  },
  {
    id: '2',
    title: 'Capabilities',
    content: [
      'Remembers what user said earlier \n in the conversation',
      'Allows user to provide follow-up \n corrections',
      'Trained to decline inappropriate \n requests',
    ],
    iconSet: 'MaterialCommunityIcons',
    iconName: 'lightning-bolt-outline', // MaterialIcons icon name
  },
  {
    id: '3',
    title: 'Limitations',
    content: [
      'May occasionally generate incorrect \n information',
      'May occasionally produce harmful \n instructions or biased content',
      'Limited knowledge of world and \n events after 2021',
    ],
    iconSet: 'Ionicons',
    iconName: 'warning-outline', // Ionicons icon name
  },
];

const CreatingOwnQuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        flatListRef.current.scrollToIndex({ index: nextIndex });
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const onScrollEnd = (event) => {
    const horizontalOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / width);
    setCurrentIndex(index);
  };

  const renderIcon = (iconSet, iconName) => {
    switch (iconSet) {
      case 'Feather':
        return <Feather name={iconName} size={30} color="#fff" style={styles.icon} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={40} color="#fff" style={styles.icon} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={40} color="#fff" style={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.title}>Welcome to {'\n'} Quzzie Bot</Text>
      <Text style={styles.subtitle}>Ask anything, get your answer</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {renderIcon(item.iconSet, item.iconName)}
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.content.map((text, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
              </View>
            ))}
          </View>
        )}
        onMomentumScrollEnd={onScrollEnd}
        ref={flatListRef}
      />
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
      <LetsGobutton
        title="Let's Go"
        screenName="HomePageScreen"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0048BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotImageContainer: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
    top: hp(3),
  },
  robotImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    bottom: hp(1),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    top: hp(1),
    fontSize: wp(4),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
  slide: {
    width: width,
    height: hp(40),
    alignItems: 'center',
    padding: 20,
    top: hp(3.5),
  },
  icon: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: width * 0.8,
  },
  text: {
    color: '#fff',
    fontSize: wp(3),
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  indicator: {
    width: wp(6),
    height: 2,
    borderRadius: 2,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFF',
  },
});

export default CreatingOwnQuizPage;
