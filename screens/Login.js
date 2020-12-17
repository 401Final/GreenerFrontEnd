import React, { Component } from "react";
import React, { useEffect, useState } from 'react';
//expo code 3-6
import * as GoogleSignin from 'expo-google-sign-in';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import * as AppAuth from 'expo-app-auth';
// import Linking from 'expo';
// const prefix = Linking.makeUrl('/');
// import { View, Text, Image, StyleSheet, Button, Alert} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from '@react-native-community/google-signin';

export default function Login(){
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if(cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  return(
    <View style={StyleSheet.container}>
      <Text>Greener</Text>
      <Button
        title="Sign in with Google"
        onPress={async () => {
          const _authState = await GoogleSignin.signInAsync();
          setAuthState(_authState);
        }}
      />
      <Button
        title="Sign Out"
        onPress={async () => {
          await signOutAsync(authState);
          setAuthState(null);
        }}
      />
      <Text>{JSON.stringify(authState, null, 2)}</Text>
    </View>
  )
}
//need client id possibly here























// ==============Rob's Code

// import {
//   ActivityIndicator,
//   Keyboard,
//   KeyboardAvoidingView,
//   StyleSheet
// } from "react-native";

// import { Button, Block, Input, Text } from "../components";
// import { theme } from "../constants";

// const VALID_EMAIL = "test@test.com";
// const VALID_PASSWORD = "12345";

// export default class Login extends Component {
//   state = {
//     email: VALID_EMAIL,
//     password: VALID_PASSWORD,
//     errors: [],
//     loading: false
//   };

//   handleLogin() {
//     const { navigation } = this.props;
//     const { email, password } = this.state;
//     const errors = [];

//     Keyboard.dismiss();
//     this.setState({ loading: true });

//     // check with backend API or with some static data
//     if (email !== VALID_EMAIL) {
//       errors.push("email");
//     }
//     if (password !== VALID_PASSWORD) {
//       errors.push("password");
//     }

//     this.setState({ errors, loading: false });

//     if (!errors.length) {
//       navigation.navigate("Browse");
//     }
//   }

//   render() {
//     const { navigation } = this.props;
//     const { loading, errors } = this.state;
//     const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

//     return (
//       <KeyboardAvoidingView style={styles.login} behavior="padding">
//         <Block padding={[0, theme.sizes.base * 2]}>
//           <Text h1 bold>
//             Login... If we even need this page
//           </Text>
//           <Block middle>
//             <Input
//               label="Email"
//               error={hasErrors("email")}
//               style={[styles.input, hasErrors("email")]}
//               defaultValue={this.state.email}
//               onChangeText={text => this.setState({ email: text })}
//             />
//             <Input
//               secure
//               label="Password"
//               error={hasErrors("password")}
//               style={[styles.input, hasErrors("password")]}
//               defaultValue={this.state.password}
//               onChangeText={text => this.setState({ password: text })}
//             />
//             <Button gradient onPress={() => this.handleLogin()}>
//               {loading ? (
//                 <ActivityIndicator size="small" color="white" />
//               ) : (
//                 <Text bold white center>
//                   Login
//                 </Text>
//               )}
//             </Button>

//             <Button gradient onPress={() => this.props.navigation.navigate('Collection')}>
//             <Text center semibold white>BYPASS</Text>
//           </Button>
//           </Block>
//         </Block>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   login: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   input: {
//     borderRadius: 0,
//     borderWidth: 0,
//     borderBottomColor: theme.colors.gray2,
//     borderBottomWidth: StyleSheet.hairlineWidth
//   },
//   hasErrors: {
//     borderBottomColor: theme.colors.accent
//   }
// });