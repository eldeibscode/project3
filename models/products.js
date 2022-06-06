const fs = require('fs');
const path = require('path');

const p = path.join(require.main.path, 'data', 'products.json');

const getProductsFromFile = cb => {   
        fs.readFile(p, (err, fileContent) =>{
            if(err || fileContent ==''){
                cb([]);
            }else{
                cb(JSON.parse(fileContent));
                // console.log(JSON.parse(fileContent));
            }
        });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);   
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                // console.log(updatedProducts);
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) =>{
                    console.log(err);
                });
            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) =>{
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const updatedProducts = products.filter(prod => prod.id !== id);
            // other approach
            // const deletingProductIndex = products.findIndex(prod => prod.id === id);
            // products.splice(deletingProductIndex, 1);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) =>{
                console.log(err);
            });
        });
    }

    static fetchAll (cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb){
        getProductsFromFile(products => {
            // console.log(':',id,':');
            const product = products.find(p => p.id === id);
            // console.log(product);
            cb(product);
        });
    }
}