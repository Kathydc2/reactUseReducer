import './App.css';
//1. Import useReducer
import React, {useReducer} from 'react';

//Define the action types 
// const addItem = 'ADDITEM';
// const removeItem = 'REMOVEITEM';
// const updateQty = 'UPDATEQTY';

//2. Make my Reduce that aligns with intiial State
const reducer=(state, action) => {
  //{Think of this as a playbook of all actions based on scenarios}

  switch (action.type) {
    case "ADDPRODUCT":
      //find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      const existingProductIndex = state.findIndex(product => product.id === action.payload.id);
      //If the item is in the cart it would NOT return -1
      if (existingProductIndex !== -1){
        //unpacks state
        const updatedCart = [...state];
        // if its already in the cart then increase the quantity of that specific id
        updatedCart[existingProductIndex].quantity +=1;
        return updatedCart;
      } else {
        //if it isnt already in the cart then add it
        return [...state, {...action.payload, quantity: 1 }];
      }
      //----------------[represents a possible action that can happen against our state Value]
      case "REMOVEPRODUCT":
        //using filter() allows us to check the product with id while preserving the original state
      return state.filter(product => product.id !== action.payload);
      //----------------[represents a possible action that can happen against our state Value]
      case "UPDATEQTY":
        //using map() to check each product with id and it if matches it updates
      return state.map(product => 
        product.id === action.payload.id ? {...product, quantity: action.payload.quantity} : product);
      //----------------[represents a possible action that can happen against our state Value]
    default:
      return state
  }

}

export default function App() {
  const [cart, dispatch] = useReducer(reducer,[]);

  const addProduct = product => {
    dispatch({type: "ADDPRODUCT", payload: product})
  };
  const removeProduct = productId => {
    dispatch({type: "REMOVEPRODUCT", payload: productId})
  };
  const updateProductQty = (productId, quantity) => {
    dispatch({type: "UPDATEQTY" , payload: {id: productId, quantity }});
  };

  return (
    <div className='App'>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map(product => (
          <li key={product.id}>
            <span>{product.name} - ${product.price} - Quantity: {product.quantity}</span>
            <button onClick={() => removeProduct(product.id)}>Remove</button>
            <input
              type="number"
              value={product.quantity}
              onChange={e => updateProductQty(product.id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => addProduct({ id: 1, name: 'Pineapple', price: 5 })}>Add Pineapple</button>
      <button onClick={() => addProduct({ id: 2, name: 'Watermelon', price: 8 })}>Add Watermelon</button>
    </div>
  
  );
}

