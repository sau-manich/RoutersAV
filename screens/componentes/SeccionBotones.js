import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

export default function SeccionBotones() {
  return (
    <View style={estilo.posicionBotones}>
        <View style={estilo.cerrar}>
            <Text style={estilo.texto} >Cerrar Sesion</Text>
        </View>
        <View style={estilo.nuevo}>
            <Text style={estilo.texto} >Nuevo cumpl</Text>
        </View>
    </View>
  );
}
const estilo = StyleSheet.create({
    posicionBotones:{
        position:'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignContent: "center",
        paddingHorizontal: 30
    }, 
    cerrar:{
        backgroundColor: "#d50000",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal:30
    },
    nuevo:{
        backgroundColor: "#3d5afe",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal:30
    },
    texto:{
        color:"#fff",
        fontSize: 16,
        textAlign:"center"
    }
})
