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

export default function Rca({ data }) {
  const percmeta =
    (parseFloat(data.VLVENDA) / parseFloat(data.VLVENDAPREV)) * 100;

  return (
    <Container>
      <Left>
        <Info>
          <Codigo>{data.CODUSUR}</Codigo>
          <Nome>{data.NOME}</Nome>
          <Vlvenda>
            Valor da Venda:{' '}
            {parseFloat(data.VLVENDA).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              currencyDisplay: 'symbol',
            })}
          </Vlvenda>
          <Vlmeta>
            Valor da Meta:{' '}
            {parseFloat(data.VLVENDAPREV).toLocaleString('pt-BR', {
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
