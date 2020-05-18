import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import api from '~/services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import { Container, Form, FormInput, SubmitButton, Picker } from './styles';

export default function SelectDados({ navigation }) {
  const [codfilial, setCodfilial] = useState('');
  const [loading, setLoading] = useState(false);

  const [codusur, setCodusur] = useState('');
  const [codcli, setCodcli] = useState('');
  const [codprod, setCodprod] = useState('');
  const [perdesc, setPerdesc] = useState('');
  // fazendo correcao tirando os caracteres invalidos que o usuario digita
  useEffect(() => {
    setCodusur(codusur.replace(/([,. -])/g, ''));
  }, [codusur]);

  useEffect(() => {
    setCodcli(codcli.replace(/([,. -])/g, ''));
  }, [codcli]);

  useEffect(() => {
    setCodprod(codprod.replace(/([,. -])/g, ''));
  }, [codprod]);

  useEffect(() => {
    setPerdesc(perdesc.replace(/([,. -])/g, ''));
  }, [perdesc]);

  async function handleGetInfoApi() {
    setLoading(true);
    try {
      if (codfilial === '') {
        Alert.alert('Erro', 'Informe a Filial!');
        setLoading(false);
        return;
      }

      const filial = await api.get('filial', {
        params: {
          codfilial,
        },
      });

      // buscando dados da filial

      if (codusur === '') {
        Alert.alert('Erro', 'Informe o vendedor!');
        setLoading(false);
        return;
      }
      // buscando dados do vendedor

      const rca = await api.get('rca', {
        params: {
          codusur,
        },
      });
      // validando se o vendedor existe na base

      if (rca.data.length === 0) {
        Alert.alert(
          'Erro',
          'Vendedor informado não localizado. Verifique e tente novamente!'
        );
        setLoading(false);
        return;
      }
      // validar se o vendedor está inativo

      //  console.tron.log(rca.data[0].DTTERMINO);

      if (rca.data[0].DTTERMINO != undefined) {
        Alert.alert(
          'Erro',
          'Vendedor está Inativo. Verifique o codigo informado!'
        );
        setLoading(false);
        return;
      }

      //console.tron.log(contagem);

      if (codcli === '') {
        Alert.alert('Erro', 'Informe o Cliente!');
        setLoading(false);
        return;
      }
      // buscando dados do CLIENTE

      const cliente = await api.get('cliente', {
        params: {
          codcli,
          codusur,
        },
      });

      // validando se retornou algum resultado

      if (cliente.data.length === 0) {
        Alert.alert(
          'Erro',
          'Cliente informado não localizado. Confirmar se o cliente pertence a base do rca informado no campo anterior!'
        );
        setLoading(false);
        return;
      }

      if (codprod === '') {
        Alert.alert('Erro', 'Informe o Produto!');
        setLoading(false);
        return;
      }
      // buscando dados do PRODUTO

      const produto = await api.get('produto', {
        params: {
          codfilial,
          codprod,
        },
      });

      //  console.tron.log(produto);

      // validando se retornou algum resultado

      if (produto.data.length === 0) {
        Alert.alert(
          'Erro',
          'Produto informado não localizado. Confirmar se o codigo informado está correto!!'
        );
        setLoading(false);
        return;
      }

      if (produto.data[0].FORALINHA === 'S') {
        Alert.alert(
          'Erro',
          'O Produto informado está fora de linha. Verifique o codigo informado!'
        );
        setLoading(false);
        return;
      }

      // validando o desconto informado
      //  console.tron.log(perdesc);
      if (perdesc <= 0 || perdesc > 3) {
        Alert.alert(
          'Erro',
          'O Percentual informado deve ser maior que zero e o maximo é 3%!'
        );
        setLoading(false);
        return;
      }

      // dando tudo certo.. chamar a tela de confirmação enviando todas as informações coletadas
      setLoading(false);
      navigation.navigate('Confirm', {
        rca,
        produto,
        filial,
        cliente,
        perdesc,
      });
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <Picker
            selectedValue={codfilial}
            onValueChange={itemValor => setCodfilial(itemValor)}
          >
            <Picker.Item label="          Escolha a filial" value="" />
            <Picker.Item label="          4 - Evandro Comercial" value="4" />
            <Picker.Item label="          5 - Evandro Distribuição" value="5" />
          </Picker>

          <FormInput
            icon="sentiment-satisfied"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o codigo do RCA"
            returnKeyType="next"
            value={codusur}
            onChangeText={setCodusur}
          />

          <FormInput
            icon="sentiment-satisfied"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o codigo do cliente"
            returnKeyType="next"
            value={codcli}
            onChangeText={setCodcli}
          />
          <FormInput
            icon="sentiment-satisfied"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o codigo do produto"
            returnKeyType="next"
            value={codprod}
            onChangeText={setCodprod}
          />

          <FormInput
            icon="sentiment-satisfied"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o Percentual de Desconto"
            returnKeyType="next"
            value={perdesc}
            onChangeText={setPerdesc}
          />
          <SubmitButton loading={loading} onPress={handleGetInfoApi}>
            Validar Informações
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

SelectDados.navigationOptions = ({ navigation }) => ({
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
