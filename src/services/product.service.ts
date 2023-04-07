import { ProductModel } from "@/store/products.slice";
import { env } from "@/env";

export default class ProductService {
  public static getList(): Promise<Array<ProductModel>> {
    return fetch(env.fakestoreBaseurl + "?limit=10").then((res) => res.json());
  }

  public static getProductById(id: number): Promise<ProductModel> {
    return fetch(env.fakestoreBaseurl + "/" + id).then((res) => res.json());
  }
}
