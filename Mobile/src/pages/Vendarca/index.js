import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';

import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import Vendedores from '~/components/Rca';

import api from '~/services/api';

import {
  Container,
  Title,
  SubTitle,
  List,
  ButtonBack,
  TitleText,
  ListDetail,
} from './styles';

export default function Vendarca({ navigation }) {
  const [vendarca, setvendaRca] = useState([]);
  const [loading, setLoading] = useState(false);

  const supervisor = navigation.getParam('item');
  const dataInicial = navigation.getParam('dataIni');
  const dataFinal = navigation.getParam('dataFim');

  useEffect(() => {
    setLoading(true);
    async function buscaVendaRca() {
      const response = await api.get(
        `vendasupervisor/${supervisor.CODSUPERVISOR}`,
        {
          params: {
            dataIni: format(dataInicial, "dd'-'MM'-'yyyy", { locale: enUS }),
            dataFim: format(dataFinal, "dd'-'MM'-'yyyy", { locale: enUS }),
          },
        }
      );
      setLoading(false);
      setvendaRca(response.data);
    }

    buscaVendaRca();
  }, []);

  /*  useEffect(() => {
    async function buscaVendaSupervisor() {
      const response = await api.get('vendasupervisor', {
        params: {
          dataIni: format(dataIni, "dd'-'MM'-'yyyy", { locale: enUS }),
          dataFim: format(dataFim, "dd'-'MM'-'yyyy", { locale: enUS }),
        },
      });

      setVendaSupervisor(response.data);
    }

    buscaVendaSupervisor();
  }, [dataIni, dataFim]);
*/

  return (
    <Background>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Container>
          <Title>
            <ButtonBack onPress={() => navigation.navigate('Menu')}>
              Voltar
            </ButtonBack>
            <TitleText> Venda Equipe </TitleText>
          </Title>
          <SubTitle> {supervisor.NOME} </SubTitle>
          <List
            data={vendarca}
            keyExtractor={item => String(item.CODUSUR)}
            renderItem={({ item }) => (
              <ListDetail>
                <Vendedores data={item} />
              </ListDetail>
            )}
          />
        </Container>
      )}
    </Background>
  );
}

Vendarca.navigationOptions = ({ navigation }) => ({
  title: 'Autorização de Desconto',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Menu');
      }}
    >
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});
