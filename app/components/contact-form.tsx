'use client';

import {FormEvent, useRef, useState} from 'react';
import {AiOutlineArrowRight} from 'react-icons/ai';

type Labels={name:string;email:string;subject:string;message:string;namePlaceholder:string;emailPlaceholder:string;subjectPlaceholder:string;messagePlaceholder:string;send:string;success:string;error:string;sending:string};

export default function ContactForm({labels,title}:{labels:Labels;title:string}){
  const [sending,setSending]=useState(false);
  const [status,setStatus]=useState('');
  const [success,setSuccess]=useState(false);
  const submitting=useRef(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(submitting.current)return;
    const form=event.currentTarget;
    submitting.current=true;
    setSending(true); setStatus('');
    try{
      const response=await fetch('/api/contact',{method:'POST',body:new FormData(form)});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Unable to send');
      setSuccess(true); setStatus(labels.success); form.reset();
    }catch(error){setSuccess(false);setStatus(error instanceof Error&&error.message!=='Unable to send'?error.message:labels.error);}
    finally{setSending(false);submitting.current=false;}
  }
  return <form className="contact-form" onSubmit={submit}>
    <h2>{title}</h2>
    <div className="form-row"><label>{labels.name}<input name="name" placeholder={labels.namePlaceholder} required/></label><label>{labels.email}<input name="email" type="email" placeholder={labels.emailPlaceholder} required/></label></div>
    <label>{labels.subject}<input name="subject" placeholder={labels.subjectPlaceholder}/></label>
    <label>{labels.message}<textarea name="message" placeholder={labels.messagePlaceholder} required/></label>
    <button className="btn btn-primary" type="submit" disabled={sending}>{sending?labels.sending:labels.send} <AiOutlineArrowRight aria-hidden="true"/></button>
    {status&&<p className={'form-status '+(success?'is-success':'is-error')} role="status" aria-live="polite">{status}</p>}
  </form>;
}
