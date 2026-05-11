import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    // Buscar contacto en el Store
    const contact = store.contacts.find(c => c.id === Number(id));

    // Estado local del formulario
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Cargar datos del contacto al entrar
    useEffect(() => {
        if (contact) {
            setForm({
                name: contact.name || "",
                email: contact.email || "",
                phone: contact.phone || "",
                address: contact.address || ""
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.agenda}/contacts/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        address: form.address
                    })
                }
            );

            const data = await resp.json();

            if (!resp.ok) {
                console.log("Error:", data);
                throw new Error(data.msg || "Error al actualizar contacto");
            }

            // La API devuelve { msg, contact }
            dispatch({
                type: "editContact",
                payload: data.contact
            });

            navigate("/contacts");

        } catch (err) {
            alert(err.message);
        }
    };

    if (!contact) {
        return <h2>No existe el contacto #{id}</h2>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Editar contacto #{id}</h1>

            <form onSubmit={handleSubmit} className="edit-form">

                <label>Nombre completo</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <label>Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <label>Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
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
