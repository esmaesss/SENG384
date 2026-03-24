import { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/people', { full_name: name, email });
      setMsg("✅ Başarıyla kaydedildi!");
      setName(''); setEmail('');
      
    } catch (err) {
      setMsg("❌ Hata: " + (err.response?.data?.error || "Sunucuya ulaşılamadı"));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Yeni Kişi Kaydı</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Tam İsim" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Kaydet</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
export default RegistrationForm;