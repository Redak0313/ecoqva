'use client';
import { useCart } from 'components/cart/cart-context';
import { handleBooking } from 'components/cart/save-booking';
import { sendEmail } from 'components/email/send-email';
import { useUser } from 'context/user-context';
import { Cart } from 'lib/shopify/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useBookings = () => {
  const { user } = useUser();
  const { clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const bookItems = async (cart: Cart) => {
    setLoading(true);
    if (!cart?.lines) {
      toast.error(
        'Ocurrió un error al encontrar los artículos de tu carrito, por favor recarga la página.',
        {
          id: 'cart-error-toast',
          duration: 1200
        }
      );
      setLoading(false);
      return;
    }

    if (!user.email) {
      toast.error('Debes iniciar sesión para realizar una reserva.', {
        id: 'cart-error-toast',
        duration: 1200,
        onDismiss: () => router.push('/login'),
        onAutoClose: () => router.push('/login')
      });
      setLoading(false);
      return;
    }

    const { success, error, orderId, name } = await handleBooking(cart, user.email);

    if (!success) {
      toast.error('Ocurrió un error al realizar el pedido: ' + error, {
        id: 'cart-error-toast',
        duration: 1200
      });
      setLoading(false);
      return;
    }

    clearCart();
    toast.success('Reserva realizada con éxito!', {
      id: 'welcome-toast',
      duration: 1200
    });

    let adminEmails = [`${user.email}`];
    const settledEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (settledEmails?.length) {
      adminEmails.push(...(settledEmails || []));
    }

    const variables = {
      cart,
      to: adminEmails,
      subject: 'RESERVA REALIZADA',
      customerName: name,
      customerEmail: user.email,
      orderId: orderId,
      orderDate: Date.now().toString()
    };

    sendEmail('AdminOrderEmailTemplate', variables)
      .catch((err) => {
        toast.error(
          'Ocurrió un error al enviar el correo con los datos de la reserva, contacta un administrador',
          {
            id: 'welcome-toast',
            duration: 1200
          }
        );
        setLoading(false);
      })
      .then(() => {
        toast.success('Hemos enviado los datos del pedido a tu email', {
          id: 'welcome-toast',
          duration: 1200
        });
        setLoading(false);
      });
  };
  return { bookItems, loading };
};
