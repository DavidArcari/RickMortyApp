import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'styled-components/native';
import {routingInstrumentation} from '../sentry/setupSentry';
import {CharacterDetailsScreen} from '../../features/characters/screens/CharacterDetailsScreen';
import {CharacterListScreen} from '../../features/characters/screens/CharacterListScreen';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();
  const isDark = theme.colors.background === '#101512';
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    if (routingInstrumentation && navigationRef.current) {
      routingInstrumentation.registerNavigationContainer?.(navigationRef);
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: isDark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.favorite,
        },
        fonts: {
          regular: {fontFamily: 'System', fontWeight: '400'},
          medium: {fontFamily: 'System', fontWeight: '500'},
          bold: {fontFamily: 'System', fontWeight: '700'},
          heavy: {fontFamily: 'System', fontWeight: '800'},
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.text,
          headerStyle: {backgroundColor: theme.colors.surface},
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen
          name="CharacterList"
          component={CharacterListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetailsScreen}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
