import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../../constants/images'; // Ensure the path is correct
import CustomButton2 from '../components/CustomButton2';
import CustomButton from '../components/CustomButton';

const slides = [
  { text: 'Experience dynamic quizzes powered by AI. Learn and have fun with interactive challanges anytime,anywhere!' },
  { text: 'Our AI-curated quizzes adapt to ypur learning style, making every session fun. Discover something new every day.' },
  { text: 'Take on your friends with AI-enhanced quizzes and see who can climb teh leaderboard.Learning is more fun together!' },
];

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={images.logo2} style={styles.image} resizeMode="contain" />
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
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
      <CustomButton2 
       title="GET STARTED"
      />
      <CustomButton
      title="I ALREADY HAVE AN ACCOUNT"
      screenName="Third"
      />
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C58F2',
    alignItems: 'center',
    paddingTop: 92,
  },
  image: {
    width: 297,
    height: 387,
  },
  swiperContainer: {
    height: 150,
    width: '100%',
    marginTop: 20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#FBFCF6',
    textAlign: 'center',
    fontWeight: 'bold',
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
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#FBFCF6',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#1C58F2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondScreen;

