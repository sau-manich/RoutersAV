import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";

import firebase from "../database/firebase";

const AddUserScreen = (props) => {
  const initalState = {
    name: "",
    email: "",
    phone: "",
    encargado: "",
    fecha: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("Porfavor ingrese un nombre");
    } else {

      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
          encargado: state.encargado,
          fecha: state.fecha,
        });

        props.navigation.navigate("Lista de router");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
          style={{width: 150, height: 150,  marginTop:50, marginLeft: 80, marginBottom:30}}
          source={{uri: 'https://img2.pngio.com/adsl-access-point-router-internet-wifi-signal-free-icon-of-access-point-icon-png-512_512.png'}}
        />
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Departamento"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="SDDI Router"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Contraseña"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
        />
      </View>

       {/* Input */}
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="Encargado"
          onChangeText={(value) => handleChangeText(value, "encargado")}
          value={state.encargado}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Fecha de modificación"
          onChangeText={(value) => handleChangeText(value, "fecha")}
          value={state.fecha}
        />
      </View>

      <View style={styles.button}>
        <Button title="Registrar Router" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default AddUserScreen;
