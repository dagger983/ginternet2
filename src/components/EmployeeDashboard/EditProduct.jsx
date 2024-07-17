import React, { useState } from 'react';
import "./EditProduct.css"
const EditProduct = ({ product, onUpdate, onCancel }) => {
    const [name, setName] = useState(product.product);
    const [price, setPrice] = useState(product.price);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProduct = { id: product.id, product: name, price: price };
            await onUpdate(updatedProduct);
            window.location.reload()

        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-product">
            <p>Edit Product</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        min={0}
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />
                </div>
                <button className='editBtn' type="submit">Update</button>
                <button className='editBtn' type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProduct;
