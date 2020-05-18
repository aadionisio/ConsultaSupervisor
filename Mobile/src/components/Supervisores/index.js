import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Left,
  Info,
  Codigo,
  Nome,
  Vlvenda,
  Vlmeta,
  Percmeta,
} from './styles';

export default function Supervisores({ data }) {
  const percmeta = (parseFloat(data.VENDA) / parseFloat(data.META)) * 100;

  return (
    <Container>
      <Left>
        <Info>
          <Codigo>{data.CODSUPERVISOR}</Codigo>
          <Nome>{data.NOME}</Nome>
          <Vlvenda>
            Valor da Venda:{' '}
            {parseFloat(data.VENDA).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              currencyDisplay: 'symbol',
            })}
          </Vlvenda>
          <Vlmeta>
            Valor da Meta:{' '}
            {parseFloat(data.META).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              currencyDisplay: 'symbol',
            })}
          </Vlmeta>
          <Percmeta>
            Perc.Meta: {parseFloat(percmeta).toLocaleString('pt-BR')}%
          </Percmeta>
        </Info>
      </Left>
    </Container>
  );
}
