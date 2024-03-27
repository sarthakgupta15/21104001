const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const axios = require('axios');

const productsData = require('./products.json');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Register company with server
app.post('/register', async (req, res) => {
    try {
        const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName,
            ownerName,
            rollNo,
            ownerEmail,
            accessCode
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error registering company:', error.message);
        res.status(500).json({ error: 'Failed to register company' });
    }
});

// Obtain authorization token
app.post('/auth', async (req, res) => {
    try {
        const { companyName, clientID, clientSecret, ownerName, ownerEmail, rollNo } = req.body;
        const response = await axios.post('http://20.244.56.144/test/auth', {
            companyName,
            clientID,
            clientSecret,
            ownerName,
            ownerEmail,
            rollNo
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error obtaining authorization token:', error.message);
        res.status(500).json({ error: 'Failed to obtain authorization token' });
    }
});

app.get('/products/:companyName/categories/:categoryName', async (req, res) => {
    try {
        const { companyName, categoryName } = req.params;
        const { n, minPrice, maxPrice } = req.query;

        const pageNumber = parseInt(req.query.page) || 1;
        const pageSize = parseInt(n) || 10;

        const response = await axios.get(`http://20.244.56.144/products/companies/${companyName}/categories/${categoryName}/products/top=${pageSize}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${pageNumber}`);

        res.json(response.data);
    } catch (error) {
        console.error('Error getting products:', error.message);
        res.status(500).json({ error: 'Failed to get products' });
    }
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});