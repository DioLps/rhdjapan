import { env } from "@/env";

export default class CurrencyService {
  public static convert(
    to: string,
    from: string,
    amount: number
  ): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("apikey", env.exchangeSecret);
    return fetch(
      env.exchangeBaseUrl + `/convert?to=${to}&from=${from}&amount=${amount}`,
      {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      }
    )
      .then((res) => res.json())
      .then((res) => res?.result || 0);
  }
}
