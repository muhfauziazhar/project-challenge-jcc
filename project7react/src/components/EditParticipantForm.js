import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditParticipantForm = () => {
  const [getFullName, setFullName] = useState("");
  const [getBusinessName, setBusinessName] = useState("");
  const [getPhone, setPhone] = useState("");
  const [getEmail, setEmail] = useState("");

  const { id } = useParams();
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://proma-api.herokuapp.com/participants/${id}`,
    }).then((results) => {
      const fullname = results.data.payload.full_name;
      const businessname = results.data.payload.business_name;
      const email = results.data.payload.email;
      const phone = results.data.payload.phone;
      const id = results.data.payload.id;

      setFullName(fullname);
      setBusinessName(businessname);
      setPhone(phone);
      setEmail(email);
    });
  }, []);

  const inputHandlerFullName = (fullname) => {
    return setFullName(fullname);
  };

  const inputHandlerBusinessName = (busname) => {
    return setFullName(busname);
  };

  const inputHandlerPhone = (phone) => {
    return setPhone(phone);
  };

  const inputHandlerEmail = (mail) => {
    return setEmail(mail);
  };

  function updateContact() {
    // console.log("name: ", getFullName);
    // console.log("phone: ", getPhone);
    // console.log("note: ", getNote);
    axios({
      method: "PUT",
      url: `https://proma-api.herokuapp.com/participants/${id}`,
      data: {
        fullName: getFullName,
        businessName: getBusinessName,
        email: getEmail,
        phone: getPhone,
      },
    }).then((result) => {
      if (result.data) {
        alert("data berhasil update !");
        window.location.href = "/list-participant";
      } else {
        alert("data gagal di Update!");
        window.location.reload();
      }
    });
  }

  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>
        <div className="container">
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="fullname" className="required">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control"
                required="required"
                value={getFullName}
                onChange={(e) => inputHandlerFullName(e.target.value)}
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="phone" className="required">
                Nomor Telepon
              </label>
              <input
                type="string"
                className="form-control"
                value={getPhone}
                onChange={(e) => inputHandlerPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="busname" className="required">
                Nama Bisnis
              </label>
              <input
                type="text"
                className="form-control"
                required="required"
                value={getBusinessName}
                onChange={(e) =>
                  inputHandlerBusinessName(e.target.value)
                }
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="email" className="required">
                Nomor Telepon
              </label>
              <input
                type="string"
                className="form-control"
                value={getEmail}
                onChange={(e) => inputHandlerEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => updateContact()}
                style={{ cursor: "pointer" }}
              >
                Update Kontak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditParticipantForm;
