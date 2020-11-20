import React from 'react';
import { View, Text } from 'react-native';
import SeccionBotones from './SeccionBotones';
import MostrarLista from './MostrarLista';
export default function ListaCumpleanero() {
  return (
    <View>
      <Text>Brian Cardenas</Text>
      <Text>Amilcar </Text>
      <Text>Ariel</Text>
      <Text>Eber</Text>
      <Text>Erick</Text>
      <Text>Maeba</Text>
        <MostrarLista/>
      <SeccionBotones/>
     </View>
  );
}
