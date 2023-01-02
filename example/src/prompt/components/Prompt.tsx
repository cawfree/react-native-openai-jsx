import Constants from 'expo-constants';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Prompt as DefaultPrompt} from 'react-native-openai-jsx';
import {createWormhole} from 'react-native-wormhole';

const completionSettings = {
  max_tokens: 4000,
  apiKey: String(Constants?.expoConfig?.extra?.openAiApiKey),
  model: 'text-davinci-003',
};

const {Wormhole} = createWormhole({
  global: {
    require: (moduleId: string) => {
      if (moduleId === 'react') {
        return require('react');
      } else if (moduleId === 'react-native') {
        return require('react-native');
      } else if (moduleId === 'react-native-svg') {
        return require('react-native-svg');
      }
      return null;
    },
  },
  verify: async () => true,
});

export const Prompt = React.memo(
  function Prompt({
    prompt,
    ...extraProps
  }: Omit<Parameters<typeof DefaultPrompt>[0], 'completionSettings' | 'prompt'> & {
    readonly prompt: readonly string[];
  }): JSX.Element {
    return (
      <DefaultPrompt
        {...extraProps}
        prompt={[
          `Without any supporting commentary, create a React Native function component that may only import from "react" and "react-native" and include the following content:`,
          ...prompt,
          'Do not include syntax errors.',
        ].join(' ')}
        completionSettings={completionSettings}
        Wormhole={Wormhole}
        renderLoading={React.useCallback(() => (
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <ActivityIndicator />
          </View>
        ), [])}
      />
    );
  }
);

const styles = StyleSheet.create({
  center: {alignItems: 'center', justifyContent: 'center'}
});
