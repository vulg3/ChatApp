import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TabNavigationProp } from '../../navigation/bottom/RootTab';
import { logOut } from '../../core/services/authService';
import { RootStackParamEnum } from '../../navigation/stack/RootStack';
import { Message } from '../../core/entities/message';

export interface ChatType {
  _id: string
  title: string
  messages: Message[]
}
const Chat = () => {
  const navigation = useNavigation<TabNavigationProp>()

  const handleLogOut = useCallback(async () => {
    const isLogOut = await logOut();
    if (isLogOut) {
      navigation.reset({
        index: 0,
        routes: [{ name: RootStackParamEnum.Auth }],
      })
    } else {
      console.log("Logout Error");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Settings Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => { handleLogOut() }}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff5252',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;
