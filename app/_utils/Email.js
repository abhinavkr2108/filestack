import { sendEmailTemplate } from '@/components/dashboard/files/EmailTemplate';
import * as handlebars from 'handlebars';

export default function compileEmailTemplate(    
    userName,
    fileTitle,
    fileSize,
    fileUrl,
    fileType,
){
    const template = handlebars.compile(sendEmailTemplate);
    const htmlBody = template({
        userName,
        fileTitle,
        fileSize,
        fileUrl,
        fileType,
    })

    return htmlBody;

}