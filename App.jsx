import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import { Block, Text } from './components';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Navigation from './navigation';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };
 
  componentDidMount() {
    SplashScreen.preventAutoHideAsync()
      .then(() => this._loadResourcesAsync())
      .catch((error) => console.warn(error));
  }

  _loadResourcesAsync = async () => {
    try {
      await this._handleResourcesAsync();
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ isLoadingComplete: true }, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };

  _handleResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'Rubik-Regular': require('./assets/fonts/rubik/Rubik-Regular.ttf'),
        'Rubik-Black': require('./assets/fonts/rubik/Rubik-Black.ttf'),
        'Rubik-Bold': require('./assets/fonts/rubik/Rubik-Bold.ttf'),
        'Rubik-Italic': require('./assets/fonts/rubik/Rubik-Italic.ttf'),
        'Rubik-Light': require('./assets/fonts/rubik/Rubik-Light.ttf'),
        'Rubik-Medium': require('./assets/fonts/rubik/Rubik-Medium.ttf'),
      }),
    ]);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingscreen) {
      return null;
    }

    return (
      <Block>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
