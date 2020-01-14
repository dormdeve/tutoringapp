import React from 'react';
import {View, Button, FlatList,StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';
import ServiceItem from '../../components/shop/ServiceItem';

import * as cartActions from '../../store/actions/cart';

import {Platform} from '@unimodules/core';

const ServiceOverviewScreen = props => {
  const services = useSelector(state => state.services.availableServices);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ServiceDetail', {
      serviceId: id,
      serviceTitle: title,
    });
  };

  return (
    <View color = {Colors.accent}>
    <FlatList
      style = {{backgroundColor:Colors.accent}}
      data={services}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ServiceItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ServiceItem>
      )}
    />
    </View>
  );
};

ServiceOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Services',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
    
  };
};

const styles = StyleSheet.create ({
  background: {
    color: Colors.accent
  }
});
export default ServiceOverviewScreen;
