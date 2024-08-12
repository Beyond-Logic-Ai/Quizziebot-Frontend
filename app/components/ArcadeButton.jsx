import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { images } from '../../constants/images'; // Import your images

const ArcadeButton = ({ title, screenName, image }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
        <LinearGradient
          colors={['#9DFF4F', '#1ABD00']} // Define your gradient colors here
          start={{ x: .5, y: .3 }}
          end={{ x: .5, y: 1 }}
          style={styles.btn}
        >
          <View style={styles.content}>
            <Image source={image} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: wp(62),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
    marginTop: hp(1),
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
    borderRadius: wp(10),
  },
  btn: {
    width: wp(62),
    height:hp(7),
    paddingHorizontal:hp(8.5),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderRadius: wp(4),
    overflow: 'hidden',
    
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp(5),
    textAlign: 'center',
    fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
    fontWeight: 'bold',
    lineHeight: wp(8),
    letterSpacing: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.01,
    left:wp(2),
    shadowRadius: 3.84,
  },
  buttonImage: {
    marginTop: 10,
    width: wp(11),
    height: hp(6.5),
    marginLeft: -wp(7),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 4, // Adjust the spacing as needed
  },
});

export default ArcadeButton;

