import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function Customer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState([]);
  const[id, setId]=useState("")



  // console.log(customers);
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/createCustomer", { name, age, address })
      .then((responce) => {
        console.log(responce.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/createCustomer")
      .then(function (response) {
        // handle success
        // console.log(response.data);
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

  function handleDelete(event) {
    axios
      .post(`http://localhost:4000/delete/${event._id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  const [editForm, setEditForm] = useState(false);

  function handleEdit(event) {
    setEditForm(true);
    setName(event.name);
    setAge(event.age);
    setAddress(event.address);
    setId(event._id)
  }

  function editSubmit(event) {
    console.log(id)
    event.preventDefault();
   
  
    axios
      .post(`http://localhost:4000/edit/${id}`,{name, age, address})
      .then((response) => {
        console.log(response.data)
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
          <h1>Create Customers</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="name">Age</label>
              <input
                name="age"
                type="number"
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                name="address"
                type="text"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
            <div>
              <button>Create</button>
            </div>
          </form>
        </div>
      )}

      {editForm === true && (
        <div className="content">
          <h1>Edit Customers</h1>

          <form onSubmit={editSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
            </div>
            <div>
              <label htmlFor="name">Age</label>
              <input
                name="age"
                type="number"
                onChange={(event) => {
                  setAge(event.target.value);
                }}
                value={age}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                name="address"
                type="text"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                value={address}
              />
            </div>
            <div>
              <button>Update</button>
            </div>
          </form>
        </div>
      )}

      <div className="customers">
        <h1>Customers</h1>
        {customers.map((customer, key) => (
          <div key={key} className="customer">
            <p>{customer.name}</p>
            <button
              onClick={() => {
                handleDelete(customer, key);
              }}
            >
              Delete
            </button>

            <button
              onClick={() => {
                handleEdit(customer, key);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;
