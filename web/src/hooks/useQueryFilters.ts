import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Se estiver usando React Router v6

// Hook personalizado para manipular filtros e parâmetros de consulta
export function useQueryFilters() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse dos parâmetros de consulta para um objeto
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  // Definir um filtro
  const setFilter = (filterName: string, value: string) => {
    const newQueryParams = new URLSearchParams(location.search);
    if (value) {
      newQueryParams.set(filterName, value);
    } else {
      newQueryParams.delete(filterName);
    }
    navigate(`${location.pathname}?${newQueryParams.toString()}`, {
      replace: true,
    });
  };

  // Obter um filtro
  const getFilter = (filterName: string) => queryParams.get(filterName);

  // Obter todos os filtros como objeto
  const getAllFilters = () => {
    const filters: any = {};
    queryParams.forEach((value, key) => {
      filters[key] = value;
    });
    return filters;
  };

  return { setFilter, getFilter, getAllFilters };
}
