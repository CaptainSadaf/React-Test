import axios from 'axios';
import { mapProducts } from './utils';

export const getProducts = async (pageNo = 1, limit = 15) => {
    const products = await axios(`/products?_page=${pageNo}&_limit=${limit}`);
    return mapProducts(products.data)
}