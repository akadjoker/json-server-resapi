
import {useEffect, useState} from "react";

import  {useFetch}  from "./hooks/useFetch";

const url = "http://localhost:3001/products";

function App() 
{

  
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const {data:items,httpConfig,loading} = useFetch(url);

  // useEffect(() => 
  // {
  //   async function fetchData() 
  //   {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //    // console.log(data);
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  const hadleSubmit = async (e) =>
  {
    e.preventDefault();
    const product = {name, price};
    //console.log(product);

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify(product),
    //   });


    //   const addedProduct = await res.json();
    //   //setProducts([...products, addedProduct]); 1st way
    //   setProducts((prevProducts) => [...prevProducts, addedProduct]); //2nd way

      httpConfig(product,"POST");
      setName("");
      setPrice(0);
  }
 
  return (
    <div >
     <h1>Products</h1>

     <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}  
          </li> 
        ))}
      </ul>
       <div>
        <h2>Add a product</h2>
        {loading && <p>Loading...</p>}
        {!loading &&
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
        }
       </div>
    </div>
  );
}

export default App;
