import axios from "axios";

const directusApiUrl = "https://your-directus-instance.com";
const directusApiToken = "YOUR_DIRECTUS_API_TOKEN";

// Fetch content from Directus
async function fetchDirectusContent(collection: string) {
  const response = await axios.get(`${directusApiUrl}/items/${collection}`, {
    headers: {
      Authorization: `Bearer ${directusApiToken}`,
    },
  });

  return response.data.data; // Assuming Directus returns data in this format
}

const content = await fetchDirectusContent("your_collection");
console.log(content);
