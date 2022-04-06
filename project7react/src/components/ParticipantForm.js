import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";

const ParticipantForm = () => {
  const [getFullName, setFullName] = useState("");
  const [getBusinessName, setBusinessName] = useState("");
  const [getPhone, setPhone] = useState("");
  const [getEmail, setEmail] = useState("");

  const inputHandlerFullName = (fullname) => {
    return setFullName(fullname);
  };

  const inputHandlerBusinessName = (bus) => {
    return setBusinessName(bus);
  };

  const inputHandlerPhone = (phone) => {
    return setPhone(phone);
  };

  const inputHandlerEmail = (email) => {
    return setEmail(email);
  };

  function saveParticipant() {
    // console.log("name: ", getFullName);
    // console.log("phone: ", getPhone);
    // console.log("note: ", getNote);
    axios({
      method: "POST",
      url: "https://proma-api.herokuapp.com/participants",
      data: {
        fullName: getFullName,
        businessName: getBusinessName,
        email: getEmail,
        phone: getPhone,
      },
    }).then((result) => {
      if (result.data) {
        alert("data berhasil ditambahkan !");
        window.location.href = "/list-participant";
      } else {
        alert("data gagal ditambahkan!");
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
                placeholder="contoh: Muhammad Fauzi Azhar"
                className="form-control"
                required="required"
                onChange={(e) => inputHandlerFullName(e.target.value)}
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="bus" className="required">
                Nama Bisnis
              </label>
              <input
                type="text"
                placeholder="contoh: Maju Terus Jaya"
                className="form-control"
                required="required"
                onChange={(e) =>
                  inputHandlerBusinessName(e.target.value)
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="phone" className="required">
                Nomor Telepon
              </label>
              <input
                type="text"
                placeholder="contoh: +6289545755508"
                className="form-control"
                onChange={(e) => inputHandlerPhone(e.target.value)}
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="email" className="required">
                Email
              </label>
              <input
                type="email"
                placeholder="contoh: emailkamu@gmail.com"
                className="form-control"
                onChange={(e) => inputHandlerEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <p color="#FF0000">*wajib diisi</p>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => saveParticipant()}
                style={{ cursor: "pointer" }}
              >
                Tambahkan Participant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantForm;
