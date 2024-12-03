import React from 'react'
// import Header from './Header'

const Product = () => {
  return (
    <div>
      {/* <Header/> */}
      <div className="grid-rows-1 mb-5  mt-5 ">
        <h1 className='text-3xl px-4 font-semibold'>Product</h1>
        <div className='flex justify-between ps-3 pe-3 flex-wrap pro1'>
        <div className="grid-cols-4 p-4  ">
          <div className='border-2 border-black h-72 w-64 rounded-lg overflow-hidden cursor-pointer'>
            <img src="/images/p1.jpg" alt="" />
          </div>
        </div>
        <div className="grid-cols-4 p-4">
          <div className='border-2 border-black h-72 w-64 rounded-lg overflow-hidden cursor-pointer'>
          <img src="/images/p3.png" alt="" />
          </div>
        </div>
        <div className="grid-cols-4 p-4">
          <div className='border-2 border-black h-72 w-64 rounded-lg overflow-hidden cursor-pointer'>
          <img src="/images/p1.jpg" alt="" />
          </div>
        </div>
        <div className="grid-cols-4 p-4">
          <div className='border-2 border-black h-72 w-64 rounded-lg overflow-hidden cursor-pointer'>
          <img src="/images/p3.png" alt="" />
          </div>
        </div>
        <div className="grid-cols-4 p-4">
          <div className='border-2 border-black h-72 w-64 rounded-lg overflow-hidden cursor-pointer'>
          <img src="/images/p1.jpg" alt="" />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Product
