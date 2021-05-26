import { BookEntity } from '@ship-website-demo/common';
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { apiBuyBook, apiGetBooks } from '../core/api/api';
import styled from 'styled-components';
import { GlobalContext } from '../core/context/global-context';
import { Button, message } from 'antd';
import Web3 from 'web3';
import ERC721 from './ERC721.json';
import { BigNumber } from "ethers";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
const BookInfo = styled.div`
  height: 45px;
  margin: 10px 0px; 
  color: gray;
`;

type Book = BookEntity & {
  owned: boolean;
};

export const Market: FC = (): ReactElement => {
  const [ books, setBooks ] = useState<Book[]>([]);
  const { user, update } = useContext(GlobalContext);

  const buy = (bookUUid: string) => {
    apiBuyBook(bookUUid).then(() => {
      message.success('购买成功');
      update();
    });
  };

  const transfer = (book: BookEntity) => {
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

    const web3js = new Web3(web3Provider);
    console.log('Web3',  Web3.givenProvider);
    web3js.eth.getAccounts(async (error: any, result) => {
      if(!error)
        console.log('result', result);
        const addr = result[0];
        const contract = new web3js.eth.Contract(ERC721.abi as any, '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');
        
        const a = await contract.methods.getSender(addr, 1).call();
        // const b = await contract.methods.getOwner(addr, 1).call();
        console.log('sender owner', a);
        // await contract.methods.safeMint(addr, 2, book.uuid).send({
        //   from: addr
        // }, (err: any, hash: any) => {
        //   console.log('err hash', err, hash);
        // });
        // const a = await contract.methods.getSender(addr, 1).call();
        // const b = await contract.methods.getOwner(addr, 1).call();
        // console.log('sender owner', a, b);
        // message.success('该资产已上链');
        // const balance = await contract.methods.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266').call();
        // console.log('balance', balance);
        // const res2 = await contract.methods.getResourceKey(1).call();
        // // const res3 = await contract.methods.getResourceKey(3).call();
        // const res3 = await contract.methods.ownerOf(1).call();
        // console.log('res', [res2, res3]);
    });
  };

  useEffect(() => {
    apiGetBooks().then(books =>
      setBooks(
        books.map(book => ({
          ...book,
          owned: !!user && !!user.books?.find(b => b.uuid === book.uuid),
          })
        )
      )
    );
  }, [user]);
  
  return (
    <Wrapper>
      {
        books.map(book =>
          <Book key={book.uuid}>
            <h4>{book.title}</h4>
            <BookInfo>{book.author} / {book.publishOrg} / {book.publishTime} </BookInfo>
            <Price>
              <span style={{
                color: book.owned ? 'gray' : 'green'
              }}>￥ {book.price}</span>
              {
                book.owned ?
                  <div>
                    <span>
                      Owned
                    </span>
                    <Button style={{ marginRight: '10px', marginLeft: '20px' }}>分享</Button>
                    <Button onClick={() => transfer(book)}>转售</Button>
                  </div>
                  :
                  <Button onClick={() => buy(book.uuid)}>Buy</Button>
              }
            </Price>
          </Book>
        )
      }
    </Wrapper>
  );
};

