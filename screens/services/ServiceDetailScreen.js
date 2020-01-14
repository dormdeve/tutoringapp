import React from 'react';
import {View, Text, StyleSheet, Image, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartAction from '../../store/actions/cart';

const ServiceDetailScreen = props => {
  const serviceId = props.navigation.getParam('serviceId');
  const selectedService = useSelector(state =>
    state.services.availableServices.find(serv => serv.id === serviceId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedService.imageUrl}} />
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title="Add To Card"
          onPress={() => {
            dispatch(cartAction.addToCart(selectedService));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedService.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedService.description}</Text>
    </ScrollView>
  );
};

ServiceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('serviceTitle'),
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontFamily: 'calibre-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'calibre-regular',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ServiceDetailScreen;
