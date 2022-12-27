# react-native-openai-jsx
⚛️ 🧪 🤖 Use OpenAI to generate functioning [__React Native__](https://reactnative.dev) components!

> ⚠️ This is __super__ experimental! 

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

### 🪄 🐇 Magic

