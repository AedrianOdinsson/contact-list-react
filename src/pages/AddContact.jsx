import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function AddContact() {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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
        if (!form.name || !form.email || !form.phone || !form.address) {
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
                        name: form.name,
                        phone: form.phone,
                        email: form.email,
                        address: form.address
                    })
                }
            );

            if (!resp.ok) {
                console.log("Error:", data);
                throw new Error(data.msg || "Error al crear contacto");
            }

            navigate("/contacts");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Añadir contacto</h1>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <label>Nombre completo</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
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
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button
                        type="button"
                        className="btn btn-primary btn-cancel"
                        onClick={() => navigate("/contacts")}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
