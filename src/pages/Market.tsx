import { BookEntity } from '@ship-website-demo/common';
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { apiBuyBook, apiGetBooks } from '../core/api/api';
import styled from 'styled-components';
import { GlobalContext } from '../core/context/global-context';
import { Button, message } from 'antd';

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
  justify-content: end;
  height: 30px;
  align-items: center;

  > span {
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
    console.log('books from user', user?.books);
  }, [user]);
  
  return (
    <Wrapper>
      {
        books.map(book =>
          <Book key={book.uuid}>
            <h4>{book.title}</h4>
            <BookInfo>{book.author} / {book.publishOrg} / {book.publishTime} </BookInfo>
            <Price>
              <span>{book.price}</span>
              {
                book.owned ?
                  'Owned'
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