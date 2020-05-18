import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1; /* ocupa todo o espaço possivel */
  font-size: 15px; /* tamanho da fonte */
  margin-left: 10px; /* espaço entre o inicio do texto e a borda do componente a esquerda*/
  color: #fff; /* cor do texto */
`;
