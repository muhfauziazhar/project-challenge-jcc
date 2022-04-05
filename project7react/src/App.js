import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>
        <div className="container">
          <div className="m-10">
            <h4 className="text-center">
              <i style={{ fontSize: 24 }}>
                Participant Management App
              </i>
            </h4>
            <div className="alert alert-primary" role="alert">
              <h4 className="alert-heading mt-10">
                Penambahan Participant
              </h4>
              <p>
                Fitur ini berfungsi untuk menambah participant acara
              </p>
              <div className="mb-10 text-right">
                <Link to="/add-participant" className="btn alt-dm">
                  Tambah Sekarang
                </Link>
              </div>
            </div>
            <div className="alert alert-primary mt-10" role="alert">
              <h4 className="alert-heading mt-10">
                Pengelolaan Participant
              </h4>
              <p>
                Fitur ini berfungsi untuk mengelola daftar participant
                acara
              </p>
              <div className="mb-10 text-right">
                <Link to="/list-participant" className="btn alt-dm">
                  Lihat Lebih Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
