import { useState,useMemo } from 'react'
import {categories} from  './data.json'
import {products} from  './products.json'
import  './index.css'
import Menu from  './components/Menu'
import { ProductItem } from './components/ProductItem'

export type Category = {
  id:number,
  name:string,
  sublevels?: Category []
}

export type Product = {
  quantity: number,
  price: number,
  available: boolean,
  sublevel_id: number,
  name: string,
  id: string
}

export type CartItem = {
  quantity: number,
  product : Product
}

function App() {
  const [category,setcategory] = useState<Category | null>(null)
  const [cart,setCart] = useState<Map<Product['id'],CartItem>>(()=> new Map<Product['id'],CartItem>())
  const matches = useMemo(
    () => products.filter((product:Product)=>(category ? product.sublevel_id === category.id : true)),
    [category],
  )

  function handleDecrement(product:Product){
    const draft = structuredClone(cart)
    const item = draft.get(product.id)

    if(item){
      if(item.quantity > 1){
        item.quantity = item.quantity - 1 
      }else{
        draft.delete(product.id)
      }
    } 
    setCart(draft)
  }

  function handleIncrement(product:Product){
    const draft = structuredClone(cart)
    const item = draft.get(product.id)

    !item ? draft.set(product.id,{quantity : 1, product : product}) : item.quantity = item.quantity + 1 
    setCart(draft)
  }

  return (
    <>
      <Menu onCategoryClick={(category)=>setcategory(category)} categories={categories}/>
      <div className='container'>
        {matches.map((product) => {
         const item = cart.get(product.id)
         return (
          <ProductItem key={product.id} product={product} item={item} onDecrement={handleDecrement} onIncrement={handleIncrement}/>
         )})}
      </div>
    </>
  )
}

export default App


