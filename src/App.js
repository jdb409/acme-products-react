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
            categories: [],
            err: ''
        }
        this.addProduct = this.addProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
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
        axios.get('/api/products')
            .then(prod => prod.data)
            .then(products => {
                this.setState({ products })
            })
            .catch(console.log)
    }

    addProduct(product) {
        return axios.post('/api/products', product)
            .then(() => {
                this.getProducts();
                this.getCategories();
                this.setState({err:""})
            }).catch(err => {
                this.setState({ err: err.response.data });
            });
    }

    deleteProduct(productId) {

        axios.delete(`/api/products/${productId * 1}`)
            .then(() => {
                this.getProducts();
                this.getCategories();
            }).catch(console.log)
    }

    updateProduct(productId, product) {
        axios.put(`/api/products/${productId * 1}`, product)
            .then(() => {
                this.getProducts();
                this.getCategories();
            }).catch(console.log)

    }

    render() {
        const { products, categories, err } = this.state;
        const { addProduct, deleteProduct, updateProduct } = this;

        return (
            <div className='container'>
                <h1>Acme Products &&&& Categories React!!</h1>
                <div className='row'>
                    <div className='col-sm-6'>
                        <ProductList updateProduct={updateProduct} deleteProduct={deleteProduct} categories={categories} products={products} />
                    </div>
                    <div className='col-sm-4'>
                        <ProductForm msg="Add A Product" addProduct={addProduct} products={products} categories={categories} err={err} />
                    </div>
                    <div className='col-sm-2'>
                        <Summary categories={categories} products={products} />
                    </div>
                </div>
            </div>
        )
    }
}
