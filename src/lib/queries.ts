export const queries = {
  fetchProductsData: async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://fakestoreapiserver.reactbd.org/api/products?page=${pageParam}&perPage=20`,
      { cache: 'no-store' }
    );
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    const { data: products, perPage, totalPages, totalProducts } = data;
    return {
      items: products,
      nextPage: pageParam + 1,
      hasMore: pageParam < totalPages,
      totalPages,
      totalProducts,
      perPage,
    };
  },
};
