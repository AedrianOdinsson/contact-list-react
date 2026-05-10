import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function AddContact() {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación mínima
        if (!form.full_name || !form.email || !form.phone || !form.address) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const resp = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.agenda}/contacts`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        full_name: form.full_name,
                        email: form.email,
                        phone: form.phone,
                        address: form.address
                    })
                }
            );

            const data = await resp.json();

            if (!resp.ok) {
                console.log("Error:", data);
                throw new Error(data.msg || "Error al crear contacto");
            }

            // La API devuelve: { msg, contact }
            dispatch({ type: "addContact", payload: data.contact });

            navigate("/contacts");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Añadir contacto</h1>

            <form onSubmit={handleSubmit} className="edit-form">
                <label>Nombre completo</label>
                <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label>Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <label>Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <div className="buttons">
                    <button type="submit" className="btn-save">Guardar</button>
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => navigate("/contacts")}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
