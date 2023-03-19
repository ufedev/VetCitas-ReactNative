import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import type {PropsWithChildren} from 'react';

type CitaProps = PropsWithChildren<{
  item: any,
  setCita: any,
  setMostrarModal: any,
  handleEliminarCita: any,
  handleClickVerCita: any,
}>;

export default function Cita({
  item,
  setCita,
  setMostrarModal,
  handleEliminarCita,
  handleClickVerCita,
}: CitaProps): JSX.Element {
  const {mascota, sintomas, date} = item;

  const fecha = new Date(date).toLocaleString('es-ES', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
    year: 'numeric',
  });

  const handleEditar = () => {
    setCita(item);
    setMostrarModal(true);
  };

  return (
    <Pressable onLongPress={() => handleClickVerCita(item)}>
      <View style={styles.citaCard}>
        <Text style={styles.label}>Mascota:</Text>
        <Text style={styles.descripcion}>{mascota}</Text>
        <Text style={styles.label}>Sitomas:</Text>
        <Text style={styles.descripcion}>{sintomas}</Text>
        <Text style={styles.fecha}>{fecha}</Text>
        <View style={styles.actions}>
          <Pressable style={styles.btnEditar} onPress={handleEditar}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={styles.btnEliminar}
            onPress={() => handleEliminarCita(item.id)}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  citaCard: {
    padding: 20,
    backgroundColor: '#FFF',

    marginHorizontal: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  descripcion: {
    fontSize: 20,

    color: '#6D28D9',
    fontWeight: '900',
  },
  fecha: {
    marginVertical: 10,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnEditar: {
    backgroundColor: '#ad750b',
    padding: 15,
    borderRadius: 10,
  },
  btnEliminar: {
    backgroundColor: '#c53015',
    padding: 15,
    borderRadius: 10,
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
});
