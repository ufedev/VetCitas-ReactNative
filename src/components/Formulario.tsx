import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import type {PropsWithChildren} from 'react';

type FormTypes = PropsWithChildren<{
  mostrarModal: any,
  misCitas: Array<any>,
  setMisCitas: any,
  setMostrarModal: any,
  cita: any,
  setCita: any,
}>;

function Formulario({
  mostrarModal,
  misCitas,
  setMisCitas,
  setMostrarModal,
  cita,
  setCita,
}: FormTypes): JSX.Element {
  const [id, setId] = useState(false);
  const [mascota, setMascota] = useState('');
  const [duenio, setDuenio] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (Object.keys(cita).length > 0) {
      setId(cita.id);
      setMascota(cita.mascota);
      setDuenio(cita.duenio);
      setEmail(cita.email);
      setTelefono(cita.telefono);
      setSintomas(cita.sintomas);
      setDate(new Date(cita.date));
    }
  }, [cita]);

  const handleCita = () => {
    if ([mascota, duenio, email, sintomas, date].includes('')) {
      Alert.alert('Advertencia', 'Todos los campos son obligatorios');
      return;
    }

    if (id) {
      const citaAct = {
        id: id,
        mascota,
        duenio,
        email,
        telefono,
        sintomas,
        date,
      };
      const misCitasActualizadas = misCitas.map(c =>
        c.id === id ? citaAct : c,
      );
      setMisCitas(misCitasActualizadas);
    } else {
      const nuevaCita = {
        id: Date.now(),
        mascota,
        duenio,
        email,
        telefono,
        sintomas,
        date,
      };
      setMisCitas([...misCitas, nuevaCita]);
    }
    setMostrarModal(false);
    setId(false);
    setMascota('');
    setDuenio('');
    setEmail('');
    setTelefono('');
    setSintomas('');
    setCita({});
  };

  const handleCerrar = () => {
    setMostrarModal(false);
    setId(false);
    setMascota('');
    setDuenio('');
    setEmail('');
    setTelefono('');
    setSintomas('');
    setCita({});
  };
  return (
    <Modal visible={mostrarModal} animationType="slide">
      <ScrollView style={styles.contenidoScroll}>
        <SafeAreaView style={styles.contenido}>
          <Pressable style={styles.btnCerrar} onPress={handleCerrar}>
            <Text style={styles.btnCerrarTexto}>Cerrar</Text>
          </Pressable>
          <Text style={styles.titulo}>
            {!id ? 'Nueva' : 'Editar'}{' '}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Mascota</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Mascota"
              placeholderTextColor={'grey'}
              value={mascota}
              onChangeText={setMascota}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Dueño</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Dueño"
              placeholderTextColor={'grey'}
              value={duenio}
              onChangeText={setDuenio}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              placeholderTextColor={'grey'}
              keyboardType="phone-pad"
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'grey'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Ingreso</Text>
            <View style={styles.inputDate}>
              <DatePicker date={date} onDateChange={setDate} locale={'es'} />
            </View>
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.inputSintomas]}
              placeholder="Sintomas"
              placeholderTextColor={'grey'}
              multiline={true}
              numberOfLines={5}
              value={sintomas}
              onChangeText={setSintomas}
            />
          </View>

          <Pressable style={styles.btnAgregar} onPress={handleCita}>
            <Text style={styles.btnAgregarTexto}>
              {!id ? 'Agregar Mascota' : 'Actualizar Cita'}
            </Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 10,
    color: '#E1E1E1',
  },
  tituloBold: {
    fontWeight: '900',
  },
  contenido: {
    flex: 1,
    backgroundColor: '#6D28D9',
    paddingVertical: 30,
  },
  contenidoScroll: {
    flex: 1,
  },
  campo: {
    padding: 5,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 5,
      height: 16,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20.0,
    elevation: 10,
  },
  inputSintomas: {
    height: 100,
  },
  inputDate: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    //marginBottom: 100, // al ser el ultimo elemento para que de una separación y sea comodo al uso
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
    color: '#FFFFFF',
    padding: 5,
    borderColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
  },
  btnAgregar: {
    margin: 20,
    padding: 15,
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
  },
  btnAgregarTexto: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default Formulario;
