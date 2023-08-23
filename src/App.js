
import {useEffect, useState} from "react";

import  {useFetch}  from "./hooks/useFetch";

const url = "http://localhost:3001/products";

function App() 
{

  
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const {data:items,httpConfig,loading,error} = useFetch(url);



  const hadleSubmit = async (e) =>
  {
    e.preventDefault();
    const product = {name, price};

      httpConfig(product,"POST");
      setName("");
      setPrice(0);
  }
 
  return (
    <div >
     <h1>Products</h1>

     {loading && <p>Loading...</p>}

     {error && <p>{error}</p>}
     
     {!loading && ( 
     <>
     <ul> 
        {items && 
        items.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}  
          </li> 
        ))}
      </ul>

       <div>
        <h2>Add a product</h2>
  
        
        <form onSubmit={hadleSubmit}>
          
          <label htmlFor="name">Name</label>
          <input type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} />
          <br/>
          <label htmlFor="price">Price</label>
          <input type="number" 
          id="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} />
          <br/>
          <button type="submit">Add</button>
        </form>
        
       </div>
       </>)}

    </div>
  );
}

export default App;
