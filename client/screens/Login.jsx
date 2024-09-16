import React, {useState} from "react";
import { Image, StyleSheet, View, Text, ToastAndroid } from "react-native";
import Img from "../assets/Rectangle 8.png";
import { Button, TextInput } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/index";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app)

    const handleLogin = async() => {
        try {
            if (email === "" || password === "" && !email.includes('@')) {
              ToastAndroid.show(
                "Please enter all details!",
                ToastAndroid.SHORT
              );
            }

            if(email!=='' && password!==''){
                signInWithEmailAndPassword(auth, email, password).then(
                  () => {
                    ToastAndroid.show('Login Successfully!', ToastAndroid.SHORT)
                    navigation.navigate('Home')
                  }
                );
            }
        } catch (error) {
            console.warn(error)
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
          Log In
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
          onPress={handleLogin}
            style={styles.button}
            labelStyle={{ color: "white", fontSize: 18 }}
          >
            Login
          </Button>
          <Text style={{ marginTop: 10, marginLeft: 60 }}>
            Don't have any account?{" "}
            <Text
              style={{ color: "#FF7841" }}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              Signup
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

export default Login;
