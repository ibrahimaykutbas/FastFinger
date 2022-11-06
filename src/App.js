import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import LottieView from 'lottie-react-native';

const App = () => {
  const [user1, setUser1] = useState(2);
  const [user2, setUser2] = useState(2);
  const [user1Position, setUser1Position] = useState(null);
  const [user2Position, setUser2Position] = useState(null);
  const [winner, setWinner] = useState(null);

  const setScore = user => {
    if (user1Position == 0 || user2Position == 0) {
      getWin();
    } else {
      if (user === 'user1') {
        setUser1(user1 + 0.3);
        setUser2(user2 - 0.3);
      } else {
        setUser2(user2 + 0.3);
        setUser1(user1 - 0.3);
      }
    }
  };

  const getWin = () => {
    if (user1Position === 0) {
      setWinner('User 2');
    } else {
      setWinner('User 1');
    }
  };

  const RenderBox = ({ score, setScore, user }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={setScore}
        style={{ flex: score }}>
        <View
          style={styles.box}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            if (user === 'user1') {
              setUser1Position(layout.height);
            } else {
              setUser2Position(layout.height);
            }
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderBox
        backgroundColor="white"
        score={user1}
        setScore={() => setScore('user1')}
        user={'user1'}
      />

      <View style={styles.line} />

      <RenderBox
        backgroundColor="white"
        score={user2}
        setScore={() => setScore('user2')}
        user={'user2'}
      />

      {winner ? (
        <View
          style={[
            styles.winner,
            { transform: [{ rotate: winner === 'User 1' ? '180deg' : '0deg' }] }
          ]}>
          <LottieView source={require('./win.json')} autoPlay loop />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    flex: 1,
    backgroundColor: 'white'
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  },
  winner: {
    width: '100%',
    height: '10%',
    position: 'absolute',
    top: '50%'
  },
  text: {
    fontSize: 30,
    color: 'red'
  }
});
