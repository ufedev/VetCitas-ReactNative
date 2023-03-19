/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
//import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  FlatList,
  Alert,
  View,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Cita from './src/components/Cita';
// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  const [mostrarModal, setModalMostrar] = useState(false);
  const [misCitas, setMisCitas] = useState([]);
  const [cita, setCita] = useState({
    id: false,
    mascota: '',
    duenio: '',
    date: new Date(),
    sintomas: '',
    email: '',
    telefono: '',
  });
  const [modalCita, setModalCita] = useState(false);
  useEffect(() => {
    async function leerStorage() {
      const misCitasAS = (await AsyncStorage.getItem('mis_citas')) ?? '[]';
      const misCitasParse = await JSON.parse(misCitasAS);
      setMisCitas(misCitasParse);
    }

    leerStorage();
  }, []);

  useEffect(() => {
    const putStorage = async () => {
      await AsyncStorage.setItem('mis_citas', JSON.stringify(misCitas));
    };
    putStorage();
  }, [misCitas]);

  const handleClick = () => {
    //    console.log('Diste Click');
    setModalMostrar(!mostrarModal);
    setCita({
      id: false,
      mascota: '',
      duenio: '',
      date: new Date(),
      sintomas: '',
      email: '',
      telefono: '',
    });
  };

  const handleEliminarCita = (idCita: number | null) => {
    Alert.alert('Eliminar', 'Seguro desea Eliminar esta cita', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Eliminar',
        onPress: () => {
          const misCitasActualizado = misCitas.filter(c => c?.id !== idCita);
          setMisCitas(misCitasActualizado);
        },
      },
    ]);
  };

  const handleClickVerCita = (item: any) => {
    setModalCita(true);

    setCita(item);
  };

  const handleClickCerrarCita = () => {
    setModalCita(false);

    setCita({
      id: false,
      mascota: '',
      duenio: '',
      date: new Date(),
      sintomas: '',
      email: '',
      telefono: '',
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.titulo}>
        Administrador de Citas <Text style={s.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable style={s.btnPressCita} onPress={handleClick}>
        <Text style={s.btnTextCita}> Nueva Cita</Text>
      </Pressable>
      {misCitas?.length > 0 ? (
        <FlatList
          style={s.flatList}
          data={misCitas}
          keyExtractor={item => item?.id}
          renderItem={({item}) => {
            // no deja de otra forma react native
            return (
              <Cita
                item={item}
                setCita={setCita}
                setMostrarModal={setModalMostrar}
                handleEliminarCita={handleEliminarCita}
                handleClickVerCita={handleClickVerCita}
              />
            );
          }}
        />
      ) : (
        <Text style={s.sin_citas}>No hay Citas pendientes</Text>
      )}
      <Formulario
        mostrarModal={mostrarModal}
        misCitas={misCitas}
        setMisCitas={setMisCitas}
        setMostrarModal={setModalMostrar}
        cita={cita}
        setCita={setCita}
      />
      <Modal visible={modalCita} animationType="fade">
        <View style={s.citaModal}>
          <Pressable style={s.btnCerrar} onPress={handleClickCerrarCita}>
            <Text style={s.btnCerrarTexto}>Cerrar</Text>
          </Pressable>
          <Text style={s.titulo}>
            Información de la <Text style={s.tituloBold}>Cita</Text>
          </Text>
          <View style={s.citaModalView}>
            <View>
              <Text style={s.labelModalCita}>Mascota:</Text>
              <Text style={s.contentModalCita}>{cita.mascota}</Text>
            </View>
            <View>
              <Text style={s.labelModalCita}>Sitomas:</Text>
              <Text style={s.contentModalCita}>{cita.sintomas}</Text>
            </View>
            <View>
              <Text style={s.labelModalCita}>Dueño:</Text>
              <Text style={s.contentModalCita}>{cita.duenio}</Text>
            </View>
            <View>
              <Text style={s.labelModalCita}>Telefono:</Text>
              <Text style={s.contentModalCita}>{cita.telefono}</Text>
            </View>
            <View>
              <Text style={s.labelModalCita}>Email:</Text>
              <Text style={s.contentModalCita}>{cita.email}</Text>
            </View>

            <Text style={s.fechaModalCita}>
              {new Date(cita.date).toLocaleString('es-Es', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#e1e1e1',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
  },
  tituloBold: {
    fontWeight: '900',
    color: 'indigo',
  },
  flatList: {
    marginVertical: 20,
    borderRadius: 10,
  },
  btnPressCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextCita: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
    color: '#e1e1e1',
  },
  sin_citas: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  citaModal: {
    padding: 20,
    backgroundColor: '#e1e1e1',
    flex: 1,
  },
  citaModalView: {
    backgroundColor: '#e1e1e1',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 3.8,
    shadowOpacity: 0.25,
    elevation: 22,
    marginTop: 20,
  },
  labelModalCita: {
    fontSize: 17,
    fontWeight: '600',
  },
  contentModalCita: {
    fontSize: 21,
    fontWeight: '900',
    color: '#6D28D9',
  },
  fechaModalCita: {
    fontWeight: '300',
    marginTop: 20,
  },
  btnCerrar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  btnCerrarTexto: {
    fontSize: 15,
    fontWeight: '900',
    color: '#374151',
    padding: 5,
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default App;
