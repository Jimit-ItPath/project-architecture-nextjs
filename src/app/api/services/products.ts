export type ProductPayload = {
  title: string;
  price: number;
  type?: string;
  category?: string;
  brand?: string;
};

const BASE = 'https://fakestoreapi.com';

export async function createProduct(payload: ProductPayload) {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(
  id: number | string,
  payload: Partial<ProductPayload>
) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: number | string) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}
