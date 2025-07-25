import UseFetch from "./UseFetch";

const ApiDataFetch = () => {
  const { data, loading } = UseFetch("https://api.jsonplaceholder.com/data");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Fetched Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiDataFetch;
import React from 'react';
import { ThemeContext } from './ThemeContext';    