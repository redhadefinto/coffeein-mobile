import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LoadingBrown from '../LoadingBrown';
import iconPensil from '../../assets/icon/pensil.png';

const CardHome = ({title, price, image, id, role_id}) => {
  // console.log(image);
  const navigation = useNavigation();
  const costing = price => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  return (
    <TouchableOpacity
      style={styles.containerProduct}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          prodId: id,
        })
      }>
      <View style={styles.containerImage}>
        {!image ? (
          <LoadingBrown />
        ) : (
          <ImageBackground
            source={{uri: image}}
            style={styles.productImage}
            resizeMode="cover"
          />
        )}
      </View>
      {role_id === 1 && (
        <TouchableOpacity style={styles.containerIconPencil}>
          <ImageBackground
            source={iconPensil}
            style={{width: 25, height: 25}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>Rp {costing(price)}</Text>
    </TouchableOpacity>
  );
};

export default CardHome;

const styles = StyleSheet.create({
  containerProduct: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 20,
    height: 300,
    marginTop: 30,
  },
  productTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '900',
    width: '80%',
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    color: '#6A4029',
    fontSize: 20,
    fontWeight: '900',
    width: '80%',
    textAlign: 'center',
    marginTop: 5,
  },
  productImage: {
    width: 170,
    height: 170,
    // top: '-25%',
    borderRadius: 30,
    // display: 'none',
  },
  containerImage: {
    height: 170,
    width: 170,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // borderWidth: 2,
    position: 'relative',
    top: '-10%',
    overflow: 'hidden',
  },
  containerIconPencil: {
    width: 50,
    height: 50,
    backgroundColor: '#6A4029',
    position: 'absolute',
    borderRadius: 10000,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
