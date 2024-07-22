import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Moment from 'moment';
import EditProduct from './EditProduct';
import { FaTrash, FaPen } from 'react-icons/fa';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const todayDate = Moment().format('YYYY-MM-DD');
    const [employeeData, setEmployeeData] = useState(null);
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        fetchEmployee();
        fetchFilteredProducts();
    }, [Cookies.get("employee-username")]);

    const fetchEmployee = async () => {
        try {
            const username = Cookies.get("employee-username");
            if (!username) {
                throw new Error("Username not found in cookies.");
            }

            const employeeDetails = await fetch(`https://ginternet.onrender.com/employee-details/${username}`);
            if (!employeeDetails.ok) {
                throw new Error(`Error: ${employeeDetails.status} ${employeeDetails.statusText}`);
            }
            const fetchedEmployeeData = await employeeDetails.json();
            setEmployeeData(fetchedEmployeeData);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const fetchFilteredProducts = useCallback(async () => {
        try {
            const productsResponse = await fetch("https://ginternet.onrender.com/products");
            if (!productsResponse.ok) {
                throw new Error(`Error: ${productsResponse.status} ${productsResponse.statusText}`);
            }
            const productData = await productsResponse.json();

            const filteredProducts = productData.filter(product => {
                return Moment(product.saled_at).format('YYYY-MM-DD') === todayDate;
            });

            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [todayDate]);

    const productEntry = async (event) => {
        event.preventDefault();
        const newProduct = { product: product, price: price };

        try {
            const response = await fetch("https://ginternet.onrender.com/products-entry", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const savedProduct = await response.json();

            if (Moment(savedProduct.saled_at).format('YYYY-MM-DD') === todayDate) {
                setProducts(prevProducts => [...prevProducts, savedProduct]);
            }

            alert("Congrats, The Product Entry was Successfully Done!");
            event.target.reset();
            setProduct('');
            setPrice('');
            fetchFilteredProducts();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`https://ginternet.onrender.com/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const updatedProductData = await response.json();

            const updatedProducts = products.map((prod) =>
                prod.id === updatedProductData.id ? updatedProductData : prod
            );

            setProducts(updatedProducts);
            setEditingProductId(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`https://ginternet.onrender.com/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditClick = (productId) => {
        setEditingProductId(productId);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
    };

    return (
        <div className='employeebg'>
            <p className='project-title'>Sri Ganapathi Internet (Employee Dashboard)</p>

            <div className='employeeMain'>
                <div className='employee-details'>
                    <img className='pro-icon' src="./profile.png" alt="employee-icon" />
                    <div className='pro-info'>
                        <p>Employee Name : {employeeData ? employeeData.employee_name.toUpperCase() : 'Loading...'}</p>
                        <p>Employee Number : {employeeData ? `+91 ${employeeData.employee_number}` : 'Loading...'}</p>
                        <p>Employee Hired Date : {employeeData ? `${Moment(employeeData.hire_date).format('DD-MM-YYYY')}` : 'Loading...'}</p>
                        <p>Date : {Moment().format('DD/MM/YYYY')}</p>
                    </div>
                </div>
                <div className='employee-details2'>
                    <p style={{ marginBottom: "10px" }} className='salesproducthead'>Sales Product Entry</p>
                    <form onSubmit={productEntry}>
                        <input
                            type="text"
                            name="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            placeholder='Enter The Product Name'
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Enter The Price'
                            min={0}
                            required
                        />
                        <br />
                        <button type='submit' className='submitBtn'>Submit</button>
                    </form>
                </div>
            </div>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <React.Fragment key={product.id}>
                                {editingProductId === product.id ? (
                                    <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td colSpan="4">
                                            <EditProduct
                                                product={product}
                                                onUpdate={updateProduct}
                                                onCancel={handleCancelEdit}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{product.product}</td>
                                        <td>₹ {product.price}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(product.id)} className="edit-button">
                                                <FaPen style={{ cursor: "pointer" }} />
                                            </button>
                                        </td>
                                        <td>

                                            <FaTrash style={{ color: "red", cursor: "pointer" }} onClick={() => deleteProduct(product.id)} className="delete-button" />

                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
