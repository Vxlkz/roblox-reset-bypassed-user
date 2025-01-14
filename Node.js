const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for client-side access
app.use(cors());
app.use(express.json());  // to parse JSON body from client requests

// POST endpoint to get the user ID based on the username
app.post('/get-user-id', async (req, res) => {
  const username = req.body.username;

  // Roblox API endpoint for fetching user ID
  const url = 'https://users.roblox.com/v1/usernames/users';
  const requestBody = {
    'usernames': [username],
    'excludeBannedUsers': true
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const userData = response.data;

    if (userData.data && userData.data.length > 0) {
      const userId = userData.data[0].id;
      const userName = userData.data[0].name;

      // Fetch the Last Online time for the user
      const lastOnlineResponse = await axios.get(`https://rblx.trade/api/v2/users/${userId}/last-online`);
      const lastOnline = lastOnlineResponse.data.data.last_online;

      res.json({ userId, userName, lastOnline });
    } else {
      res.status(404).json({ message: 'User not found or banned' });
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({ message: 'Error fetching user ID.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
