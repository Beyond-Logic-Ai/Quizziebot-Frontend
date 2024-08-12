
// export default CreateQuizzieButton;
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CreateQuizzieButton = ({ title, screenName, color }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
        <LinearGradient
          colors={['#FF8A35', '#F17400']}
          style={styles.btn}
        >
          <Text style={styles.title}>
            <Text style={styles.titleBlack}>Create your own quiz{'\n'}</Text>
            <Text style={styles.titleBlack}>by </Text>
            <Text style={styles.titleBlue}>QUIZZIE BOT</Text>
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: wp(62),
    borderRadius: wp(4),
    marginBottom: hp(1),
    marginTop: hp(1.2),
    height: hp(8.8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    
  },
  title: {
    textAlign: 'center', // Center the text
    fontSize: wp(5.5),
    fontFamily: 'Nunito',
  },
  titleBlack: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  titleBlue: {
    color: '#FFF',
    fontFamily: 'NegritaPro',
  },
  btn: {
    width: wp(72),
    height: hp(8.5),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    
    shadowRadius: 3.84,
  },
});

export default CreateQuizzieButton;
