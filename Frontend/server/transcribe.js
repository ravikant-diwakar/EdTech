import express from 'express';
import cors from 'cors';
import fs from 'fs';
import formidable from 'formidable';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

if (!DEEPGRAM_API_KEY) {
  console.error('❌ Missing Deepgram API key! Set DEEPGRAM_API_KEY in your .env file.');
  process.exit(1);
}

app.use(cors());

app.post('/transcribe', (req, res) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form error' });
    }

    const file = files.file;
    if (!file || Array.isArray(file)) {
      console.error('Invalid or missing file in request.');
      return res.status(400).json({ error: 'Invalid file' });
    }

    try {
      const buffer = fs.readFileSync(file.filepath);

      const formData = new FormData();
      formData.append('audio', buffer, {
        filename: file.originalFilename || 'recording.webm',
        contentType: file.mimetype || 'audio/webm',
      });

      console.log('Sending audio to Deepgram API...');

      const response = await fetch('https://api.deepgram.com/v1/listen?punctuate=true', {
        method: 'POST',
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          ...formData.getHeaders(),
        },
        body: formData,
      });

      console.log('Deepgram API response status:', response.status);

      if (!response.ok) {
        // Try to get error message from Deepgram response
        const errorText = await response.text();
        console.error('Deepgram API error:', errorText);
        return res.status(500).json({ error: 'Deepgram API error', details: errorText });
      }

      const data = await response.json();

      console.log('Deepgram API response data:', data);

      const transcript = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

      res.json({ transcript });
    } catch (e) {
      console.error('Transcription failed:', e);
      res.status(500).json({ error: 'Transcription failed', details: e.message });
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
