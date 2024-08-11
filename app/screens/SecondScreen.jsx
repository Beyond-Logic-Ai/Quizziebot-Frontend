import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../../constants/images'; // Ensure the path is correct
import CustomButton2 from '../components/CustomButton2';
import CustomButton from '../components/CustomButton';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const slides = [
  { text: 'Experience dynamic quizzes powered by AI. Learn and have fun with interactive challenges anytime, anywhere!' },
  { text: 'Our AI-curated quizzes adapt to your learning style, making every session fun. Discover something new every day.' },
  { text: 'Take on your friends with AI-enhanced quizzes and see who can climb the leaderboard. Learning is more fun together!' },
];

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.botImageContainer}>
          <Svg height="70%" width="70%" viewBox="0 0 100 100" style={styles.gradient}>
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                r="50%"
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset="0%" stopColor="#FBFCF6" stopOpacity=".5" />
                <Stop offset="100%" stopColor="#1C58F2" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
          </Svg>
          <Image source={images.logo2} style={styles.image} resizeMode="contain" />
        </View>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay
          autoplayTimeout={3}
          loop
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
        >
          {slides.map((slide, index) => (
            <View style={styles.slide} key={index}>
              <Text style={styles.text}>{slide.text}</Text>
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton2 
          title="GET STARTED"
          screenName="CreateAnAccountScreen1" // Update this to the correct screen name
        />
        <CustomButton
          title="I ALREADY HAVE AN ACCOUNT"
          screenName="SignInFirst"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C58F2',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  botImageContainer: {
    width: wp(90), // Ensure square dimensions for perfect circle
    height: wp(90), // Use widthPercentageToDP for responsive sizing
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:wp(15),
    // marginVertical: height * 0.05,
    position: 'relative',
    overflow: 'hidden',
    
    top:wp(9)
    

  },
  gradient: {
    position: 'absolute',
    top:hp(7),
    
    
  },
  image: {
    width: wp(90), // Adjust this to fit the image within the circle
    height: wp(90),
    resizeMode: 'contain',
    
    left:wp(2)
    
  },
  swiperContainer: {
    height: height * 0.25,
    width: '100%',
  },
  wrapper: {
    
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: height > 800 ? 20 : 16, // Larger text for larger screens
    color: '#FBFCF6',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.01, // Reduce the gap between text and swiper
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: wp(2),
    height: wp(2),
    borderRadius: wp(2),
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FBFCF6',
    width: wp(2),
    height: wp(2),
    borderRadius: wp(2),
    margin: 3,
    paddingHorizontal: 10, // Creates a line effect
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.07,
   
  },
});

export default SecondScreen;


