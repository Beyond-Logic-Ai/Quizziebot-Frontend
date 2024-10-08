import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import LetsGobutton from '../components/LetsGobutton';
import { images } from '../../constants/images';
import Icon from 'react-native-vector-icons/Ionicons';

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
    iconName: 'sun',
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
    iconName: 'lightning-bolt-outline',
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

const CreatingOwnQuizPage = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scroll = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    };

    const interval = setInterval(scroll, 2000); // Slow down the interval time

    return () => clearInterval(interval);
  }, []);

  const renderIcon = (iconSet, iconName) => {
    switch (iconSet) {
      case 'Feather':
        return <Feather name={iconName} size={wp(6)} color="#fff" style={styles.icon} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={wp(6)} color="#fff" style={styles.icon} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={wp(6)} color="#fff" style={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={wp(6)} color="#FFF" />
          </TouchableOpacity>
        </View>
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
      <Text style={styles.title}>Welcome to {'\n'}Quizzie Bot</Text>
      <Text style={styles.subtitle}>Ask anything, get your answer</Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {data.map((item, index) => (
          <View key={item.id} style={[styles.slide, { width }]}>
            {renderIcon(item.iconSet, item.iconName)}
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.content.map((text, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
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
        screenName="OwnQuizWelcomePage"
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: hp(2),
    paddingBottom: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    
  },
  robotImageContainer: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  robotImage: {
    position: 'absolute',
    width: hp(18),
    height: hp(18),
    resizeMode: 'contain',
  },
  title: {
    bottom: hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: hp(3.5),
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    top: hp(1),
    fontSize: hp(2.3),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
  slide: {
    alignItems: 'center',
    marginTop: hp(4),
  },
  icon: {
    marginTop: hp(0.8),
    marginBottom: hp(0.8),
  },
  sectionTitle: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp(1),
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: hp(1),
    padding: hp(1.5),
    marginVertical: hp(0.6),
    width: hp(35),
    height: hp(8),
  },
  text: {
    color: '#fff',
    fontSize: hp(1.8),
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(4.5),
  },
  indicator: {
    width: hp(4),
    height: hp(0.2),
    borderRadius: wp(0.5),
    backgroundColor: '#888',
    marginHorizontal: wp(1),
  },
  activeIndicator: {
    backgroundColor: '#FFF',
  },
});

export default CreatingOwnQuizPage;
