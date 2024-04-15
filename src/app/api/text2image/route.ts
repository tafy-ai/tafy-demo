export default async function handler(req, res) {
    const text = req.query.text;
  
    if (!text) {
      res.status(400).json({ error: 'Text parameter is required' });
      return;
    }
  
    const workerResponse = await fetch(`${process.env['APP_URL']}/api/text2image?text=${encodeURIComponent(text)}`);
  
    if (!workerResponse.ok) {
      res.status(workerResponse.status).json({ error: await workerResponse.text() });
      return;
    }
  
    const imageData = await workerResponse.arrayBuffer();
  
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(Buffer.from(imageData));
  }
  