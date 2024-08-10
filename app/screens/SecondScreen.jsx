import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../../constants/images'; // Ensure the path is correct
import CustomButton2 from '../components/CustomButton2';
import CustomButton from '../components/CustomButton';
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
      <Image source={images.logo2} style={styles.image} resizeMode="contain" />
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
  image: {
    right:-wp(3),
    width: '80%',
    height:hp(37),
    marginTop:hp(7),
    marginBottom:hp(-5),
    // borderWidth:2
    
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
    fontStyle:"Nunito",
    fontWeight: 'bold',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.01, // Reduce the gap between text and swiper
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FBFCF6',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
    paddingHorizontal: 10, // Creates a line effect
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
});

export default SecondScreen;


