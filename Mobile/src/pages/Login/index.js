import React, { useRef, useState } from 'react';
// import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton, Image } from './styles';

export default function Login() {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(usuario, senha));
  }

  return (
    <Background>
      <Container>
        <Form>
          <Image source={logo} />

          <FormInput
            icon="sentiment-satisfied"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu usuario"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={usuario}
            onChangeText={setUsuario}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={senha}
            onChangeText={setSenha}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
