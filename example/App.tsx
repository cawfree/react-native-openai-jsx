import 'react-native-url-polyfill/auto';

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, View } from 'react-native';
import Constants from 'expo-constants';
import {Prompt} from 'react-native-openai-jsx';

export default function App() {
  return (
    <>
      <Prompt
          style={[StyleSheet.absoluteFill, styles.white]}
        completionSettings={React.useMemo(() => ({
          max_tokens: 4000,
          apiKey: String(Constants?.expoConfig?.extra?.openAiApiKey),
          model: 'text-davinci-003',
        }), [])}
        extraProps={React.useMemo(() => ({
          onPress: (message: string) => Alert.alert(message),
        }), [])}
        prompt={[
          'Provide a complete example of a React Native View component which contains a big Button in the center with the text "Press Me".',
          'When the Button is pressed, it must call a function prop passed into the component called onPress with the parameter \"Hello from OpenAI!\".',
        ].join(' ')}
      />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
});
