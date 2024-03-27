const express = require('express');
const app = express();
const productsData = require('./products.json');

const PORT = process.env.PORT || 3000;

app.get('/categories/:categoryName/products', (req, res) => {
    const { categoryName } = req.params;
    const { n, page } = req.query;

    //filter by category
    const productsByCategory = productsData.products.filter(product => product.category === categoryName);
    
    //Page
    const pageSize = parseInt(n) || 10;
    const currentPage = parseInt(page) || 1;
    const startIndex = (currentPage-1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageinatedProducts = productsByCategory.slice(startIndex, endIndex);

    res.json(pageinatedProducts);
});

