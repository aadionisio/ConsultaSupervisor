import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Resume,
  Filial,
  Rca,
  Cliente,
  Produto,
  Percdesc,
  SubmitButton,
} from './styles';
import Background from '~/components/Background';

export default function Confirm({ navigation }) {
  const [loading, setLoading] = useState(false);

  const dadosfilial = navigation.getParam('filial');
  const dadosrca = navigation.getParam('rca');
  const dadoscliente = navigation.getParam('cliente');

  const percdesc = navigation.getParam('perdesc');
  const dadosproduto = navigation.getParam('produto');

  // console.tron.log(dadosfilial);
  // console.tron.log(dadosrca);
  // console.tron.log(dadoscliente);
  // console.tron.log(percdesc);
  // console.tron.log(dadosproduto);

  async function confirmDesconto() {
    try {
      setLoading(true);
      const response = await api.post('desconto', {
        params: {
          codfilial: dadosfilial.data[0].CODIGO,
          codprod: String(dadosproduto.data[0].CODPROD),
          codcli: String(dadoscliente.data[0].CODCLI),
          codusur: String(dadosrca.data[0].CODUSUR),
          percdesc,
        },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', err.response.data.error);
    }

    Alert.alert('Sucesso', 'Desconto cadastrado com Sucesso!', [
      { text: 'Ok', onPress: () => navigation.navigate('Menu') },
    ]);
  }

  function checkConfirm() {
    Alert.alert(
      // t itle
      'Confirmação',
      // body
      'Confirma o envio da autorização de desconto conforme os dados descritos?',
      [
        { text: 'Sim', onPress: () => confirmDesconto() },
        { text: 'Não', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: false }
      // clicking out side of alert will not cancel
    );
  }

  return (
    <Background>
      <Container>
        <Resume>
          <Filial>
            Filial: {dadosfilial.data[0].CODIGO} -
            {dadosfilial.data[0].RAZAOSOCIAL}
          </Filial>
          <Rca>
            Vendedor: {dadosrca.data[0].CODUSUR} - {dadosrca.data[0].NOME}
          </Rca>
          <Cliente>
            Cliente: {dadoscliente.data[0].CODCLI} -{' '}
            {dadoscliente.data[0].CLIENTE}{' '}
          </Cliente>
          <Produto>
            Produto: {dadosproduto.data[0].CODPROD} -
            {dadosproduto.data[0].DESCRICAO}
          </Produto>
          <Percdesc>Desconto Autorizado: {percdesc}%</Percdesc>
        </Resume>
        <SubmitButton onPress={checkConfirm}>
          Confirmar Autorização
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Resumo da Solicitação',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectDados');
      }}
    >
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});
