import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from '../screens/Welcome';
import Rewards from '../screens/Rewards';
import Trip from '../screens/Trip';

import { theme } from '../constants';

const screens = createStackNavigator(
  {
    Welcome,
    Rewards,
    Trip,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 110,
        backgroundColor: theme.colors.gray4,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerTitleContainerStyle: {
        paddingLeft: theme.sizes.padding,
      },
      headerLeftContainerStyle: {
        alignItems: 'flex-end',
        marginLeft: theme.sizes.padding,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: 'flex-end',
        marginRight: theme.sizes.padding * 2,
        paddingTop: theme.sizes.padding / 2,
      },
    },
    headerLayoutPreset: 'left',
  },
);

export default createAppContainer(screens);
