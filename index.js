const express = require('express');
const app = express();
const bp = require('body-parser');
const productHandler = require('./handlers/productHandler');



app.use(bp.json());
app.use(express.static('images'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});


app.use('/products', productHandler);



app.get('/', (req, res) => {
    res.json({message: "hi"});
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));