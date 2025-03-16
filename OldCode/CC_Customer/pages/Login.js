import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import Arrow from '../assets/leftArrow.svg';
import RegisterButton from '../components/registerButton';
import InputField from '../components/InputField';
import Google from '../components/Google';
import Outlook from '../components/Outlook';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {onUserLogin} from '../reducers';
import {Linking} from 'react-native';
//make a confirm password screen and handle the form validation
const Login = props => {
  const navigation = useNavigation();
  const {userReducer} = props;
  console.log(userReducer);
  // const ctx = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const googleUrl = 'http://localhost:8080/api/auth/google/';
  const outlookUrl = 'http://localhost:8080/api/auth/outlook/';
  const handleDeepLink = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log('Deep linking is not supported.');
    }
  };
  const OutlookHandler = async () => {
    await handleDeepLink(outlookUrl);
  };
  const GoogleHandler = async () => {
    await handleDeepLink(googleUrl);
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.arrow}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GetStarted');
            }}>
            <Arrow />
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <InputField text="Email ID" callback={text => setEmail(text)} />
          <InputField text="Password" callback={text => setPassword(text)} />
        </View>
        <View style={styles.input2}>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() => {
              onUserLogin({email: email, password: password});
            }}>
            <RegisterButton text="Login" />
          </TouchableOpacity>

          <View style={styles.password}>
            <Text style={styles.p1}>Forgot password?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Text style={styles.p2}> Reset Password</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.or}>or</Text>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={async () => {
              await OutlookHandler();
            }}>
            <Outlook />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={async () => {
              await GoogleHandler();
            }}>
            <Google />
          </TouchableOpacity>
        </View>
        <View style={styles.text}>
          <Text style={styles.texts}>
            By tapping Register, or continue with Outlook or Google, you agree
            to our
            <Text style={styles.boldText}> Terms of Use </Text>
            and
            <Text style={styles.boldText}> Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  userReducer: state.userReducer,
});

const LoginScreen = connect(mapStateToProps, {onUserLogin})(Login);

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#5736B5',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  container: {
    backgroundColor: '#EFEEFA',
    height: '97%',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: 'column',
  },
  arrow: {
    paddingLeft: 28,
    paddingTop: 28,
  },
  input: {
    marginTop: 16,
    width: '100%',
    height: 136,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input2: {
    marginTop: 8,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  password: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  p1: {
    fontSize: 14,
    color: '#6F6F6F',
  },
  p2: {
    fontSize: 14,
    color: '#6F6F6F',
    fontWeight: 500,
  },
  or: {
    fontSize: 16,
    fontWeight: 500,
    color: '#6F6F6F',
  },
  text: {
    marginTop: 4,
    width: '91%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  texts: {
    textAlign: 'center',
    color: '#6F6F6F',
    fontSize: 12,
    fontWeight: 400,
  },
  boldText: {
    fontWeight: 500,
  },
  wrapper: {
    width: '100%',
    height: 38,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
