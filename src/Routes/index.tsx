import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import List from '../screens/list';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='List'>
        <Stack.Screen 
         name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

