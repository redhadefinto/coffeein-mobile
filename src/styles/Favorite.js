/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#EEEEEE',
    padding: 30,
    flexDirection: 'row',
    // alignItems: 'center'
  },
  scrolles: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    minHeight: '200%',
  },
  icons: {
    marginRight: 30,
    color: 'black',
    fontSize: 25,
  },
  titleNavbar: {
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
  },
  category: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    paddingTop: 25,
  },
  category2: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 40,
    color: 'black',
    paddingTop: 25,
  },
  containerCard: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 25,
    // gap: 25,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#3939391A',
    elevation: 1,
    width: 180,
    height: 212.41,
    borderRadius: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 30,
  },
  imgProduct: {
    width: 128.98,
    height: 128.98,
    borderRadius: 250,
    position: 'absolute',
    top: -35,
  },
  titleFood: {
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 90,
    // width: 116,
    lineHeight: 25,
    color: 'black',
  },
  priceFood: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#6A4029',
    textAlign: 'center',
  },
});

export default styles;
