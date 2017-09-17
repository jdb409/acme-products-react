import React, { Component } from 'react';

export default class ProductForm extends Component {
    constructor() {
        super();
        this.state = {
            category: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev) {
        this.setState({
            category: ev.target.value
        })
    }
    render() {
        const { products, categories } = this.props;
        console.log(products);
        return (
            <div className='row'>
                <ul className='list-group'>
                    {
                        products.map(product => {
                            return (
                                <div key={product.id} className='col-sm-4'>
                                    <li className='list-group-item'>
                                        <p>{product.name}</p>
                                        <p>{product.price}</p>
                                        <label htmlFor='inStock'>InStock </label>
                                        <br />
                                        <input type='checkbox' name='inStock' defaultChecked={product.inStock} />
                                        <select defaultValue={product.categoryId ? product.category.name : null}>
                                            <option>No Category</option>
                                            {categories.map(category => {
                                                return (
                                                    <option key={category.id}>{category.name}</option>
                                                )
                                            })}
                                        </select>
                                    </li>
                                </div>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
