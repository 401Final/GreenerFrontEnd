import React, {Component} from "react";
//import React, { useEffect, useState } from 'react';
import * as GoogleSignin from 'expo-google-sign-in';
import * as AppAuth from 'expo-app-auth';
import * as Google from 'expo-google-app-auth';
import {Text, View, StyleSheet, Button } from 'react-native';

const IOS_CLIENT_ID = '872509857984-nv75qdpnj41i8qjfeb5pplnncmnd6stv.apps.googleusercontent.com';

export default class LoginScreen extends Component {
    signInWithGoogle = async () => {
        try {
            const result = await Google.logInAsync ({
                iosClientId: IOS_CLIENT_ID,
                success: ['profile', 'email']
            })
            if(result.type === 'success') {
                console.log('LoginScreen.js', result.user.givenName);
                this.props.navigation.navigate('Collection', {
                    username: result.user.givenName
                })
                return result.accessToken;
            } else {
                return {cancelled: true};
            }
        } catch (err){
            console.log('LoginScreen', err);
            return {error: true}
        }
    } 

    render() {
        return(
            <View style={styles.container}>
                <Button title="Login with Google" onPress={this.signInWithGoogle}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center', 
   }
})

