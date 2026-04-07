import axios from 'axios';

export const currencyApi = {
  getCurrencies: async () => {
    return await axios.get(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json',
    );
  },
};
