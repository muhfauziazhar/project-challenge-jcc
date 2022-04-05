import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ParticipantForm from "./components/ParticipantForm";
import EditParticipantForm from "./components/EditParticipantForm";
import ListParticipant from "./components/ListParticipant";

import "./index.css";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="add-participant" element={<ParticipantForm />} />
      <Route path="list-participant" element={<ListParticipant />} />
      <Route
        path="edit-participant/:id"
        element={<EditParticipantForm />}
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
