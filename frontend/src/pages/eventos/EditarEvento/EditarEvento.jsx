import React, { useEffect, useState } from 'react'
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditarEvento = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [local, setLocal] = useState("");
    const [qtd_pessoas, setQtd_pessoas] = useState(0);
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const { id } = useParams();
    const nagivate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/eventos/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setNome(data.nome);
                setDescricao(data.descricao);
                setLocal(data.local);
                setQtd_pessoas(data.qtd_pessoas);
                setData(data.data);
                setHora(data.hora);
            })

            .catch((err) => console.error("Erro ao carregar evento", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/eventos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                descricao,
                local,
                qtd_pessoas,
                data,
                hora,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Evento editado com sucesso");
                nagivate("/evento");
            })
            .catch((err) => alert("Erro ao editar evento"));

    };

    return (
        <div>

            <Header />

            <div className="form-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-content">
                        <h2>Editar Evento</h2>

                        <div className="form-field">
                            <label>Nome do Evento:</label>
                            <input
                                value={nome}
                                type="text"
                                className="input-control"
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>Descrição:</label>
                            <textarea
                                value={descricao}
                                className="text-area"
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>Local:</label>
                            <input
                                value={local}
                                type="text"
                                className="input-control"
                                onChange={(e) => setLocal(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>Quantidade de Pessoas:</label>
                            <input
                                value={qtd_pessoas}
                                type="number"
                                className="input-control"
                                onChange={(e) => setQtd_pessoas(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>Data:</label>
                            <input
                                type="date"
                                className="input-control"
                                onChange={(e) => setData(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>Hora:</label>
                            <input
                                value={hora}
                                type="text"
                                className="input-control"
                                onChange={(e) => setHora(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn">Editar Evento</button>
                    </div>
                </form>
            </div>

            <Footer />

        </div>
    )
}

export default EditarEvento