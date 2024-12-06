import { createClient } from 'config/supabase/clients';
import { supabaseServer } from 'config/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const client = await createClient();
    const { cart, email } = await request.json();
    if (!cart || !email) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const { id: userId, name } = await client
      .from('users')
      .select('id, name')
      .eq('email', email)
      .single()
      .then((res: { data: { id: any; name: any } }) => {
        return { id: res.data?.id, name: res.data?.name };
      });

    if (!userId) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const cartJson = JSON.stringify(cart);
    const timestamp = Date.now();
    const fileName = `carts/${userId}-${timestamp}.json`;

    const { error } = await supabaseServer.storage
      .from('carts')
      .upload(fileName, new Blob([cartJson]), {
        contentType: 'application/json',
        upsert: false
      });

    if (error) {
      console.error('Error subiendo el archivo:', error);
      return NextResponse.json({ error: 'Error al subir el archivo' }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseServer.storage.from('carts').getPublicUrl(fileName);

    if (!publicUrlData) {
      return NextResponse.json({ error: 'No se pudo obtener el enlace público' }, { status: 500 });
    }

    const publicUrl = publicUrlData.publicUrl;

    const { data, error: insertError } = await client
      .from('bookings')
      .insert([
        {
          user_id: userId,
          cart_url: publicUrl
        }
      ])
      .select();

    if (insertError) {
      console.error('Error al insertar el pedido:', error);
      return NextResponse.json({ error: 'Error al insertar el pedido' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0], name }, { status: 200 });
  } catch (error) {
    console.error('Error procesando la solicitud:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
