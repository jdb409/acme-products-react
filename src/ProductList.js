import React, { Component } from 'react';
import ProductForm from './ProductForm';

export default class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            category: {},

        }
        this.handleDelete = this.handleDelete.bind(this);
        
    }



    handleDelete(productId) {
        this.props.deleteProduct(productId);
    }

    render() {
        const { products, categories } = this.props;

        return (
            <div className='row'>
                {products.length > 0 && products.map(product => {
                    return (
                        <div key={product.id} className='col-sm-4 panel panel-default'>
                            <ProductForm updateProduct = {this.props.updateProduct} productId = {product.id} name={product.name} price={product.price} inStock={product.inStock} categoryId={product.categoryId} categories={categories} />
                            <button className='btn btn-danger' onClick={() => this.handleDelete(product.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        );
    }
}

// <button className='btn btn-success' onClick={() => this.changeProduct(product.id, product)}>Save</button>

// <div className='row'>
// <ul className='list-group'>
//     {
//         products.map(product => {
//             return (
//                 <div key={product.id} className='col-sm-4'>
//                     <li className='list-group-item'>
//                         <p>{product.name}</p>
//                         <p>{product.price}</p>
//                         <label htmlFor='inStock'>InStock </label>
//                         <br />
//                         <input type='checkbox' name='inStock' defaultChecked={product.inStock} />
//                         <select defaultValue={product.categoryId ? product.category.name : null}>
//                             <option>No Category</option>
//                             {categories.map(category => {
//                                 return (
//                                     <option key={category.id}>{category.name}</option>
//                                 )
//                             })}
//                         </select>

//                         <button className='btn btn-info'>Save</button>

//                         <button className='btn btn-danger' onClick={() => this.handleDelete(product.id)}>Delete</button>
//                     </li>
//                 </div>
//             );
//         })
//     }
// </ul>
// </div>