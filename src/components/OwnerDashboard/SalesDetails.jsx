// SalesDetails.jsx
import React from 'react';
import Moment from 'moment';

const SalesDetails = ({ selectedDate, salesDetails }) => {
  return (
    <div style={{backgroundColor:"yellow",height:"100vh"}}>
      <h2>Sales Details for {selectedDate}</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {salesDetails.map((product, index) => (
            <tr key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
              <td>{product.product}</td>
              <td>₹ {product.price}</td>
              <td>{Moment(product.saled_at).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDetails;
