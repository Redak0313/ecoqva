import { Cart } from 'lib/shopify/types';

export async function handleBooking(cart: Cart, email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cart, email })
  });

  const result = await response.json();

  if (response.ok) {
    return { success: true, orderId: result.data.order_id, name: result.name };
  } else {
    return { success: false, error: result.error };
  }
}
