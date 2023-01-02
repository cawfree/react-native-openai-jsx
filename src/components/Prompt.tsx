import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
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

const shouldTranspile = (src: string) =>
  Babel.transform(src, { presets: ['es2015', 'react'] }).code;

function Prompt<T>({
  completionSettings,
  style,
  debug = false,
  extraProps,
  Wormhole = DefaultWormhole,
  prompt,
  onError = console.error,
  defaultModule = "import * as React from 'react'; export default React.Fragment;",
  renderLoading,
}: {
  readonly prompt?: string;
  readonly completionSettings: Omit<Parameters<typeof useCompletion>[0], 'prompt'>;
  readonly style?: StyleProp<ViewStyle>;
  readonly debug?: boolean;
  readonly extraProps?: T;
  readonly Wormhole?: ReturnType<typeof createWormhole>['Wormhole'];
  readonly onError?: (e: unknown) => void;
  readonly defaultModule?: string;
  readonly renderLoading?: () => JSX.Element;
}): JSX.Element {

  const {
    loading,
    completion,
    error: maybeCompletionError,
  } = useCompletion({...completionSettings, prompt});

  const maybeChoice = completion?.choices?.[0]?.text;

  const {
    choice,
    source,
    error: maybeTranspileError,
  } = React.useMemo(() => {
    try {
      if (maybeCompletionError) throw maybeCompletionError;

      if (typeof maybeChoice !== 'string' || !maybeChoice.length)
        return {choice: defaultModule, source: shouldTranspile(defaultModule), error: undefined};

      return {
        choice: maybeChoice,
        source: shouldTranspile(maybeChoice),
        error: undefined,
      };
    } catch (cause) {
      return {
        choice: defaultModule,
        source: shouldTranspile(defaultModule),
        // @ts-expect-error versioning
        error: new Error('Failed to transpile module.', {cause}),
      };
    }
  }, [maybeChoice, maybeCompletionError, defaultModule]);

  React.useEffect(() => {
    if (!debug) return;
    choice && console.warn(choice);
  }, [debug, choice]);

  React.useEffect(() => {
    maybeTranspileError && console.error(maybeTranspileError);
  }, [maybeTranspileError]);

  React.useEffect(() => {
    if (!debug) return;
    source && console.warn(source);
  }, [debug, source]);

  return (
    <View style={style}>
      <View style={StyleSheet.absoluteFill}>
        {loading
          ? renderLoading?.() || null
          : (
            <Wormhole
              {...extraProps}
              source={source}
              dangerouslySetInnerJSX
              onError={onError}
              renderLoading={renderLoading}
            />
          )}
      </View>
    </View>
  );
}

export default React.memo(Prompt);
