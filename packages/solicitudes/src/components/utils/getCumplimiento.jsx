import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function useCumplimiento(modalidad, puntuacion, fetchCumplimiento) {
  const { session, setNoti } = useContext(Context);
  const token = getToken();

  const [cumplimiento, setCumplimiento] = useState({});
  const [loading, setLoading] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session && fetchCumplimiento && modalidad && puntuacion !== undefined) {
      setLoading(true);

      fetch(
        `${url}/api/v1/evaluaciones/cumplimiento?puntuacion=${puntuacion}&modalidad=${modalidad}`,
        {
          method: 'GET',
          headers: {
            api_key: apikey,
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCumplimiento(data.data || {});
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          setNoti({
            open: true,
            message: 'Algo salio mal al cargar el cumplimiento',
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session, fetchCumplimiento, modalidad, puntuacion]);

  return {
    cumplimiento,
    loading,
  };
}
