'use client';
import { sendEmail } from 'components/email/send-email';
import { useUser } from 'context/user-context';
import { Cart } from 'lib/shopify/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useBookings = () => {
  const { user } = useUser();
  const router = useRouter();

  const bookItems = async (cart: Cart) => {
    if (!cart?.lines) {
      toast.error(
        'Ocurrió un error al encontrar los artículos de tu carrito, por favor recarga la página.',
        {
          id: 'cart-error-toast',
          duration: 1200
        }
      );
      return;
    }

    if (!user.email) {
      toast.error('Debes iniciar sesión para realizar una reserva.', {
        id: 'cart-error-toast',
        duration: 1200,
        onDismiss: () => router.push('/login'),
        onAutoClose: () => router.push('/login')
      });
      return;
    }

    const variables = {
      cart,
      to: user.email,
      subject: 'RESERVA REALIZADA',
      customerName: user.name,
      customerEmail: 'redakdev@gmail.com',
      orderId: '123456',
      orderDate: Date.now().toString()
    };

    sendEmail('AdminOrderEmailTemplate', variables)
      .catch((err) => {
        toast.error('Ocurrió un error al realizar el pedido', {
          id: 'welcome-toast',
          duration: 1200
        });
      })
      .then(() => {
        toast.success('Hemos enviado los datos del pedido a tu email', {
          id: 'welcome-toast',
          duration: 1200
        });
      });
  };
  return { bookItems };
};
