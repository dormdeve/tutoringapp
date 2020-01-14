import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Platform} from 'react-native';

import ServiceOverviewScreen from '../screens/services/ServiceOverviewScreen';
import ServiceDetailScreen from '../screens/services/ServiceDetailScreen';
import CartScreen from '../screens/services/CartScreen';
import UserServiceScreen from '../screens/user/UserServicesScreen';
import OrdersScreen from '../screens/services/OrdersScreen';
import EditServiceScreen from '../screens/user/EditServiceScreen';

import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontFamily: 'calibre-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'calibre-bold',
    fontSize: 15,
  },
  headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.primary,
};

const ServiceNavigator = createStackNavigator(
  {
    ServiceOverview: ServiceOverviewScreen,
    ServiceDetail: ServiceDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AdminNavigator = createStackNavigator(
  {
    UserServices: UserServiceScreen,
    EditService: EditServiceScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const ShopNavigator = createDrawerNavigator(
  {
    Services: ServiceNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
