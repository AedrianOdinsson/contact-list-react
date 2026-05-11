import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Contacts() {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Cargar contactos al entrar
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const resp = await fetch(
      `https://playground.4geeks.com/contact/agendas/${store.agenda}/contacts`
    );
    const data = await resp.json();

    dispatch({ type: "setContacts", payload: data.contacts });
  };


  const deleteContact = async (id) => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${store.agenda}/contacts/${id}`,
      { method: "DELETE" }
    );
    dispatch({ type: "deleteContact", payload: id });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Contacts</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate("/add")}
        >
          Add new contact
        </button>
      </div>

      {store.contacts.map((c) => (
        <div key={c.id} className="card mb-2 p-3 d-flex flex-row justify-content-between">
          <div>
            <h5>{c.name}</h5>
            <p>{c.address}</p>
            <p>{c.phone}</p>
            <p>{c.email}</p>
          </div>
          <div>
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate(`/edit/${c.id}`)}
            >
              ✏
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteContact(c.id)}
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
