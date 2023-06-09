import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import bgLogin from '../../assets/background/login-page.png';
import iconGoogle from '../../assets/icon/icon-google.png';
import {useNavigation} from '@react-navigation/native';
import {authAction} from '../../redux/slices/auth';
import {profileAction} from '../../redux/slices/profile';
import {StackActions} from '@react-navigation/native';
// import messeging from '@react-native-firebase/messaging';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

// import Loaders from '../../components/Loaders';
const Login = () => {
  const controller = React.useMemo(() => new AbortController(), []);
  const controllerProfile = React.useMemo(() => new AbortController(), []);
  const [buttonPressedRegist, setButtonPressedRegist] = useState(false);
  const [buttonPressedLoginWithGoogle, setButtonPressedLoginWithGoogle] =
    useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const [IsLoading, setIsLoading] = useState(false);
  const onChangeHandler = (text, type) => {
    setForm(form => ({...form, [type]: text}));
  };
  const loginHandler = async () => {
    if (form.email === '' || form.password === '') {
      showMessage({
        message: 'Email/Password required',
        type: 'danger',
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const result = await dispatch(
        authAction.getAuthThunk({email: form.email, password: form.password}),
      );
      // console.log(result);
      if (
        result.payload === 'Email/Password Salah' ||
        result.payload === 'Email Not Registered'
      ) {
        setIsLoading(false);
        return showMessage({
          message: result.payload,
          type: 'danger',
        });
      }
      const profile = await dispatch(
        profileAction.getProfileThunk({
          controllerProfile,
          token: result.payload.token,
        }),
      );
      if (profile) {
        navigation.replace('DrawerNavigator');
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      showMessage({
        message: error,
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      {/* {IsLoading && <Loaders />} */}
      <ImageBackground source={bgLogin} style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.topContainer}>
            <Text style={styles.titleHero}>Login</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              placeholder="Enter your email adress"
              style={styles.input}
              placeholderTextColor={'white'}
              value={form.email}
              onChangeText={text => onChangeHandler(text, 'email')}
            />
            <TextInput
              placeholder={'Enter your password'}
              style={styles.input}
              placeholderTextColor={'white'}
              secureTextEntry={true}
              value={form.password}
              onChangeText={text => onChangeHandler(text, 'password')}
            />
            <TouchableOpacity
              style={styles.forgotText}
              onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonRegist,
                buttonPressedRegist ? styles.buttonPressedRegist : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressedRegist(true)}
              onPressOut={() => setButtonPressedRegist(false)}
              onPress={loginHandler}>
              <Text style={[styles.textButton, styles.colorBtnRegist]}>
                {IsLoading ? (
                  <ActivityIndicator size="large" color="#6A4029" />
                ) : (
                  'Login'
                )}
              </Text>
            </TouchableOpacity>
            <View style={styles.containerLine}>
              <View style={styles.line}></View>
              <Text style={styles.textLoginWithGoogle}>or Login in with</Text>
              <View style={styles.line}></View>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonGoogle,
                buttonPressedLoginWithGoogle
                  ? styles.buttonPressedLoginWithGoogle
                  : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressedLoginWithGoogle(true)}
              onPressOut={() => setButtonPressedLoginWithGoogle(false)}>
              <Image style={{width: 28, height: 26}} source={iconGoogle} />
              <Text style={[styles.textButton, styles.colorBtnLoginWithGoogle]}>
                Login with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  topContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 24,
  },
  titleHero: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 65,
  },
  buttonGoogle: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  btnLoginWithGoogle: {},
  buttonRegist: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFBA33',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
    marginTop: 15,
  },
  buttonPressedLoginWithGoogle: {
    transform: [{scale: 0.95}],
    backgroundColor: '#FFBA55',
  },
  buttonPressedRegist: {
    transform: [{scale: 0.95}],
    backgroundColor: 'rgba(140, 70, 41, 1)',
  },
  textButton: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
  },
  colorBtnLoginWithGoogle: {
    color: '#000000',
  },
  colorBtnRegist: {
    color: '#000000',
  },
  iconGoogle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#FFF',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    color: '#FFF',
    fontWeight: '800',
  },
  forgotText: {
    color: '#FFF',
    alignContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 5,
    fontWeight: '800',
  },
  textLoginWithGoogle: {
    color: '#FFF',
    fontWeight: '800',
    marginRight: 8,
    marginLeft: 8,
  },
  line: {
    height: 1,
    width: '28%',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  containerLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
