import React, { Component } from "react";

export default class ProductForm extends Component {
    constructor() {
        super();

        this.state = {
            product: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        const { product } = this.state;

        product.price = product.price || 0;

        switch (ev.target.name) {
            case 'name':
                product.name = ev.target.value;
                break;
            case 'price':
                product.price = ev.target.value;
                break;
            case 'inStock':
                ev.target.checked ? product.inStock = true : product.inStock = false;
                break;
            case 'category':
                if (ev.target.value !== 'No Category') {
                    product.categoryId = ev.target.value;
                }
                break;
        }
    }


    handleSubmit(ev) {
        const { addProduct } = this.props;
        const { product } = this.state;

        ev.preventDefault();
        addProduct(product)
            .then(() => {
                document.getElementById("form").reset();
            })


    }


    render() {
        const { categories } = this.props;
        const { handleChange, handleSubmit } = this;
        const { product } = this.state;

        return (
            <div className="panel panel-default">
                <div className="panel panel-heading">Add a product</div>
                <div className="panel panel-body">
                    <form id='form' onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" onChange={handleChange} />
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" className="form-control" onChange={handleChange} />
                        <label htmlFor="inStock">InStock</label>
                        <input type="checkBox" name="inStock" className="form-control" onChange={handleChange} />
                        <label htmlFor="category">Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            <option>No category</option>
                            {
                                categories.map(category => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })
                            }
                        </select>
                        <br />
                        <button className='btn btn-primary'>Add Product</button>
                    </form>
                </div>
            </div>
        );
    }
}





