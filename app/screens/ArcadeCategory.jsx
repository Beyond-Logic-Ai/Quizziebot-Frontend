import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Science', colors: ['#FFD540', '#FFA800'] },
  { name: 'Math', colors: ['#AEFF6E', '#1ABD00'] },
  { name: 'Social', colors: ['#FFA767', '#F17400'] },
  { name: 'Technology', colors: ['#FF738D', '#FF3156'] },
  { name: 'Movies', colors: ['#AB68FF', '#7A12FF'] },
];

const CategoryButton = ({ name, colors, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <LinearGradient colors={colors} style={styles.button}>
      <Text style={styles.buttonText}>{name}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const ArcadeCategory = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          </View>
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
        <Text style={styles.subtitle}>Choose your category{'\n'}Explore!</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.buttonWrapper}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                name={category.name}
                colors={category.colors}
                onPress={() => navigation.navigate('ArcadeModes', { category: category.name })} // Pass category
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0048BF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
   
  },
 
  title: {
    fontSize: wp(9),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    color: '#fff',
    marginVertical: 10,
    marginBottom: hp(5),
  },
  robotImageContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(4.5),
    bottom: wp(6),
  },
  robotImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: wp(5),
    color: '#fff',
    textAlign: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(2),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  mainContent: {
    flex: 0.75,
    width: wp(78),
    height: "50%",
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    borderRadius: 15,
  },
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
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
});

export default ArcadeCategory;
