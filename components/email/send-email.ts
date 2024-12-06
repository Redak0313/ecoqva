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
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    throw err;
  }
}
