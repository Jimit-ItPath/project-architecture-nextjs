export const queries = {
  fetchProductsData: async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    return data;
  },
};
