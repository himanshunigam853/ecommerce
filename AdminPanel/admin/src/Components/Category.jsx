import React, { useEffect, useState } from "react";
import "./Common.css";
import axios from "axios";
import Swal from "sweetalert2";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData ,setFormData]=useState({
    categoryname:"",
  });
  // Call get api
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/category/getcategory"
      );
      setCategories(response.data.categories);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch categories", "error");
    }
  };

// handle Input Changes
const handleInputChange = (e)=>{
  const {name,value}=e.target;
  setFormData({...FormData,[name]:value});
}

// Add New category
const handleAddCategory =async ()=>{
  try {
     await axios.post("http://localhost:3000/category/save",formData)
     Swal.fire("Success","Category successfully!","success");
     setShowModal(false)
     fetchCategories();
  } catch (error) {
    Swal.fire("Error", "Failed to save categories", "error");
  }
}

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete api
  
  const handleDelete = async (productId)=>{
    const apiKey=`http://localhost:3000/category/delcategory/${productId}`;
    const result = await  Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(apiKey);
        if (response.status === 200) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          // Refresh the data list after deleting
          fetchCategories();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user.", "error");
        console.error("Error deleting user:", error);
      }
    } else {
      Swal.fire("Cancelled", "Your data is safe", "info");
    }
}

  return (
    //   <div className="overflow-x-auto">
    //     <div className="float-end">

    //         <button className="ml-2 bg-green-500 text-white mb-5 px-2  py-2 rounded hover:bg-green-600"
    //         >
    //             Add Category
    //         </button>
    //     </div>

    //   <table className="table-auto border-collapse border border-gray-300 w-full text-left">
    //     <thead className="bg-gray-100">
    //       <tr>
    //         <th className="border border-gray-300 px-4 py-2 text-center">Product Category</th>
    //         <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {/* 1 */}
    //       <tr className="hover:bg-gray-50">
    //         <td className="border border-gray-300 text-center px-4 py-2">Mens</td>
    //         <td className="border border-gray-300 px-4 py-2 text-center">
    //           <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
    //             Delete
    //           </button>
    //         </td>
    //       </tr>
    //       {/* 2 */}
    //       <tr className="hover:bg-gray-50">
    //         <td className="border border-gray-300 text-center px-4 py-2">Womens</td>
    //         <td className="border border-gray-300 px-4 py-2 text-center">
    //           <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
    //             Delete
    //           </button>
    //         </td>
    //       </tr>

    //     </tbody>
    //   </table>

    // </div>
    <div className="user-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="search.." />
        <button className="add-use-btn" onClick={() => setShowModal(true)}>
          Add Category
        </button>
      </div>

      {/* Display Data */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.categoryname}</td>
              <td className="btn" onClick={()=>handleDelete(category._id)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* model for adding a category */}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Category</h3>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCategory();
              }}
            >
              <label>Category Name:</label>
              <input
                type="text"
                name="categoryname"
                value={FormData.categoryname}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button type="button" className="save-btn"
                  onClick={handleAddCategory}
                >Save
                </button>
                <button type="button" onClick={()=>setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
