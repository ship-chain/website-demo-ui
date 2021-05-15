import { API_DOMAIN } from '../../config/origin';
import { httpGet, httpPost, httpPut } from './http';
import { BookEntity, BookExtractDto, BookMintDto, UserCreatDto, UserEntity } from '@ship-website-demo/common';


export const apiLogin =
  async (dto: UserCreatDto) => await httpPost<UserEntity>(`${API_DOMAIN}/user/login`, dto);

export const apiRegister =
  async (dto: UserCreatDto) => await httpPost<UserEntity>(`${API_DOMAIN}/user/register`, dto);

export const apiGetUser =
  async () => await httpGet<UserEntity>(`${API_DOMAIN}/user/login`);

export const apiGetBooks =
  async () => await httpGet<BookEntity[]>(`${API_DOMAIN}/book/a`);

export const apiMintBook =
  async (dto: BookMintDto) => await httpPut<string>(`${API_DOMAIN}/book/mint`);

export const apiBuyBook =
  async (uuid: string) => await httpPut<string>(`${API_DOMAIN}/book/buy/${uuid}`);

export const apiExtractBook =
  async (dto: BookExtractDto) => await httpPut<boolean>(`${API_DOMAIN}/book/extract`);