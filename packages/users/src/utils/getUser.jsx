import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@siiges-ui/shared';

export default function getUser() {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      fetch(`${url}/api/v1/usuarios/${id}`, {
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setUser(data);
        });
      setLoading(false);
    }
  }, [router.isReady]);

  return {
    user,
    loading,
  };
}
