import { EmailTemplate } from "@/components/dashboard/files/EmailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_RESEND_EMAIL_SECRET);

export async function POST(req) {
    const response = await req.json();
    console.log("RESPONSE FROM EMAIL");
    console.log(response);
    // console.log(typeof(response.emailTo));
    // const emailTo = response.emailTo;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'abhinavkr.2108@gmail.com',
      subject: 'Someone wants to share file with you',
      react: EmailTemplate({ response }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
