import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    encargado: "",
    fecha: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Lista de cumpleañeros");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "¿Esta seguro que ",
      "desea eliminarlo?",
      [
        { text: "Si", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      encargado: user.encargado,
      fecha: user.fecha,
    });
    setUser(initialState);
    props.navigation.navigate("Lista de cumpleañeros");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
          style={{width: 150, height: 150,  marginTop:50, marginLeft: 80, marginBottom:30}}
          source={{uri: 'https://img2.pngio.com/adsl-access-point-router-internet-wifi-signal-free-icon-of-access-point-icon-png-512_512.png'}}
        />
      <View>
        <TextInput
          placeholder="Nombre"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Apellido"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Fecha de cumpleaños"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Fecha de cumpleaños"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.encargado}
          onChangeText={(value) => handleTextChange(value, "encargado")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Fecha de cumpleaños"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.fecha}
          onChangeText={(value) => handleTextChange(value, "fecha")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Eliminar"
          onPress={() => deleteUser()}
          color="#d86900"
        />
      </View>
      <View>
        <Button title="Actualizar" onPress={() => updateUser()} color="#036887" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;
