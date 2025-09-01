import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const escola = localStorage.getItem('escola');
    const usuario = localStorage.getItem('user');

    if (escola) {
      navigate('/telainicio');
    } else if (usuario) {
      navigate('/telainicial');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default HomeRedirect;