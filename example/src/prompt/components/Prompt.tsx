import Constants from 'expo-constants';
import * as React from 'react';
import {Prompt as DefaultPrompt} from 'react-native-openai-jsx';

const completionSettings = {
  max_tokens: 4000,
  apiKey: String(Constants?.expoConfig?.extra?.openAiApiKey),
  model: 'text-davinci-003',
};

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
          'Without any supporting commentary, create a React Native function component that may import only from "react" and "react-native" which contains the following content:',
          ...prompt,
        ].join(' ')}
        completionSettings={completionSettings}
      />
    );
  }
);
