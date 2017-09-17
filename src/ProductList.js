import React from 'react';
import ProductForm from './ProductForm';

const ProductList = (props) => {


    const { products, categories } = props;

    return (
        <div className='row'>
            {products.length > 0 && products.map(product => {
                return (
                    <div key={product.id} className='col-sm-4'>
                        <ProductForm deleteProduct={props.deleteProduct} updateProduct={props.updateProduct} productId={product.id} name={product.name} price={product.price} inStock={product.inStock} categoryId={product.categoryId} categories={categories} />
                    </div>
                )
            })}
        </div>
    );
}

export default ProductList;
