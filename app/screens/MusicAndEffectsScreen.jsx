
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MusicAndEffectsScreen = ({ navigation }) => {
  const [isMusicEnabled, setMusicEnabled] = useState(true);
  const [isSoundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [isVibrationsEnabled, setVibrationsEnabled] = useState(true);

  return (
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={22}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Music & Effects</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Music</Text>
            <Switch
              value={isMusicEnabled}
              onValueChange={setMusicEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isMusicEnabled ? "#0044F2" : "#f4f3f4"}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Sound Effects</Text>
            <Switch
              value={isSoundEffectsEnabled}
              onValueChange={setSoundEffectsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isSoundEffectsEnabled ? "#0044F2" : "#f4f3f4"}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Vibrations</Text>
            <Switch
              value={isVibrationsEnabled}
              onValueChange={setVibrationsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isVibrationsEnabled ? "#0044F2" : "#f4f3f4"}
            />
          </View>
        </View>
      </SafeAreaView>
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomePageScreen')}>
          <SimpleLineIcons name="home" style={styles.footerIcon} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="person-outline" style={styles.footerIcon} />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="trophy-outline" style={styles.footerIcon} />
          <Text style={styles.footerText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="options" style={styles.footerIcon} />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: hp(2),
   
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    marginLeft:wp(10),
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: hp(4),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(4),
    paddingHorizontal: '5%',
  },
  footerIcon: {
    fontSize:32,
   },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp(3),
    color: '#000',
    fontFamily: 'Nunito',
  },
});

export default MusicAndEffectsScreen;
