import React, { Component } from 'react'
import axios from 'axios';
import ProductList from './ProductList'
import ProductForm from './ProductForm';
import Summary from './Summary';

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
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getCategories()

        this.getProducts();

    }
    getCategories() {
        axios.get('/api/categories')
            .then(cat => cat.data)
            .then(categories => {
                this.setState({ categories });
            })
            .catch(console.log)
    }

    getProducts() {
        return axios.get('/api/products')
            .then(prod => prod.data)
            .then(products => {
                this.setState({ products })
            })
            .catch(console.log)
    }

    addProduct(product) {
        return axios.post('./api/products', product)
            .then(() => {
                this.getProducts();
                this.getCategories();
            }).catch(console.log);
    }

    deleteProduct(productId) {
        const {getProducts} = this;
        return axios.delete(`./api/products/${productId * 1}`)
        .then(()=>{
            this.getProducts();
            this.getCategories();
        }).catch(console.log)
    }

    render() {
        const { products, categories } = this.state;
        const { addProduct, deleteProduct } = this;

        return (
            <div className='container'>
                <h1>Acme Products &&&& Categories React!!</h1>
                <div className='row'>
                    <div className='col-sm-6'>
                        <ProductList deleteProduct = {deleteProduct}  categories={categories} products={products} />
                    </div>
                    <div className='col-sm-4'>
                        <ProductForm addProduct={addProduct} categories={categories} />
                    </div>
                    <div className='col-sm-2'>
                        <Summary categories={categories} products={products} />
                    </div>
                </div>
            </div>
        )
    }
}