import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function Cars({ user }) {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [carname, setCarName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [cars, setCars] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/createCustomer")
      .then(function (response) {
        // handle success

        setCustomers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [customers]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/cars")
      .then(function (response) {
        // handle success

        setCars(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [cars]);

  function handleCreate(event) {
    event.preventDefault();
    if (customerName) {
      if (customerName !== "placeholder") {
        axios
          .post("http://localhost:4000/createCar", {
            carname,
            numberPlate,
            customerName,
          })
          .then((responce) => {
            console.log(responce);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Please Select Valid Customer Name");
      }
    }
  }

  function handleEdit(event) {
    setEditForm(true);
    console.log(event);
    setId(event._id);
    setCarName(event.carname);
    setNumberPlate(event.numberPlate);
    setCustomerName(event.customerName);
  }

  function handleEditSubmit(event) {
    event.preventDefault();
   

    axios
      .post(`http://localhost:4000/editCar/${id}`, {
        carname,
        numberPlate,
        customerName,
      })
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete(event) {
    
    axios
      .post(`http://localhost:4000/deleteCar/${event._id}`)
      .then((responce) => {
        // console.log(responce);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />

      {editForm === false && (
        <div className="content">
          <h1>Create Cars</h1>
          <form onSubmit={handleCreate}>
            <div>
              <label htmlFor="carname">Car Name</label>
              <input
                name="carname"
                onChange={(event) => {
                  setCarName(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="numberPlate">Number Plate</label>
              <input
                name="numberPlate"
                onChange={(event) => {
                  setNumberPlate(event.target.value);
                }}
              ></input>
            </div>

            <div>
              <label htmlFor="customerName">Customer:</label>
              <select
                name="customerName"
                defaultValue={"placeholder"}
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
              >
                <option value={"placeholder"}>Select Customers</option>
                {customers.map((customer, key) => (
                  <option key={key} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
      )}

      {editForm === true && (
        <div className="content">
          <h1>Edit Cars</h1>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label htmlFor="carname">Car Name</label>
              <input
                name="carname"
                value={carname}
                onChange={(event) => {
                  setCarName(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="numberPlate">Number Plate</label>
              <input
                name="numberPlate"
                value={numberPlate}
                onChange={(event) => {
                  setNumberPlate(event.target.value);
                }}
              ></input>
            </div>

            <div>
              <label htmlFor="customerName">Customer:</label>
              <select
                name="customerName"
                value={customerName}
                defaultValue={"placeholder"}
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
              >
                <option value={"placeholder"}>Select Customers</option>
                {customers.map((customer, key) => (
                  <option key={key} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button>Update</button>
            </div>
          </form>
        </div>
      )}

      <div className="content">
        <h1>Cars</h1>
        {cars.map((car, key) => (
          <div key={key}>
            <label>Car Name:</label>
            <span>{car.carname}</span>,<label>Customer:</label>
            <span>{car.customerName}</span>
            <button
              onClick={() => {
                handleEdit(car, key);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(car, key)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
