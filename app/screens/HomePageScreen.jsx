import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants/images';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const { width, height } = Dimensions.get('window');

const HomePageScreen = ({ navigation }) => {
  return (
    
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover">
      <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
          <Image
            source={images.profileImage} // Replace with your profile image source
            style={styles.profileImage}
          />
          <Text style={styles.username}>Shiva Nagendra</Text>
          <View style={styles.coinBadgeContainer}>
            <View style={styles.coinContainer}>
              <Image
                source={images.profileImage} // Replace with your coin image source
                style={styles.coinImage}
              />
              <Text style={styles.coinText}>301</Text>
            </View>
            <Image
              source={images.badgeImage} // Replace with your badge image source
              style={styles.badgeImage}
            />
          </View>
          <Icon name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
        </View>

        <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover">
          <View style={styles.body}>
            <View style={styles.textBox}>
              <Text style={styles.subtitle}>Unleash the power of AI! Discover quizzes made just for you</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ArcadePage')}>
                <Text style={styles.buttonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* <View style={styles.footer}>
          <TouchableOpacity>
            <View style={[styles.footerItem, styles.activeFooterItem]}>
              <Icon name="home" size={28} color="#35383F" />
              <Text style={[styles.footerText, styles.activeFooterText]}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="person-outline" size={28} color="#000" />
              <Text style={styles.footerText}>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="trophy-outline" size={28} color="#000" />
              <Text style={styles.footerText}>Leaderboard</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsHomePageScreen')}>
            <View style={styles.footerItem}>
              <Icon name="settings-outline" size={28} color="#000" />
              <Text style={styles.footerText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        
      
    </SafeAreaView>
    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.homeicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.profileicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={images.trophyicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SettingsHomePageScreen')}>
          <Image source={images.settingsicon} style={styles.footerIcon} />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0044F2',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)', // Slightly transparent background to show underlying image
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    flex: 1,
    marginLeft: 16,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  coinImage: {
    width: 24,
    height: 24,
  },
  coinText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  badgeImage: {
    width: 37,
    height: 37,
  },
  notificationIcon: {
    marginLeft: 16,
    color: '#FFFFFF',
  },
  overlayImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Slightly transparent box background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20, // Adjust this value to position the box near the footer
  },
  subtitle: {
    fontSize: 20, // Increased font size
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#366EFF',
    paddingVertical: 14, // Increased padding
    paddingHorizontal: 40, // Increased padding
    borderRadius: 27,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // footer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   paddingVertical: 12,
  //   backgroundColor: '#FFF',
  //   paddingBottom: 20, // Add extra padding for safe area
  // },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(3.5),
    borderTopRightRadius: wp(3.5),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(3),
    paddingHorizontal: '5%',
  },
  footerButton: {
    alignItems: 'center',
  },
  // footerItem: {
  //   alignItems: 'center',
  // },
  // footerText: {
  //   fontSize: 12,
  // },
  footerText: {
    fontSize: wp(3),
    color: '#000',
  },
  footerIcon: {
    width: 32,
    height: 32,
  },
  // activeFooterItem: {
  //   borderTopWidth: 0,
  //   borderTopColor: '#0044F2',
  // },
  // activeFooterText: {
  //   color: '#35383F',
  // },
});

export default HomePageScreen;