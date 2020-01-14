import React from 'react';
import {FlatList, Button, Platform, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ServiceItem from '../../components/shop/ServiceItem';
import Colors from '../../constants/Colors';
import * as servicesActions from '../../store/actions/services';

const UserServicesScreen = props => {
  const userServices = useSelector(state => state.services.userServices);
  const dispatch = useDispatch();

  const editServiceHandler = id => {
    props.navigation.navigate('EditService', {serviceId: id});
  };
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to Delete this Item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(servicesActions.deleteService(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userServices}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ServiceItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editServiceHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editServiceHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ServiceItem>
      )}
    />
  );
};
UserServicesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Services',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditService');
          }}
        />
      </HeaderButtons>
    ),
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
  };
};
export default UserServicesScreen;
