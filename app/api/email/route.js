import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/components/dashboard/files/EmailTemplate';
import compileEmailTemplate from '../../_utils/Email';


export async function POST(req,res) {
    const response = await req.json();
    console.log("RESPONSE FROM EMAIL");
    console.log(response);

    const htmlContent = compileEmailTemplate(response.userName, response.fileTitle, response.fileSize, response.fileUrl, response.fileType);



    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: 'abhinavkr.2108@gmail.com',
            pass: 'uwpm yahp muvi bkdh'
        },
    })
    const mailOptions = {
        from: 'abhinavkr.2108@gmail.com',
        to: response.emailTo,
        subject: 'Someone wants to share file with you',
        text: response.subject,
        html: htmlContent,
    };

    try {
        let info = await transporter.sendMail(mailOptions);  
        console.log("TRY INFO");    
        return  Response.json({info});
    } catch (error) {
        console.error(error);
        return Response.json({ error });
    }

}

