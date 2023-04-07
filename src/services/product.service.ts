import { ProductModel } from "@/store/products.slice";

export default class ProductService {
  public static getProducts(): Promise<Array<ProductModel>> {
    return fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error getting the products: ", error);
      });
  }

  public static getProductById(id: number): Promise<ProductModel> {
    return fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error this product couldn't be found: ", error);
      });
  }
}
