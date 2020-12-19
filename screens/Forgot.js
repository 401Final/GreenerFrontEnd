import React, { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

const VALID_EMAIL = "forgotpass@greener.com";

export default function Forgot(props){
  const [email, setEmail] = useState(VALID_EMAIL);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errorsz = [];

    Keyboard.dismiss();
    setLoading(true);

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      setErrors([...errors, 'email']);
    }

    // this.setState({ errors, loading: false });
    setErrors(errorsz);
    setLoading(false);
    if (!errors.length) {

        // I believe the email logic would go here!
      Alert.alert(
        "Password sent!",
        "Please check you email.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Please check you Email address.",
        [{ text: "Try again" }],
        { cancelable: false }
      );
    }
  }

    const { navigation } = props;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Forgot
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />
            <Button gradient onPress={() => handleForgot()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Forgot
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});