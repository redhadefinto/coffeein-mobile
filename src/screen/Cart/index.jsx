import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../styles/Cart';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Divider} from '@rneui/themed';
import coffe1 from '../../assets/Products/coffe-1.png';
import CardCart from '../../components/CardCart';

const Cart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart.shoppingCart);
  console.log(cartState);
  // const [subTotal, setSubTotal] = useState([]);
  // const cartState = useSelector(state => state.transaction.cart);
  // const user = useSelector(state => state.user.profile);
  const navigation = useNavigation();
  // const token = useSelector(state => state.auth.userData.token);
  const {width} = useWindowDimensions();
  const costing = price => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  let subtotal = 0;
  let taxFee = 0;
  let total = 0;
  // let itemTotal = 0;
  let sizeCost = 0;
  if (cartState.length !== 0) {
    cartState.forEach(item => {
      subtotal += item.price * item.qty;
      if (item.sizes === 1) {
        sizeCost += 3000;
      }
      if (item.sizes === 2) {
        sizeCost += 5000;
      }
      if (item.sizes === 3) {
        sizeCost += 8000;
      }
    });
    taxFee = subtotal * 0.1;
    total = subtotal + taxFee + sizeCost;
  }

  // console.log(total);a
  console.log(cartState);
  // console.log(subTotal);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>
          My <Text style={{fontFamily: 'Poppins-Black'}}>Cart</Text>
        </Text>
      </View>
      <View style={{paddingTop: 40}}>
        {cartState.length === 0 ? (
          <View style={styles.notOrder}>
            <IconComunity
              name="cart-outline"
              size={45}
              style={styles.icon}
              onPress={() => {
                navigation.navigate('Cart');
              }}
            />
            <Text style={styles.textNot}>No Orders Yet</Text>
          </View>
        ) : (
          cartState.map((data, idx) => {
            return (
              <View style={{minHeight: 210}} key={idx}>
                <CardCart
                  name={data.name}
                  price={data.price}
                  image={data.image}
                  id={data.id}
                  qty={data.qty}
                  sizes={data.sizes}
                />
                {/* {subTotal.push(data.price)} */}
              </View>
            );
          })
        )}
        {/* {cartState} */}
        <Divider width={1} style={{width: '100%', marginTop: 15}} />
        <View style={{paddingTop: 30}}>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>Item Total</Text>
            <Text style={styles.textPrice}>Rp {costing(subtotal)}</Text>
          </View>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>Size Cost</Text>
            <Text style={styles.textPrice}>Rp {costing(sizeCost)}</Text>
          </View>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>Tax</Text>
            <Text style={styles.textPrice}>Rp {costing(taxFee)}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 20,
              color: 'black',
            }}>
            Total :
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 20,
              color: 'black',
            }}>
            RP {costing(total)}
          </Text>
        </View>
        <View style={{paddingTop: 20, paddingBottom: 120}}>
          <TouchableOpacity
            onPress={() => {
              if (total === 0) {
                return ToastAndroid.showWithGravity(
                  'No Product in Cart',
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
                );
              }
              navigation.navigate('Delivery', {total});
            }}
            activeOpacity={0.8}>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: '#FFBA33',
                height: 70,
                borderRadius: 20,
                paddingLeft: 30,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <IconComunity
                name={'chevron-right'}
                size={25}
                style={{color: 'black'}}
              />
              <Text
                style={{
                  paddingLeft: 55,
                  color: 'black',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                }}>
                CHECKOUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;
