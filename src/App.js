import React, { Component } from 'react'
import axios from 'axios';
import ProductList from './ProductList'
import ProductForm from './ProductForm';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            categories: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {

        this.getCategories()
            .then(categories => {
                this.setState({ categories });
            })

        this.getProducts();

    }
    getCategories() {
        return axios.get('/api/categories')
            .then(cat => cat.data)
            .then(categories => {
                return categories;
            })
            .catch(console.log)
    }

    getProducts() {
        axios.get('/api/products')
            .then(prod => prod.data)
            .then(products => {
                this.setState({ products })
            })
            .catch(console.log)
    }

    addProduct(product) {
        axios.post('./api/products', product)
            .then(() => {
                this.getProducts();
            }).catch(console.log);



    }

    render() {
        const { products, categories } = this.state;
        const { addProduct } = this;
        // console.log(products);
        return (
            <div className='container'>
                <h1>Acme Products &&&& Categories React!!</h1>
                <div className='row'>
                    <div className='col-sm-8'>
                        <ProductList categories={categories} products={products} />
                    </div>
                    <div className='col-sm-4'>
                        <ProductForm addProduct={addProduct} categories={categories} />
                    </div>
                </div>
            </div>
        )
    }
}