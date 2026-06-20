import React from 'react';
import {AppProviders} from './src/app/AppProviders';
import {RootNavigator} from './src/app/navigation/RootNavigator';

function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

export default App;
