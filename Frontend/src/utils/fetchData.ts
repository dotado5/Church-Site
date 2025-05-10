async function fetchData(fetcFunc: () => any) {
  const fetchPromise = fetcFunc();

  const [fetchResponse] = await Promise.all([fetchPromise]);

  return fetchResponse;
}

export { fetchData };
