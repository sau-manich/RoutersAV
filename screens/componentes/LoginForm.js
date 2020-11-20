import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import { validarCorreo } from '../utils/validaciones';
import firebase from '../../database/firebase';

export default function LoginForm(props) {
    const { cambiosForm} = props;
    const [formDato, setFormDato] = useState(valorDefecto());
    const [formError, setFormError] = useState({});
    const  iniciar = () =>{
        let errores = {};
        if(!formDato.correo || !formDato.contrasena){
            if(!formDato.correo) errores.correo = true;
            if(!formDato.contrasena) errores.contrasena = true;
        } else if (!validarCorreo(formDato.correo)) {
            errores.correo = true;
        } else{
            firebase
                .auth()
                .signInWithEmailAndPassword(formDato.correo,formDato.contrasena)
                .catch((error)=>{
                    console.log(error);
                    setFormError({
                        correo: true,
                        contrasena:true,
                    })
                })
        }
        setFormError(errores);
    }
    const onChange = (e, tipo)=>{
        setFormDato({...formDato, [tipo]: e.nativeEvent.text});
    }
  return (
    <>  
        <TextInput 
        style={[estiloLogin.textInput,formError.correo && estiloLogin.errorEstilo]} 
        placeholder="Ingrese correo" 
        placeholderTextColor="#969696"
        onChange= {(e) => onChange(e, "correo")}
        />
        <TextInput 
        style={[estiloLogin.textInput, formError.contrasena && estiloLogin.errorEstilo]} 
        placeholder="Ingrese contrasena" 
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange= {(e) => onChange(e, "contrasena")}
        />
        <Button title="Iniciar Sesion" onPress={iniciar}/>
        <View style={estiloLogin.irRegistro}>
            <TouchableOpacity>
                <Text style={estiloLogin.link} onPress={cambiosForm}>Ir a Registro</Text>
            </TouchableOpacity>
        </View>
    </>
  );
}
function valorDefecto(){
    return {
      correo: '',
      contrasena: '',
    }
}
const estiloLogin = StyleSheet.create({
    link:{
        color: '#fff',
        fontSize: 15
    },
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
    irRegistro:{
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10
    },
    errorEstilo:{
        borderColor: "#f05545"
    }
})
