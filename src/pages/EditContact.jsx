import { useParams, useNavigate } from "react-router-dom"

export default function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setFrom] = useState({
        Nombre_Apellido: "",
        email: "",
        direccion: "",
        Tlf: ""
    });

    const handleChange = (e) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos a guardar:", form);
        alert("a implementar el viernes la API");
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Editar contacto #{id}</h1>

            <form onSubmit={handleSubmit} className="edit-form">

                <label>Nombre completo</label>
                <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Ej: juan@mail.com"
                />

                <label>Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Ej: +34 600 123 456"
                />

                <label>Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Ej: Calle Falsa 123"
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
