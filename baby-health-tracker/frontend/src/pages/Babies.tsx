import { useEffect, useState } from 'react';
import api from '../services/api';

interface Baby {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

function Babies() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await api.get('/babies');
        setBabies(response.data.data);
      } catch (error) {
        console.error('Error fetching babies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBabies();
  }, []);

  if (loading) return <p>Loading babies...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Babies</h2>

      {babies.length === 0 && <p>No babies found.</p>}

      <ul>
        {babies.map((baby) => (
          <li key={baby.id}>
            {baby.firstName} {baby.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Babies;
