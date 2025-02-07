// Utility function to fetch metadata

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    res
      .status(500)
      .json({ error: `(fetchData) An error occurred: ${error.message}` });
  }
};

module.exports = fetchData;
