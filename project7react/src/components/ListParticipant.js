import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";

const ListParticipant = () => {
  const [getDatas, setDatas] = useState([]);
  const sortedData = getDatas.sort(function (a, b) {
    return a.id - b.id;
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://proma-api.herokuapp.com/participants",
    }).then((results) => {
      setDatas(results.data.payload);
    });
  }, []);

  const printCert = (id) => {
    axios({
      method: "GET",
      url: `https://proma-api.herokuapp.com/participants/${id}/certificate`,
    }).then((results) => {
      const printDoc =
        document.getElementById("printed_frame").contentWindow;
      printDoc.document.open();
      printDoc.document.write(results.data);
      printDoc.document.close();
      printDoc.focus();
      setTimeout(() => {
        printDoc.print();
      }, 1500);
    });
  };

  const printName = (id) => {
    axios({
      method: "GET",
      url: `https://proma-api.herokuapp.com/participants/${id}/nametag`,
    }).then((results) => {
      const printDoc =
        document.getElementById("printed_frame").contentWindow;
      printDoc.document.open();
      printDoc.document.write(results.data);
      printDoc.document.close();
      printDoc.focus();
      setTimeout(() => {
        printDoc.print();
      }, 1500);
    });
  };

  const deleteProduct = (id) => {
    axios({
      method: "delete",
      url: `https://proma-api.herokuapp.com/participants/${id}`,
    }).then((result) => {
      if (!result.data.affectedRows) {
        alert("data berhasil di hapus !");
        window.location.reload();
      } else {
        alert("data gagal ditambahkan!");
        window.location.reload();
      }
    });
  };

  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>
        <div className="container-fluid">
          <h3 className="text-center">Daftar Participant</h3>
          <div className="w-full mw-full">
            <div className="card p-0 bg-very-dark-dm">
              <div className="table-responsive">
                <table className="table table-inner-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name Lengkap</th>
                      <th>Nama Bisnis</th>
                      <th>Email</th>
                      <th>Nomor Telepon</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{data.id}</th>
                          <td>{data.full_name}</td>
                          <td>{data.business_name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>
                            <button
                              className="btn btn-danger mx-1"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                (window.location.href = `/edit-participant/${data.id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-1"
                              style={{
                                cursor: "pointer",
                                marginLeft: "7px",
                              }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Apakah anda yakin untuk menghapus ini ?"
                                  ) === true
                                ) {
                                  deleteProduct(data.id);
                                } else {
                                }
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-primary mx-1"
                              style={{
                                cursor: "pointer",
                                marginLeft: "7px",
                              }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Apakah anda yakin untuk print participant ini ?"
                                  ) === true
                                ) {
                                  printCert(data.id);
                                }
                              }}
                            >
                              Certificate
                            </button>
                            <button
                              className="btn btn-primary mx-1"
                              style={{
                                cursor: "pointer",
                                marginLeft: "7px",
                              }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Apakah anda yakin untuk print participant ini ?"
                                  ) === true
                                ) {
                                  printName(data.id);
                                }
                              }}
                            >
                              Name Tag
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe
        id="printed_frame"
        style={{
          display: "none",
        }}
        title={`Cetak SBG`}
      />
    </>
  );
};

export default ListParticipant;
