import { useEffect, useState } from 'react';
import axios from 'axios';

function PeopleList() {
  const [people, setPeople] = useState([]);

  const fetchPeople = () => {
    axios.get('http://localhost:5000/api/people')
      .then(res => setPeople(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchPeople(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      await axios.delete(`http://localhost:5000/api/people/${id}`);
      fetchPeople();
    }
  };

  const handleEdit = async (person) => {
    const newName = prompt("Yeni İsim:", person.full_name);
    const newEmail = prompt("Yeni E-posta:", person.email);
    if (newName && newEmail) {
      await axios.put(`http://localhost:5000/api/people/${person.id}`, {
        full_name: newName,
        email: newEmail
      });
      fetchPeople();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Kayıtlı Kişiler</h2>
      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>İsim</th><th>E-posta</th><th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {people.map(p => (
            <tr key={p.id}>
              <td>{p.full_name}</td>
              <td>{p.email}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Düzenle</button>
                <button onClick={() => handleDelete(p.id)} style={{color: 'red', marginLeft: '5px'}}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PeopleList;