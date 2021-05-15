import React, { FC, ReactElement, useState } from 'react';
import { apiLogin } from '../core/api/api';
import styled from 'styled-components';
import { message, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';


const Wrapper = styled.div`
  display: flex;
`;
const Book = styled.div`
  border: 1px solid gray;
  padding: 6px;
`;

const Price = styled.div`
  display: flex;
  justify-content: end;
  height: 30px;
  align-items: center;

  > span {
    font-weight: 600;
    font-size: 18px;
  }
`;

export const Login: FC = (): ReactElement => {
  const [ { username, password }, setUser ] = useState<{
    username: string;
    password: string;
  }>({} as {
    username: string;
    password: string;
  });
  const history = useHistory();

  const login = () => {
    apiLogin({
      password,
      name: username,
    }).then(() => {
      history.push('/');
    }, () => message.error('登录失败'))
  };
  
  return (
    <div>
      <h2>登录</h2>
      <div>
        <Input placeholder="请输入用户名" value={username} onChange={e => setUser({username: e.target.value, password})} />
      </div>
      <div>
        <Input placeholder="请输入密码" value={password} onChange={e => setUser({username, password: e.target.value})} />
      </div>
      <div>
        <Button onClick={() => history.push('/register')}>注册</Button>
        <Button onClick={login}>登录</Button>
      </div>      
    </div>
  );
};