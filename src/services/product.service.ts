import { ProductModel } from "@/store/products.slice";

export default class ProductService {
  public static getList(): Promise<Array<ProductModel>> {
    return fetch("https://fakestoreapi.com/products?limit=10").then((res) =>
      res.json()
    );
  }

  public static getProductById(id: number): Promise<ProductModel> {
    return fetch("https://fakestoreapi.com/products/" + id).then((res) =>
      res.json()
    );
  }
}
