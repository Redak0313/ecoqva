import { Cart } from 'lib/shopify/types';
import * as React from 'react';

interface AdminOrderEmailProps {
  cart: Cart;
  customerName: string;
  customerEmail: string;
  orderId: string;
  orderDate: string;
}

export const AdminOrderEmailTemplate: React.FC<Readonly<AdminOrderEmailProps>> = ({
  cart,
  customerName,
  customerEmail,
  orderId,
  orderDate
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.5 }}>
    <h1 style={{ color: '#0070f3' }}>Nueva Orden Recibida 🚀</h1>
    <p>
      <strong>ID de Orden:</strong> {orderId}
    </p>
    <p>
      <strong>Fecha:</strong> {orderDate}
    </p>

    <h2>Información del Cliente</h2>
    <p>
      <strong>Nombre:</strong> {customerName}
    </p>
    <p>
      <strong>Email:</strong> {customerEmail}
    </p>

    <h2>Detalles del Carrito</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '2px solid #ddd', textAlign: 'left', padding: '5px' }}>
            Producto
          </th>
          <th style={{ borderBottom: '2px solid #ddd', textAlign: 'center', padding: '5px' }}>
            Cantidad
          </th>
          <th style={{ borderBottom: '2px solid #ddd', textAlign: 'center', padding: '5px' }}>
            Opciones
          </th>
          <th style={{ borderBottom: '2px solid #ddd', textAlign: 'right', padding: '5px' }}>
            Precio Total
          </th>
        </tr>
      </thead>
      <tbody>
        {cart.lines?.map((item, index) => (
          <tr key={index}>
            <td style={{ borderBottom: '1px solid #ddd', padding: '5px' }}>
              <strong>{item.merchandise.title}</strong>
              <br />
              <img
                src={item.merchandise.product.featuredImage.url}
                alt={item.merchandise.product.featuredImage.altText || 'Producto'}
                style={{ maxWidth: '50px', maxHeight: '50px', marginTop: '5px' }}
              />
            </td>
            <td style={{ borderBottom: '1px solid #ddd', textAlign: 'center', padding: '5px' }}>
              {item.quantity}
            </td>
            <td style={{ borderBottom: '1px solid #ddd', textAlign: 'center', padding: '5px' }}>
              {item.merchandise.selectedOptions.map((option) => (
                <div key={option.name}>
                  {option.name}: {option.value}
                </div>
              ))}
            </td>
            <td style={{ borderBottom: '1px solid #ddd', textAlign: 'right', padding: '5px' }}>
              {item.cost.totalAmount.currencyCode}{' '}
              {parseFloat(item.cost.totalAmount.amount).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Total del Carrito:</h2>
    <p>
      <strong>
        {cart.lines[0]?.cost.totalAmount.currencyCode}{' '}
        {cart.lines
          .reduce((total, item) => total + parseFloat(item.cost.totalAmount.amount), 0)
          .toFixed(2)}
      </strong>
    </p>

    <footer style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
      <p>Este es un mensaje automático del sistema. No respondas a este correo.</p>
    </footer>
  </div>
);
