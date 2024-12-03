import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./common.css";

function Slider() {
  const [showModal, setShowModal] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [formData, setFormData] = useState({
    slidername: "",
    sliderImage: null,
  });


  // Fetch sliders from the server
  const fetchSliders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/slider/getsliders"
      );
      console.log(response.data.sliders[3])
      setSliders(response.data.sliders);
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
    setFormData({ ...formData, sliderImage: e.target.files[0] });
  };

  // Add new slider
  const handleAddSlider = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("slidername", formData.slidername);
      formDataToSend.append("sliderImage", formData.sliderImage);

      await axios.post("http://localhost:3000/slider/save", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Slider added successfully!", "success");
      setShowModal(false);
      fetchSliders();
    } catch (error) {
      Swal.fire("Error", "Failed to add slider", "error");
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);


  // delete slider
  const handleDelete = async (sliderId)=>{
    const apiKey=`http://localhost:3000/slider/delslider/${sliderId}`;
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
          // fetchCategories();
          fetchSliders();
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
    <div className="users-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="Search..." />
        <button className="add-use-btn" onClick={() => setShowModal(true)}>
          Add Slider
        </button>
      </div>

      {/* Display Sliders */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Slider Name</th>
            <th>Slider Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliders.map((slider) => (
            <tr key={slider._id}>
              <td>{slider.slidername}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${slider.sliderImage}`} // Ensure this path is correct
                  alt={slider.slidername}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <button onClick={()=>handleDelete(slider._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding a Slider */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Slider</h3>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSlider();
              }}
            >
              <label>Slider Name:</label>
              <input
                type="text"
                name="slidername"
                value={formData.slidername}
                onChange={handleInputChange}
              />
              <label>Slider Image:</label>
              <input
                type="file"
                name="sliderImage"
                onChange={handleFileChange}
              />
              <div className="modal-buttons">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleAddSlider}
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

export default Slider;