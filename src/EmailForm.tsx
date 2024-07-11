import React, { useState } from "react";
import emailjs from "emailjs-com";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_email: email, message: message },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setStatus("Wiadomość wysłana pomyślnie!");
        },
        (error) => {
          console.error("Błąd wysyłania emaila:", error.text);
          setStatus(
            `Wystąpił błąd podczas wysyłania wiadomości: ${error.text}`
          );
        }
      );
  };

  return (
    <form onSubmit={sendEmail}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Wiadomość:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Wyślij</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default EmailForm;
