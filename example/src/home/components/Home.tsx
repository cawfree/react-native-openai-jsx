import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Prompt} from '../../prompt';

export const Home = React.memo(function Home(): JSX.Element {
  const onPressUsingSVGs = React.useCallback(() => {
    console.warn('hihihih');
  }, []);

  return (
    <Prompt
      key={Math.random()}
      style={StyleSheet.absoluteFill}
      extraProps={React.useMemo(() => ({
        onPressUsingSVGs,
      }), [onPressUsingSVGs])}
      prompt={[
        "A professional screen that uses a gothy color palette.",
        "A title which says \"Using OpenAI in React Native\"",
        "A medium-length description about how OpenAI can be used to create dynamic React Native layouts.",
        "Also it should fade in opacity when the component is mounted.",
      ]}
    />
  );
});
