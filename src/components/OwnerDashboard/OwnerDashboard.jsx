import React, { useState, useEffect } from 'react';
import './Owner.css';
import Moment from 'moment';
import SalesDetails from './SalesDetails'; 

function OwnerDashboard() {
  const [reports, setReports] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [salesDetails, setSalesDetails] = useState([]);
  const [showSalesDetails, setShowSalesDetails] = useState(false); 
  const OwnerDate = Moment().format("DD/MM/YYYY");

  useEffect(() => {
    fetchProductsReport();
  }, []);

  const fetchProductsReport = async () => {
    try {
      const OwnerResponse = await fetch("https://ginternet.onrender.com/products");
      if (!OwnerResponse.ok) {
        throw new Error(`Error: ${OwnerResponse.status} ${OwnerResponse.statusText}`);
      }
      const productData = await OwnerResponse.json();
      setReports(productData);

      const todayRevenue = productData.reduce((acc, product) => {
        if (Moment(product.saled_at).format("DD/MM/YYYY") === OwnerDate) {
          return acc + parseFloat(product.price);
        }
        return acc;
      }, 0);
      setTotalRevenue(todayRevenue);

    } catch (error) {
      console.error('Error fetching product report:', error);
    }
  };

  const fetchSalesDetailsByDate = async (date) => {
    try {
      const OwnerResponse = await fetch("https://ginternet.onrender.com/products");
      if (!OwnerResponse.ok) {
        throw new Error(`Error: ${OwnerResponse.status} ${OwnerResponse.statusText}`);
      }
      const productData = await OwnerResponse.json();
      const filteredData = productData.filter(product => Moment(product.saled_at).format("DD/MM/YYYY") === date);
      setSalesDetails(filteredData);
      setShowSalesDetails(true); // Show SalesDetails when fetched
    } catch (error) {
      console.error('Error fetching sales details:', error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchSalesDetailsByDate(date);
  };

  const calculateTotalSalesByDate = (date) => {
    return reports.reduce((totalSales, product) => {
      if (Moment(product.saled_at).format("DD/MM/YYYY") === date) {
        return totalSales + 1;
      }
      return totalSales;
    }, 0);
  };

  const calculateTotalAmountByDate = (date) => {
    return reports.reduce((totalAmount, product) => {
      if (Moment(product.saled_at).format("DD/MM/YYYY") === date) {
        return totalAmount + parseFloat(product.price);
      }
      return totalAmount;
    }, 0);
  };

  const uniqueDates = [...new Set(reports.map(product => Moment(product.saled_at).format("DD/MM/YYYY")))];
  uniqueDates.sort((a, b) => Moment(b, "DD/MM/YYYY").valueOf() - Moment(a, "DD/MM/YYYY").valueOf());

  // Function to toggle showing SalesDetails component
  const toggleSalesDetails = () => {
    setShowSalesDetails(!showSalesDetails);
    setSelectedDate(null); // Clear selected date when hiding SalesDetails
    setSalesDetails([]); // Clear sales details when hiding SalesDetails
  };

  return (
    <div className='owner'>
      {!showSalesDetails && (
        <>
          <h1>Sri Ganapathi Internet (Owner Dashboard)</h1>
          <div className='owner-card-container'>
            <div className="owner-card">
              <img src="./owner-main.png" className='owner-img' alt="P A Arumugam" />
              <div>
                <p>Name : P. A. Arumugam</p>
                <p>Role : Owner</p>
                <p>Shop Name : Sri Ganapathy Internet</p>
              </div>
            </div>
            <div className='owner-card'>
              <img src="./sales.png" className='owner-img' alt="P A Arumugam" />
              <div>
                <p>Date : {OwnerDate}</p>
                <p>Today Revenue: ₹ {totalRevenue}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 style={{ marginTop: "20px" }}>Sales Report</h1>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Sales</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {uniqueDates.map((date, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'odd-row' : 'even-row'}
                    onClick={() => handleDateClick(date)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{date}</td>
                    <td>{calculateTotalSalesByDate(date)}</td>
                    <td>₹ {calculateTotalAmountByDate(date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showSalesDetails && (
        <div className="sales-details-container">
           <SalesDetails selectedDate={selectedDate} salesDetails={salesDetails} />
           <button onClick={toggleSalesDetails} className='backBtn'>Back</button>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
