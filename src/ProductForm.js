import React, { Component } from "react";

export default class ProductForm extends Component {
    constructor(props) {
        super();

        this.state = {
            name: props.name || "",
            price: props.price || 0,
            inStock: props.inStock || false,
            categoryId: props.categoryId || "",
            err: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.changeProduct = this.changeProduct.bind(this);

    }

    handleChange(ev) {
        
        switch (ev.target.name) {
            case 'name':
                this.setState({ name: ev.target.value })
                break;
            case 'price':
                this.setState({ price: ev.target.value })
                break;
            case 'inStock':
                ev.target.checked ? this.setState({ inStock: true }) : this.setState({ inStock: false });
                break;
            case 'category':
                if (ev.target.value !== 'No category') {
                    this.setState({ categoryId: ev.target.value })
                }
                break;
        }
    }

    changeProduct(ev) {
        ev.preventDefault();
        this.props.updateProduct(this.props.productId, this.state);

    }

    handleSubmit(ev) {
        const { addProduct, err } = this.props;
        this.setState({ err });
        ev.preventDefault();
        addProduct(this.state)
            .then(() => {
                this.setState({ name: "" })
                this.setState({ price: 0 })
                this.setState({ inStock: false })
                this.setState({ category: "No Category" })
            })
    }

    handleDelete(ev) {
        ev.preventDefault();
        this.props.deleteProduct(this.props.productId * 1);
    }

    render() {
        const { categories, msg, productId, err } = this.props;
        const { handleChange, handleSubmit, changeProduct } = this;
        const { name, price, inStock, categoryId } = this.state;


        return (
            <div className="panel panel-default">
                <div className="panel panel-heading">{msg}</div>
                <div className="panel panel-body">
                    {err && <p className = 'well'>{err}</p>}
                    <form id='form' onSubmit={productId ? changeProduct : handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input value={name} type="text" name="name" className="form-control" onChange={handleChange} />
                        <label htmlFor="price">Price</label>
                        <input value={price} type="number" name="price" className="form-control" onChange={handleChange} />
                        <label htmlFor="inStock">InStock</label>
                        <input value={inStock} type="checkBox" name="inStock" className="form-control" onChange={handleChange} defaultChecked={this.props.inStock || inStock} />
                        <label htmlFor="category">Category</label>
                        <select value={categoryId} name="category" className="form-control" onChange={handleChange}>
                            <option>No category</option>
                            {
                                categories.map(category => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })
                            }
                        </select>
                        <br />

                        <button className='btn btn-primary'>Save</button>
                        {productId && <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>}

                    </form>
                </div>
            </div>
        );
    }
}





