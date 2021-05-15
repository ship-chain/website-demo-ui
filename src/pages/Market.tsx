import { BookEntity } from '@ship-website-demo/common';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { apiGetBooks } from '../core/api/api';
import styled from 'styled-components';

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

export const Market: FC = (): ReactElement => {
  const [ books, setBooks ] = useState<BookEntity[]>([]);

  useEffect(() => {
    apiGetBooks().then(books => setBooks(books))
  }, []);
  
  return (
    <Wrapper>
      {
        books.map(book =>
          <Book key={book.uuid}>
            <h4>{book.title}</h4>
            <p>{book.description}</p>
            <Price>
              <span>{book.price}</span>
            </Price>
          </Book>
        )
      }
    </Wrapper>
  );
};