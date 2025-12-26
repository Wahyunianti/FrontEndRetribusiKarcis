import { useNavigate } from 'react-router-dom';

export function useNavigation() {
  const navigate = useNavigate();

  const goTo = (path: any, options = {}) => {
    if (!path) return;
    navigate(path, options);
  };

  return {
    goTo,
  };
}