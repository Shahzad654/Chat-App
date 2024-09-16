import React, { useState } from "react";
import { Image, StyleSheet, View, Text, ToastAndroid } from "react-native";
import Img from "../assets/Rectangle 8.png";
import { Button, TextInput } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../Firebase/index'

const Signup = ({ navigation }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const auth = getAuth(app)

   const handleSignup = async () => {
    try {
      if (email === "" || (password === "" && !email.includes("@"))) {
        ToastAndroid.show("Please enter all details!", ToastAndroid.SHORT);
      }
        if (email !== "" && password !== "" && email.includes("@")) {
          createUserWithEmailAndPassword(auth, email, password).then(() => {
            ToastAndroid.show(
              "Account Created Successfully!",
              ToastAndroid.SHORT
            );
            navigation.navigate("Login");
          });
        }
        
    } catch (error) {
        console.warn(error);
    }  
  }


  return (
    <View style={styles.wrapper}>
      <View style={styles.img}>
        <Image source={Img} />
      </View>

      <View style={styles.container}>
        <Text
          style={{
            color: "#FF7841",
            fontSize: 33,
            fontWeight: "bold",
            marginLeft: 130,
          }}
        >
          Sign Up
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            right={<TextInput.Icon icon="email" />}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.textInput}
          />
          <TextInput
            label="Password"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={styles.textInput}
          />
        </View>

        <View>
          <Button
            onPress={handleSignup}
            style={styles.button}
            labelStyle={{ color: "white", fontSize: 18 }}
          >
            Signup
          </Button>
          <Text style={{ marginTop: 10, marginLeft: 60 }}>
            Don't have any account?{" "}
            <Text
              style={{ color: "#FF7841" }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  container: {
    flex: 2,
    borderTopLeftRadius: 100,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  inputContainer: {
    marginTop: 50,
  },
  textInput: {
    marginTop: 20,
    paddingLeft: 30,
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: "#FF7841",
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 60,
  },
});

export default Signup;
