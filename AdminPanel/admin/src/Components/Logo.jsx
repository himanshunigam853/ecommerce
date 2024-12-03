import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./common.css";

function Logo() {
  const [showModal, setShowModal] = useState(false);
  // const [sliders, setSliders] = useState([]);
  const [logo, setLogo] = useState([]);
  const [formData, setFormData] = useState({
    logoName: "",
    logoImage: "null",
  });


  // Fetch Logo from the server
  const fetchLogo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/logo/getlogo"
      );
      console.log(response)
      setLogo(response.data.logo);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch sliders", "error");
    }
  };

    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, logoImage: e.target.files[0] });
  };

  // Add new slider
  const handleAddLogo = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("logoName", formData.logoName);
      formDataToSend.append("logoImage", formData.logoImage);

     const data=  await axios.post("http://localhost:3000/logo/save", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(data)
   

      Swal.fire("Success", "Slider added successfully!", "success");
      setShowModal(false);
      fetchLogo();
    } catch (error) {
      Swal.fire("Error", "Failed to add slider", "error");
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);


  // delete slider
  const handleDelete = async (id)=>{
    const apiKey=`http://localhost:3000/logo/delete/${id}`;
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
        }
        fetchLogo();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user.", "error");
        console.error("Error deleting user:", error);
      }
    } else {
      Swal.fire("Cancelled", "Your data is safe", "info");
    }
}

  return (
    <div className="users-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="Search..." />
        <button className="add-use-btn" onClick={() => setShowModal(true)}>
          Add Logo
        </button>
      </div>

      {/* Display Sliders */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Logo Name</th>
            <th>Logo Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logo.map((logo) => (
            <tr key={logo._id}>
              <td>{logo.logoName}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${logo.logoImage}`} // Ensure this path is correct
                  alt={logo.logoImage}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <button onClick={()=>handleDelete(logo._id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding a Slider */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Logo</h3>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddLogo();
              }}
            >
              <label>Logo Name</label>
              <input
                type="text"
                name="logoName"
                value={formData.logoName}
                onChange={handleInputChange}
                
              />
              <label>Logo Image:</label>
              <input
                type="file"
                name="logoImage"
                onChange={handleFileChange}
                
              />
              <div className="modal-buttons">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleAddLogo}
                >
                  Save
                </button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;