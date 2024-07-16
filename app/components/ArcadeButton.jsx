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
      <LinearGradient
        colors={['#9DFF4F', '#1ABD00']} // Define your gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.btn}
      >
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
          <View style={styles.content}>
            <Image source={image} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: '100%',
    borderRadius: wp(10),
    marginBottom: hp(1),
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
   
  },
  btn: {
    width: '100%',
    paddingVertical: hp(0),
    borderRadius: wp(10),
    alignItems: 'center',
    backgroundColor: '#8BC34A',
  },
  button: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    paddingHorizontal:wp(18)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp(5),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: wp(8),
    letterSpacing: 1.2,
  },
  buttonImage: {
    margintop:10,
    width: wp(14),
    height: hp(7),
    marginLeft: -wp(7), // Adjust the spacing as needed
  },
});

export default ArcadeButton;