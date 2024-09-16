import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Text } from "react-native";
import { Icon } from "react-native-paper";
import { FloatingAction } from "react-native-floating-action";

const Home = ({navigation}) => {

  const actions = [
    {
      text: "Chat",
      icon: require("../assets/chat.png"),
      name: "chat",
      position: 1,
      color: "#FF7841",
    }
  ];


    return (
      <View
        style={{
          padding: Platform.OS === "andriod" ? StatusBar.currentHeight : 0,
        }}
      >
        {/* <View style={{ marginTop: 40, marginLeft: 20 }}>
          <Icon source="search-web" size={30} />
        </View> */}
        <View>
          <Text style={{ fontSize: 20, color: "#FF7841", fontWeight:'bold', marginLeft:70, marginTop:100,}}>
            {" "}
            Welcome to ChatApp
          </Text>
        </View>

        <View style={{ marginTop: 550 }}>
          <FloatingAction
            actions={actions}
            color="#FF7841"
            onPressItem={(name) => {
              if (name === "chat") {
                navigation.navigate("Chat");
              }
            }}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({})

export default Home;
