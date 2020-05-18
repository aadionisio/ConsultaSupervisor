import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.View`
  flex: 1;

  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;

  display: flex;
  flex-direction: row;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 10px;
`;

export const ListDetail = styled(RectButton)`
  margin-bottom: 15px;
  padding: 0px;
  border-radius: 4px;
  background: #fff;

  /*  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
`;

export const Header = styled.View`
  flex: 1;
`;

export const Detail = styled.View`
  flex: 1;
`;

export const ButtonBack = styled(Button)`
  padding: 0 15px;
  height: 48px;

  border-radius: 4px;
  margin: 10px 30px;
  flex-direction: row;
  align-items: center;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
