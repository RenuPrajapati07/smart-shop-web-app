import React from 'react'

const ProductContainer = (product) => {
  return (
    <div>ProductContainer
        <div>{product.product.producttitle}
            <img src={product.product.productimage} height={200} width={200}/>
        </div>
    </div>
  )
}

export default ProductContainer