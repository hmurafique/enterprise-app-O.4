const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.get('/api/users', (req, res) => {
  res.json([{ id:1, name:'Alice' }, { id:2, name:'Bob' }]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
