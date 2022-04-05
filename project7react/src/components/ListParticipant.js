import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";

const ListParticipant = () => {
  const [getDatas, setDatas] = useState([]);
  const [getCert, setCert] = useState("");
  const sortedData = getDatas.sort(function (a, b) {
    return a.id - b.id;
  });

  //ketika reload dapat data dibwah
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3333/participants",
    }).then((results) => {
      setDatas(results.data.payload);
    });
  }, []);

  const deleteProduct = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:3333/participants/${id}`,
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
    <div>
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
                      <th>Catatan</th>
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
                            <div className="row">
                              <div className="col-3">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    (window.location.href = `/edit-participant/${data.id}`)
                                  }
                                >
                                  🔍
                                </span>
                              </div>
                              <div className="col-3">
                                <span
                                  style={{ cursor: "pointer" }}
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
                                  ❌
                                </span>
                              </div>
                            </div>
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
    </div>
  );
};

export default ListParticipant;
