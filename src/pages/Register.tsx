import { Button, Input, message } from 'antd';
import React, { FC, ReactElement, useState } from 'react';
import { apiRegister } from '../core/api/api';

export const Register: FC = (): ReactElement => {
  const [ { username, password }, setUser ] = useState<{
    username: string;
    password: string;
  }>({} as {
    username: string;
    password: string;
  });

  const register = () => {
    apiRegister({
      password,
      name: username,
    }).then(() => message.success('创建成功'), () => message.error('创建失败'))
  };
  
  return (
    <div>
      <h2>注册</h2>
      <div>
        <Input placeholder="请输入用户名" value={username} onChange={e => setUser({username: e.target.value, password})} />
      </div>
      <div>
        <Input placeholder="请输入密码" value={password} onChange={e => setUser({username, password: e.target.value})} />
      </div>
      <div>
        <Button onClick={register}>注册</Button>
      </div>      
    </div>
  );
};