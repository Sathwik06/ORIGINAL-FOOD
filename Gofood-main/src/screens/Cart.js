import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false); // State to manage popup visibility
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false); // State to manage empty cart message
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    if (data.length === 0) {
      setShowEmptyCartMessage(true); // Show empty cart message if cart is empty
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setOrderPlaced(true); // Set the state to display the popup
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><Delete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>

      {/* Popup to display order placed message */}
      {orderPlaced &&
        <div style={popupStyle}>
          <div style={popupInnerStyle}>
            <h2>Order Placed!</h2>
            <p>Thanks for ordering.</p>
            <p>View My Orders to track your order.</p>
            <button className="btn bg-success" onClick={() => setOrderPlaced(false)}>Close</button>
          </div>
        </div>
      }

      {/* Popup for empty cart message */}
      {showEmptyCartMessage &&
        <div style={popupStyle}>
          <div style={popupInnerStyle}>
            <h2>Empty Cart!</h2>
            <p>Add your favorites to the cart to checkout.</p>
            <button className="btn bg-success" onClick={() => setShowEmptyCartMessage(false)}>Close</button>
          </div>
        </div>
      }
    </div>
  )
}

// Inline CSS styles for the popup container
const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

// Inline CSS styles for the popup inner content
const popupInnerStyle = {
  backgroundColor: 'black',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center'
};
