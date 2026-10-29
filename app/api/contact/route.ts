import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

const recipient=process.env.CONTACT_TO||'business@miraistage.com';
function escapeHtml(value:string){return value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]||char));}

export async function POST(req:Request){
  try{
    const contentType=req.headers.get('content-type')||'';
    const body=contentType.includes('application/json')?await req.json():Object.fromEntries((await req.formData()).entries());
    const name=String(body?.name||'').trim().slice(0,120);
    const email=String(body?.email||'').trim().slice(0,254);
    const subject=String(body?.subject||'Website enquiry').trim().slice(0,200);
    const message=String(body?.message||'').trim().slice(0,5000);
    if(!email||!message)return NextResponse.json({ok:false,error:'email and message are required'},{status:400});
    if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS)return NextResponse.json({ok:false,error:'Contact email is not configured yet.'},{status:503});
    const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||465),secure:(process.env.SMTP_SECURE||'true')==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
    const text=[`Name: ${name||'-'}`,`Email: ${email}`,`Subject: ${subject}`,``,message].join('\n');
    const sender=process.env.SMTP_USER;
    await transporter.sendMail({from:sender,to:recipient,replyTo:email,subject:`[Mirai Stage] ${subject}`,text,html:`<p><strong>Name:</strong> ${escapeHtml(name||'-')}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p>${escapeHtml(message).replace(/\n/g,'<br>')}</p>`});
    return NextResponse.json({ok:true,message:'收到您的訊息，我們會盡快聯絡您。'});
  }catch(error){
    console.error('Contact email failed',error);
    return NextResponse.json({ok:false,error:'Unable to send the message right now.'},{status:500});
  }
}
