import { AdminOrderEmailTemplate } from 'components/email/admin-new-booking-template';
import { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { templateName, variables } = await req.json();
    console.log('🚀 ~ POST ~ variables:', variables);

    let selectedTemplate: ReactNode;
    switch (templateName) {
      case 'AdminOrderEmailTemplate':
        selectedTemplate = AdminOrderEmailTemplate(variables);
        break;
      // Otros templates aquí
      default:
        throw new Error(`Template "${templateName}" no encontrado.`);
    }

    const { data, error } = await resend.emails.send({
      from: 'informacion@support.ecoqva.com',
      to: variables.to,
      subject: variables.subject || 'Notificación de EcoQva',
      react: selectedTemplate
    });

    if (error) {
      console.error('Error desde Resend:', error);
      return new Response(
        JSON.stringify({
          error:
            'Hubo un problema al enviar el correo. Verifica los detalles del template y destinatario.'
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('Error en el servidor:', err);
    return new Response(JSON.stringify({ error: err }), { status: 400 });
  }
}
