export async function sendEmail(templateName: string, variables: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        templateName,
        variables
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error al enviar el correo:', error);
      return { success: false, error };
    }

    const data = await response.json();
    console.log('Correo enviado exitosamente:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Error de red o servidor:', err);
    return { success: false, error: err };
  }
}
