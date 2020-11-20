import React, {useState} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import LoginForm from './LoginForm';
import RegistroForm from './RegistroForm';
export default function Auth() {
    const [isLogin, setisLogin] = useState(true);
    const cambiosForm =() =>{
        setisLogin(!isLogin);
    }
  return (
    <>
        <View style = {estilo.vista}>
            <Image style={estilo.logo} source= {require('../assets/torta.png')}></Image>
            {isLogin ? <LoginForm cambiosForm={cambiosForm}/> : <RegistroForm cambiosForm={cambiosForm}/>}
        </View>
    </>
  );
}
const estilo = StyleSheet.create({
    vista:{
        flex:1,
        alignItems:'center'
    },
    logo:{
        width: '100%',
        height: 240,
        marginTop: 40,
        marginBottom: 40
    }
})

//rfc