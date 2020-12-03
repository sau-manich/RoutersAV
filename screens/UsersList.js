import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Image } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone, encargado, fecha } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
          encargado,
          fecha,
        });
      });
      setUsers(users);
    });
  }, []);

  return (
    <ScrollView>
      <Image
          style={{width: 150, height: 150,  marginTop:50, marginLeft: 120, marginBottom:30}}
          source={{uri: 'https://img2.pngio.com/adsl-access-point-router-internet-wifi-signal-free-icon-of-access-point-icon-png-512_512.png'}}
        />
      <Button
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Nuevo Router"
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://img2.pngio.com/adsl-access-point-router-internet-wifi-signal-free-icon-of-access-point-icon-png-512_512.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Title>{user.email}</ListItem.Title>
              <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserScreen;
