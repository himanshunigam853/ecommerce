import React, { useState } from 'react'
import Hero from './Hero';
import "./Dashboard.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Slider from './Slider';
import Category from './Category';
import Product from './Product';

const Dashboard = () => {
 const location =useLocation();
  const {state}=location;
  // console.log(state)
  const [currentview,setCurrentview]=useState("Hero");
  const handleMenuClick=(view)=>{
      setCurrentview(view);
  }; 
  const renderContent=()=>{
    switch(currentview){
      case "Hero":
        return <div><Hero/></div>;
      case "Logo":
        return <div><Logo/></div>;
      case "Slider":
        return <div><Slider/></div>;
      case "Category":
        return <div><Category/></div>;
      case "Product":
        return <div><Product/></div>;

        default:
          return <div><Hero/></div>;
    }
  }

  return (
    <div className='dashboard-container'>
      {/* sidebar */}
      <div className='sidebar'>
        <h3>Sidebar Menu</h3>
        <ul>
          <li onClick={()=>handleMenuClick("Hero")}>Dashboard</li>
          <li onClick={()=>handleMenuClick("Logo")}>Logo</li>
          <li onClick={()=>handleMenuClick("Slider")}>Slider</li>
          <li onClick={()=>handleMenuClick("Category")}>Category</li>
          <li onClick={()=>handleMenuClick("Product")}>Product</li>
        </ul>
      </div>
      {/* Main Dashboard area */}
      <div className='main-content'>
                {/*header */}
                <header className='header'>
                    <div className='profile-section'>

                      <div>
                         <h2 className='view-title'>Dashboard</h2>
                      </div>

                      <div className='right-profile'>
                        <img src="image/imagel.png" alt="profile-picture"/>
                        <span className='profile-name'>
                          {state ? state.user.username : "Guest"}
                        </span>
                      </div>

                    </div>
                </header>

                <main className='content'>
                      {renderContent()}
                </main>
      </div>
    </div>
  );
}

export default Dashboard
