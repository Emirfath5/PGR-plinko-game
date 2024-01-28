const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Placeholder function to simulate getting opponent's balance
app.get('/getOpponentBalance', async (req, res) => {
  try {
    // Replace this with the actual logic to fetch the opponent's balance
    // You may use web3.eth.getBalance or any other appropriate method
    // Return the opponent's balance
    const opponentBalance = await fetchOpponentBalance();
    res.json({ balance: opponentBalance });
  } catch (error) {
    console.error('Error fetching opponent balance:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Placeholder function to simulate sending funds to the owner
app.post('/sendFundsToOwner', async (req, res) => {
  try {
    const amount = req.body.amount;
    // Replace this with the actual Ethereum transaction logic for sending funds to the owner
    // For simplicity, we'll just log the transaction
    console.log(`Funds sent to owner: ${amount} ETH`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending funds to owner:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Placeholder function to simulate sending funds to the opponent
app.post('/sendFundsToOpponent', async (req, res) => {
  try {
    const opponentAddress = req.body.opponentAddress;
    const amount = req.body.amount;
    // Replace this with the actual Ethereum transaction logic for sending funds to the opponent
    // For simplicity, we'll just log the transaction
    console.log(`Funds sent to opponent at address ${opponentAddress}: ${amount} ETH`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending funds to opponent:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to simulate fetching opponent's balance using axios
async function fetchOpponentBalance() {
  try {
    // Replace this with the actual logic to fetch the opponent's balance using axios
    // Example: Using a free API to get a random number as the opponent's balance
    const response = await axios.get('https://www.random.org/integers/', {
      params: {
        num: 1,
        min: 1,
        max: 1000,
        col: 1,
        base: 10,
        format: 'plain',
        rnd: 'new',
      },
    });

    return parseInt(response.data.trim());
  } catch (error) {
    console.error('Error fetching opponent balance:', error.message);
    throw new Error('Failed to fetch opponent balance');
  }
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
