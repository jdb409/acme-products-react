import React from 'react';

const Summary = (props) => {
    const { products, categories } = props;
    const expensiveProduct = products.sort((a, b) => b.price - a.price);
    const notInStock = products.filter(product => !product.inStock).map(product => product.name).join(' and ');

    return (
        <ul className='list-group'>
            <li className='list-group-item'>There are {products.length} products</li>
            <li className='list-group-item'>
                Categories:
                {
                    categories.map(category => {
                        return (
                            <li key={category.id}>{category.name} has {category.products.length} products </li>
                        );
                    })
                }
            </li>
            <li className='list-group-item'>The most expensive product is {expensiveProduct[0] ? expensiveProduct[0].name : null} at {expensiveProduct[0] ? expensiveProduct[0].price : null} </li>
            <li className='list-group-item'>Products not in stock are {notInStock}</li>
        </ul>
    );
}

export default Summary;