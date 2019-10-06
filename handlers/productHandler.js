// const {sequelize, Sequelize} = require('../connection');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const product = require('../models/Product');


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true);
    else cb(null, false);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
});


router.get('/all', (req, res) => {
    product.findAll()
        .then(products => {
            res.json({
                count: products.length,
                products: products
            })
        })
        .catch(err => res.json({count: 0, err}));
})

router.get('/:id', (req, res) => {
    product.findByPk(req.params.id)
        .then(product => {
            res.json({product});
        })
        .catch(err => res.json({err}));
})

router.get('/images/:filename', (req, res) => {
    res.sendFile(`/images/${req.params.filename}`, {root: '.'})
})

router.post('/', upload.single('image'), (req, res) => {
    const file = req.file;
    // console.log(file);
    // res.send('ok')
    product.create({
        title: req.body.title,
        description: req.body.description,
        image_path: file.filename
    })
    .then(product => {
        if(product) {
            res.json({
                success: true,
                product
            })
        } else {
            res.json({
                success: false
            })
        }
    })
    .catch(err => res.json({success: false, err}));
})

module.exports = router;