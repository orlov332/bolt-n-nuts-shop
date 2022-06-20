import * as Yup from 'yup';
import { Product } from 'bolt-n-nuts-api-client/product/model/product'

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required()
});

export type { Product };
