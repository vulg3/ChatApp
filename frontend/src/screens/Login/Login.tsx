import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TabNavigationProp } from '../../navigation/bottom/RootTab';
import { onFacebookButtonPress, onGoogleButtonPress } from '../../core/services/authService';
import { RootStackParamEnum } from '../../navigation/stack/RootStack';


export default function Login() {

  const navigation = useNavigation<TabNavigationProp>()

  const handleLoginGoogle = useCallback(async () => {
    const result = await onGoogleButtonPress();
    if (true) {
      navigation.reset({
        index: 0,
        routes: [{ name: RootStackParamEnum.Tab }],
      })
    }
  }, []);

  const handleLoginFacebook = useCallback(async () => {
    const result = await onFacebookButtonPress();
    if (result) {
      navigation.reset({
        index: 0,
        routes: [{ name: RootStackParamEnum.Tab }],
      })
    }
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleLoginGoogle}>
          <FontAwesome name="google" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Đăng nhập với Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton} onPress={handleLoginFacebook}>
          <FontAwesome name="facebook" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: 300,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#DB4437',
    borderRadius: 10,
    marginBottom: 10,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#4267B2',
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
