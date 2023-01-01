import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {Prompt} from '../../prompt';

export const Home = React.memo(function Home(): JSX.Element {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Prompt
        style={StyleSheet.absoluteFill}
        prompt={["An empty blue screen with some text in the middle that says \"Home 🏡\"."]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {backgroundColor: 'blue'},
})
