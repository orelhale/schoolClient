
import { useRef, useState } from 'react';
import styles from './style.module.css';
import emailjs from '@emailjs/browser';
import globalElement from '../../../globalStyle/globalElement.module.css';
import boxElement from '../../../globalStyle/boxElement.module.css';

function Email({ afterSended, email = "", name = "" }) {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ggm3dfu', 'template_v1vf96r', form.current, 'i-URDHLnKewji6jcH')
      .then((result) => {
        console.log(result.text);
        afterSended && afterSended()
        // e.target.reset
      }, (error) => {
        console.log(error.text);
      });
  };

  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  //   try {
  //     const response = await fetch('http://localhost:4000/email/send-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         recipient: recipient,
  //         subject: subject,
  //         text: text,
  //       }),
  //     });

  //     if (response.ok) {
  //       console.log('Email sent successfully');
  //     } else {
  //       console.error('Error sending email');
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // };

  return (
    <>
      <div className={styles.emailContainer}>
        <form className={styles.emailContainer} ref={form} onSubmit={sendEmail}>
          <input className={styles.input} placeholder='Name' defaultValue={name} type="text" name="user_name" />

          <input className={styles.input} placeholder='Email' defaultValue={email} type="email" name="user_email" required />
          <input className={styles.input} placeholder='Subject' type="text" name="subject" />

          <textarea className={styles.textarea} rows={5} placeholder='Message' name="message" />
          
          <div className={boxElement.textAline_center}>
            <button className={globalElement.button} type="submit" value="Send" >Send</button>
          </div>
        </form>

      </div>
    </>
  );
};

export default Email;



  // const handleSendEmail = async () => {
