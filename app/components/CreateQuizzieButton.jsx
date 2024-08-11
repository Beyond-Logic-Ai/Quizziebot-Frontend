import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CreateQuizzieButton = ({ title, screenName,color }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
      <LinearGradient
        colors={['#F27400','#BF5C00' ]} // Define your gradient colors here
        // start={{ x: 0.5, y: 0.15 }}
        // end={{ x: 0.5, y: 0.6 }}
        style={styles.btn}
      >
        
          <Text style={styles.buttonText}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: wp(62),
    borderRadius: wp(4),
    marginBottom: hp(0),
    marginTop: hp(1),
    height:hp(8.8),
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: .3,
    shadowRadius:2,
    // borderColor:'black',
    // borderWidth:2
   
   
    
  },
  btn: {
    
    width: wp(75),
    height: hp(8.5),
   
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:wp(3)
    // borderColor: 'black',
    // borderWidth: 2,
    
  },
  button: {
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
   
    
  },
  buttonText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
    fontWeight: '800',
    lineHeight: hp(3),
    letterSpacing: 1,
    
    
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3.84,
  },
 
});

export default CreateQuizzieButton;
