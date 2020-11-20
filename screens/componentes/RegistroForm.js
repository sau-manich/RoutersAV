import React, {useState}from 'react';
import {StyleSheet, Text, TextInput, Button, View, TouchableOpacity} from 'react-native';
import { validarCorreo } from '../utils/validaciones';
import firebase from '../../database/firebase';
import 'firebase/auth';
export default function RegistroForm(props) {
    console.log(props);
    const {cambiosForm} = props;
    const [formDato, setFormDato] = useState(valorDefecto());
    const [formError, setFormError] = useState({});
    const registrar = () =>{
      console.log("El usuario ha sido registrado");
      let errores={};
      if( !formDato.correo || !formDato.contrasena || !formDato.repetirContrasena){
        if(!formDato.correo) errores.correo = true;
        if(!formDato.contrasena) errores.contrasena = true;
        if(!formDato.repetirContrasena) errores.repetirContrasena = true;        
      } else if (!validarCorreo(formDato.correo)){
        errores.correo = true;
      } else if(formDato.contrasena !== formDato.repetirContrasena){
        errores.contrasena = true;
        errores.repetirContrasena = true; 
      } else if (formDato.contrasena.length < 6){
        errores.contrasena = true;
        errores.repetirContrasena = true; 
      } else{
        console.log("formulario correcto");
        firebase
          .auth()
          .createUserWithEmailAndPassword(formDato.correo, formDato.contrasena)
          .then( () => {
            console.log("Cuenta registrada");
          }).catch( () =>{
            setFormError({
              correo: true,
              contrasena:true,
              repetirContrasena:true
            })
          })
      }
      setFormError(errores);
      console.log(errores);
    }
  return (
    <>
      {/* condicion ? true : false */}
      {/* condicion && true */}
      <TextInput 
        style={[estilo.textInput, formError.correo && estilo.errorEstilo]} 
        placeholder="Ingrese correo" 
        placeholderTextColor="#969696"
        onChange= {(e) => setFormDato({...formDato, correo: e.nativeEvent.text})}/>
      <TextInput 
        style={[estilo.textInput, formError.contrasena && estilo.errorEstilo]} 
        placeholder="Ingrese contrasena" 
        placeholderTextColor="#969696"
        secureTextEntry ={true}
        onChange= {(e) => setFormDato({...formDato, contrasena: e.nativeEvent.text})}/>
      <TextInput 
        style={[estilo.textInput, formError.repetirContrasena && estilo.errorEstilo]} 
        placeholder="Repetir contrasena" 
        placeholderTextColor="#969696"
        secureTextEntry ={true}
        onChange= {(e) => setFormDato({...formDato, repetirContrasena: e.nativeEvent.text})}/>
      <Button  title = "Iniciar Sesion" onPress={ registrar }/>
      <View>
        <TouchableOpacity>
          <Text style={estilo.volver} onPress={cambiosForm}>Volver a Login</Text>
        </TouchableOpacity>
      </View>

    </>
  );
}
function valorDefecto(){
  return {
    correo: '',
    contrasena: '',
    repetirContrasena:''
  }
}
const estilo = StyleSheet.create({
  textInput:{
    height: 40,
    color: "#fff",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize:15,
    borderWidth:1,
    borderColor:"#1e3040"
  },
  volver:{
    color: "#fff",
    marginTop: 40
  },
  errorEstilo:{
    borderColor: "#f05545"
  }
})
