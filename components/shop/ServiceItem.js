import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
const ServiceItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.service}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <Image style={styles.image} source={{uri: props.image}} />
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '60%',
  },
  service: {
    height: 300,
    margin: 20,
    color: Colors.accent,

  },
  details: {
    alignItems: 'center',
    padding: 10,
    height: '17%',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'calibre-regular',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'calibre-regular',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});

export default ServiceItem;
