import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:7000/get-user/" + id)
      .then((res) => {
        if (res.data[0].phone == null) {
          setInputData({
            name: res.data[0].name,
            email: res.data[0].email,
            phone: "UnAvailable",
          });
        } else {
          setInputData(res.data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputData.phone == "UnAvailable") {
      inputData.phone = null;
    }
    axios
      .put("http://localhost:7000/update-user/" + id, inputData)
      .then((res) => {
        alert(res.data);
        navigate("/users");
      });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form form onSubmit={handleSubmit} className="container">
            <div className="card" style={{ textAlign: "left" }}>
              <div className="title">
                <h2 className="MR">Reader update</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={inputData.name}
                        onChange={(e) =>
                          setInputData({ ...inputData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="Email"
                        className="form-control"
                        value={inputData.email}
                        onChange={(e) =>
                          setInputData({ ...inputData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={inputData.phone}
                        onChange={(e) =>
                          setInputData({ ...inputData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Update
                    </button>
                    {/* ! Once Again, use navigate instead of Link ! */}
                    <Link to="/users" className="btn btn-danger">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
