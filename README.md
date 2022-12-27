# react-native-openai-jsx
⚛️ 🧪 🤖 Use OpenAI to generate functioning [__React Native__](https://reactnative.dev) components! [__See it in action!__](https://twitter.com/cawfree/status/1603234088776867840)

It is possible to use [`react-native-openai-jsx`](https://github.com/cawfree/react-native-openai-jsx) to create real, working React Native applications just by providing some high-level descriptions about what you'd like to see.

For example:

```typescript
<Prompt
  extraProps={React.useMemo(() => ({
    onPress: (message: string) => Alert.alert(message),
  }), [])}
  prompt={[
    'Provide a complete example of a React Native View component which contains a big Button in the center with the text "Press Me".',
    'When the Button is pressed, it must call a function prop passed into the component called onPress with the parameter \"Hello from OpenAI!\".',
  ].join(' ')}
/>
```

It might seem totally crazy, but this actually _works_! By using the [`openai`](https://github.com/openai/openai-node) client library, we can use their sophisticated [__Machine Learning Model__](https://openai.com/blog/chatgpt/) to imagine functional React Native applications for us. At runtime, we can use [`@babel/runtime`](https://github.com/babel/babel/tree/master/packages/babel-runtime) to transpile the auto-generated module into runtime-friendly JavaScript and have this execute on top of a [`react-native-wormhole`](https://github.com/cawfree/react-native-wormhole).

### 🚀 Getting Started

First, you'll need to install `react-native-openai-jsx` and `react-native-url-polyfill`:

```shell
yarn add react-native-openai-jsx react-native-url-polyfill
```

Whilst this is downloading, you'll need to create a client API key for OpenAI if you don't already have one. You can find instructions on how to do this [__here__](https://beta.openai.com/account/api-keys).

> Note: You'll need `react-native-url-polyfill` to enable compatibility with the official [`openai` __SDK__](https://github.com/openai/openai-node).


Next, at the root of your application [__import the polyfills__]() to the entry point of your application, i.e.:

```diff
+ import 'react-native-url-polyfill/auto';

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

That should be everything!

To see this all come together, you are free to try out the [`example`](./example) app:

```
cd example/
OPENAI_API_KEY="<your-api-key>" yarn (ios|android|web)
```

### ✌️ License
[__MIT__](./LICENSE)
