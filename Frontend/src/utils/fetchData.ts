async function fetchData(fetcFunc: () => any) {
  const fetchPromise = fetcFunc();

  const [fetchesponse] = await Promise.all([fetchPromise, ,]);

  return fetchesponse;
}

export { fetchData };
