import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };

    if (user.phone === "UnAvailable") {
      setInputData({
        name: user.name,
        email: user.email,
        phone: "UnAvailable",
      });
    } else {
      setInputData(user);
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("User updated successfully!");
    navigate("/users");
  };

  return (
    <div>
      <div className="container">
        <div className=" col-lg-6">
          <form onSubmit={handleSubmit} className="container">
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
                    <button
                      className="btn btn-danger"
                      onClick={() => navigate("/users")}
                    >
                      Back
                    </button>
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
