import React, { useEffect } from "react";
const UseFetch = (url) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { data, loading };
};

export default UseFetch;
