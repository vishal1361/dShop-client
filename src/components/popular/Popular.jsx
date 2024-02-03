import React from 'react'
import './Popular.css'
import data from '../assets/Assets/data'
import ItemCard from '../card/ItemCard.jsx'

const productsData = require('../assets/productsData')


const Popular = () => {
    const slicedProducts = productsData.slice(0, 20);
  return (
    <div className='popular'>
        <h1>Popular</h1>
        <hr/>
        <div className="popular-item">
            {
                slicedProducts.map((item, i) => {
                    return <ItemCard 
                        productId={ item['Uniq Id']} 
                        image={item['Image']} 
                        name={item['Product Name']} 
                        price={item['Selling Price']} 
                    />
                })
            }
        </div>
        
    </div>
  )
}

export default Popular