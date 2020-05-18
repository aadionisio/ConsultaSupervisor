import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  padding: 0 30px;
  padding-top: 60px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 5px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const Picker = styled.Picker`
  margin-bottom: 10px;
  color: #fff;
  padding-left: 20px;
  align-items: center;
  background: #2e8b57;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
