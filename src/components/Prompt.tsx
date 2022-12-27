import * as React from 'react';
import {
  StyleProp,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import {createWormhole} from 'react-native-wormhole';
// @ts-ignore
import * as Babel from '@babel/standalone';

import {useCompletion} from '../hooks';

const {Wormhole: DefaultWormhole} = createWormhole({
  global: {
    require: (moduleId: string) => {
      if (moduleId === 'react') {
        return require('react');
      } else if (moduleId === 'react-native') {
        return require('react-native');
      }
      return null;
    },
  },
  verify: () => Promise.resolve(true),
});

function Prompt<T>({
  completionSettings,
  style,
  debug = false,
  extraProps,
  Wormhole = DefaultWormhole,
  prompt,
}: {
  readonly prompt?: string;
  readonly completionSettings: Omit<Parameters<typeof useCompletion>[0], 'prompt'>;
  readonly style?: StyleProp<ViewStyle>;
  readonly debug?: boolean;
  readonly extraProps?: T;
  readonly Wormhole?: ReturnType<typeof createWormhole>['Wormhole'];
}): JSX.Element {

  const {completion, error} = useCompletion({...completionSettings, prompt});

  const choice = completion?.choices?.[0]?.text || "import * as React from 'react'; export default React.Fragment;";

  const onError = React.useCallback(() => undefined, []);

  return (
    <View style={style}>
      <View style={StyleSheet.absoluteFill}>
        <Wormhole
          {...extraProps}
          source={Babel.transform(choice, { presets: ['es2015', 'react'] }).code}
          dangerouslySetInnerJSX
          onError={onError}
        />
        {Boolean(debug) && !!(choice || error) && (
          <ScrollView style={StyleSheet.absoluteFill}>
            <Text children={choice || String(error)} />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

export default React.memo(Prompt);
