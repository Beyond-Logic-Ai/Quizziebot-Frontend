import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants/images';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Disable back gesture and back button
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => null,
    });

    const loadQuestions = async () => {
      try {
        // Simulate loading questions with a timeout
        Animated.timing(progress, {
          toValue: 1,
          duration: 2000, // 2 seconds
          useNativeDriver: false,
        }).start(() => {
          navigation.navigate('QuizQuestionScreen'); // Navigate to the questions screen after loading
        });
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };

    loadQuestions();
  }, [navigation]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Classic</Text>
        <Image source={images.logo1} style={styles.robotImage} />
        <Text style={styles.description}>
          Our AI-curated quizzes adapt to your learning style, making every session fun. Discover something new every day.
        </Text>
        <View style={styles.dotContainer}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0057FF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: hp('5%'),
  },
  robotImage: {
    width: wp('50%'),
    height: hp('30%'),
    resizeMode: 'contain',
    marginBottom: hp('5%'),
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: hp('2%'),
  },
  progressBarContainer: {
    width: wp('80%'),
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFAA00',
  },
});

export default LoadingScreen;
