const path = require('../util/path');

const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts =  (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All products',
                path: '/products'});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // console.log(prodId);
    Product.findById(prodId)
        .then(([rows, fieldData]) => {
                // console.log(rows[0]);
                res.render('shop/product-detail',{
                    product: rows[0],
                    pageTitle: rows.title,
                    path:'/products'
                });
            }
        )
        .catch(err => {console.log(err)});
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next)=>{
    Cart.getCart((cart) =>{
        Product.fetchAll(products => {
            const cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }

            res.render("shop/cart", { 
                pageTitle: "Your Cart", 
                path: "/cart",
                products: cartProducts
            });
        });
    });
    

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(req.body);
    Product.findById(prodId, (product) => {
        // console.log(product);
        Cart.addProduct(prodId, product.price);
    });
    // console.log(prodId);
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next)=>{
    res.render("shop/orders", { 
        pageTitle: "Your Orders", 
        path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};