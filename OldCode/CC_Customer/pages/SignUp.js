import {View, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';
// import Arrow from '../assets/leftArrow.svg';
// import Line1 from '../assets/line1.svg';
import {Linking} from 'react-native';
import RegisterButton from '../components/registerButton';
import InputField from '../components/InputField';
import Google from '../components/Google';
import Outlook from '../components/Outlook';
import {useNavigation} from '@react-navigation/native';
import { createUser } from '../api/auth';
// import {AuthContext} from '../context/AuthContext';
import {useContext, useState} from 'react';
const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const googleUrl =
  //   'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&access_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8080/api/auth/google/callback&client_id=1057185591270-vcs2d2m2pseoj69qttk0ecs3ug32ji3k.apps.googleusercontent.com&prompt=consent&response_type=code';
  const googleUrl = 'http://localhost:8080/api/auth/google/';
  const outlookUrl = 'http://localhost:8080/api/auth/outlook/';
  // const ctx = useContext(AuthContext);
  const navigation = useNavigation();
  const registerHandler = () => {
    console.log(userName, email, password, navigation);
    // ctx.register(userName, email, password, navigation);
    
    navigation.navigate('SignUpOTP');
  };
  const GoogleHandler = async () => {
    const supported = await Linking.canOpenURL(googleUrl);
    if (supported) {
      await Linking.openURL(googleUrl);
    } else {
      console.log('not supported');
    }
  };
  const OutlookHandler = async () => {
    const supported = await Linking.canOpenURL(outlookUrl);
    if (supported) {
      await Linking.openURL(outlookUrl);
    } else {
      console.log('not supported');
    }
  };

  return (
    <KeyboardAvoidingView>
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.navigate('GetStarted');
          }}
        />
        <View style={styles.linev} />
        <View style={styles.input}>
          <InputField
            text="Full name"
            callback={text => {
              setUserName(() => text);
            }}
          />
          <InputField
            text="Email ID"
            callback={text => {
              setEmail(() => text);
            }}
          />
          <InputField
            text="Password"
            callback={text => {
              setPassword(() => text);
            }}
          />
        </View>
        <View style={styles.input2}>
          <TouchableOpacity style={styles.wrapper} onPress={registerHandler}>
            <RegisterButton text="Register" />
          </TouchableOpacity>
          <Text style={styles.or}>or</Text>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={async () => {
              await OutlookHandler();
              navigation.navigate('Home');
            }}>
            <Outlook />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={async () => {
              await GoogleHandler();
              // navigation.navigate('Home');
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
    </KeyboardAvoidingView>
  );
};

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
  linev: {
    marginTop: '6%',
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginTop: '6%',
    width: '100%',
    height: '28%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input2: {
    marginTop: '4%',
    height: '23%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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

export default SignUp;
