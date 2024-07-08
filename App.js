// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// // App.js
// import React from 'react';
// import StackNavigator from './navigation/StackNavigator';

// export default function App() {
//   return <StackNavigator />;
// }

// App.jsx
// App.jsx
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import Navigation from './app/Navigation';

export default function App() {
  useEffect(() => {
    // Lock the orientation to portrait
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return <Navigation />;
}



