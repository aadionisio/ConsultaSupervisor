import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import Supervisores from '~/components/Supervisores';
import DateInput from '~/components/DateInput';

import { Container, Title, List, SubmitButton, ListDetail } from './styles';

export default function Menu({ navigation }) {
  const dispatch = useDispatch();

  const [vendasupervisor, setVendaSupervisor] = useState([]);

  const [loading, setLoading] = useState(false);

  const [dataIni, setDataIni] = useState(new Date());

  const [dataFim, setDataFim] = useState(new Date());

  // useEffect(() => {}, []);

  async function buscaVendaSupervisor() {
    try {
      setLoading(true);
      const response = await api.get('vendasupervisor', {
        
        params: {
          dataIni: format(dataIni, "dd'-'MM'-'yyyy", { locale: enUS }),
          dataFim: format(dataFim, "dd'-'MM'-'yyyy", { locale: enUS }),
        },
      });

      //   console.tron.log(navigation);
      setLoading(false);
      setVendaSupervisor(response.data);
    } catch (error) {
      setLoading(false);

      Alert.alert('Erro', error.response.data.error);

      if (error.response.data.error === 'Token Invalido ') {
        Alert.alert('Erro', 'Acesso Expirado. Faça login novamente!', [
          { text: 'Ok', onPress: () => dispatch(signOut()) },
        ]);
      }
    }

    // gravando a data selecionada na pesquisa no storage

    //   AsyncStorage.setItem('dataIni', JSON.stringify(dataIni));
    //   AsyncStorage.setItem('dataFim', JSON.stringify(dataFim));
  }

  //  function teste() {
  //    navigation.navigate('Vendarca');
  // }

  return (
    <Background>
      <Container>
        <Title> Pesquisar Vendas </Title>
        <DateInput date={dataIni} onChange={setDataIni} />
        <DateInput date={dataFim} onChange={setDataFim} />
        <SubmitButton loading={loading} onPress={buscaVendaSupervisor}>
          Pesquisar
        </SubmitButton>
        <List
          data={vendasupervisor}
          keyExtractor={item => String(item.CODSUPERVISOR)}
          renderItem={({ item }) => (
            <ListDetail
              onPress={() =>
                navigation.navigate('Vendarca', { item, dataIni, dataFim })
              }
            >
              <Supervisores data={item} />
            </ListDetail>
          )}
        />
      </Container>
    </Background>
  );
}
