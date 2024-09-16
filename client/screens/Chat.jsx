import React, { useState, useCallback, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../Firebase/index";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      setMessages(newMessages);

    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    if (_id && createdAt && text && user) {
      addDoc(collection(db, "chats"), {
        _id,
        createdAt,
        text,
        user,
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    } else {
      console.error("Invalid message data: ", { _id, createdAt, text, user });
    }
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://1.pravatar.cc/300",
        }}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Chat;
