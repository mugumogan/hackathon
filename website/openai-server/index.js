const express = require('express');
const fetch = require('node-fetch');
const { create, Image } = require('@openai/api');

const app = express();
const port = process.env.PORT || 3000;

const openai = create({
  apiKey: 'YOUR_API_KEY', // Replace with your API key
});

app.post('/image-to-api', async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl; // Get the URL of the image to send
    const imageData = await fetch(imageUrl).then(res => res.buffer()); // Fetch the image data as a buffer
    const image = new Image(imageData); // Create an OpenAI Image object from the buffer
    const response = await openai.images.create(image); // Send the image to the OpenAI API
    res.json(response); // Return the API response as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

