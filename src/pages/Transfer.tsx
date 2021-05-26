import { BookEntity } from '@ship-website-demo/common';
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { apiBuyBook, apiGetBooks } from '../core/api/api';
import styled from 'styled-components';
import { GlobalContext } from '../core/context/global-context';
import { Button, message } from 'antd';
import Web3 from 'web3';
import ERC721 from './ERC721.json';

const Wrapper = styled.div`
`;
const Book = styled.div`
  width: 350px;
  margin: 30px;
  border: 1px solid gray;
  padding: 15px 20px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;

  > span {
    margin-right: 10px;
    font-weight: 600;
    font-size: 18px;
  }
`;
const T = styled.div`
  display: flex;
  align-items: center;

`;
const Address = styled.div`

`;

type Book = BookEntity & {
  owned: boolean;
};

export const Transfer: FC = (): ReactElement => {
  const [ addr1, addr2 ] = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xdd2fd4581271e230360230f9337d5c0430bf44c0'];

  const transfer = async () => {
    let web3Provider;
    if((window as any).ethereum) {
      web3Provider = (window as any).ethereum;
      try{
      // 请求用户授权
        (window as any).ethereum.enable();
      }catch(error) {
        // 用户不授权时
        console.error("User denied account access")
      }
    }

    const web3js = new Web3(web3Provider);//web3js就是你需要的web3实例
    console.log('Web3',  Web3.givenProvider);
    
    const contract = new web3js.eth.Contract(ERC721.abi as any, '0x4EE6eCAD1c2Dae9f525404De8555724e3c35d07B');
    const balance = await contract.methods.balanceOf(addr1).call();
    const owner = await contract.methods.ownerOf(1).call();
    console.log('balance', balance, 'owner', owner, typeof balance);
    
    if (balance === '1') {
      const a = await contract.methods.getSender(addr1, 1).call();
      const b = await contract.methods.getOwner(addr1, 1).call();
      console.log('sender owner', a, b);
      await contract.methods.transferFrom(addr1, addr2, 1).send();
      message.success('转移成功');
    } else {
      await contract.methods.transferFrom(addr2, addr1, 1).send();
      message.success('转移成功');
    }
    // web3js.eth.getAccounts(async (error: any, result) => {
    //   if(!error)
    //     console.log('result', result)//授权成功后result能正常获取到账号了
    //     const contract = new web3js.eth.Contract(ERC721.abi as any, '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e');
    //     await contract.methods.safeMint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', book.uuid).call();
    //     message.success('该资产已上链');
    //     // const balance = await contract.methods.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266').call();
    //     // console.log('balance', balance);
    //     // const res2 = await contract.methods.getResourceKey(1).call();
    //     // // const res3 = await contract.methods.getResourceKey(3).call();
    //     // const res3 = await contract.methods.ownerOf(1).call();
    //     // console.log('res', [res2, res3]);
    // });
  };

  useEffect(() => {}, []);
  
  return (
    <Wrapper>
      <h2>资产转移</h2>
      <T>
        <Address>{addr1}</Address>
        <Button style={{ margin: '0px 20px'}} onClick={transfer}>转移至</Button>
        <Address>{addr2}</Address>
      </T>
    </Wrapper>
  );
};

