import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Home} from '../../home';

import {AppNavigatorStackParamList, Route} from '../@types';

const RootStack = createStackNavigator<AppNavigatorStackParamList>();

export default React.memo(function AppNavigator(): JSX.Element {
  return (
    <RootStack.Navigator initialRouteName={Route.HOME}>
      <RootStack.Screen
        name={Route.HOME}
        component={Home}
        options={{title: '🤖'}}
      />
    </RootStack.Navigator>
  );
});
