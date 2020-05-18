import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Resume = styled.View`
  margin-top: 45px;

  border-radius: 4px;
  background: #fff;

  border-style: solid;
  border-width: 5px;
  border-color: #fff;

  width: 100%;
  height: 220px;
`;

export const Filial = styled.Text`
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Rca = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Cliente = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Produto = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Percdesc = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 50px;
`;
