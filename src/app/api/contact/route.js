import { PROFILE } from '@/data/profile';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'That email address doesn\'t look right.' }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      // Graceful fallback: tell the client to use mailto instead.
      return Response.json({ configured: false });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: PROFILE.email,
        reply_to: email,
        subject: `New message from ${name} via your portfolio`,
        text: `From: ${name} (${email})\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Resend error:', errBody);
      return Response.json({ error: 'Message could not be sent right now.' }, { status: 502 });
    }

    return Response.json({ sent: true, configured: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
