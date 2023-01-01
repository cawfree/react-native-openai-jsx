import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Prompt} from '../../prompt';

export const Home = React.memo(function Home(): JSX.Element {
  const onPressCallback = React.useCallback(() => {
    console.warn('hihihih');
  }, []);

  return (
    <Prompt
      style={StyleSheet.absoluteFill}
      extraProps={React.useMemo(() => ({
        onPressCallback,
      }), [onPressCallback])}
      prompt={[
        "A professional screen.",
        "A title which says \"Using OpenAI in React Native\"",
        "A small description about how OpenAI can be used to create dynamic React Native layouts.",
        "It should render a button with the title \"Callback\" which is passed the prop \"onPressCallback\"",
        "Also it should fade in opacity.",
      ]}
    />
  );
});
