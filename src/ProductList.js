import React, {Component} from 'react';

export default class ProductForm extends Component {
    constructor() {
        super();
        this.state = {
            category: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev){
        this.setState({
            category: ev.target.value
        })
    }
    render() {
        const {products, categories} = this.props;
        console.log(products);
        return (
            <ul className='list-group'>
                {
                    products.map(product => {
                        return (
                            <li className='list-group-item' key={product.id}>
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
                        );
                    })
                }
            </ul>
        );
    }
}


// <p>{product.category ? product.category.name : 'No Category'}</p>