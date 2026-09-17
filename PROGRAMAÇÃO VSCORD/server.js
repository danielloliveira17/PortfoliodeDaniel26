const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "portfolio"
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err.message);
        return;
    }

    console.log("Conectado ao MySQL com sucesso!");
});

app.post("/api/login", (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            success: false,
            message: "E-mail e senha são obrigatórios."
        });
    }

    const sql = `
        SELECT id, nome, email
        FROM usuarios
        WHERE email = ? AND senha = ?
        LIMIT 1
    `;

    db.query(sql, [email, senha], (err, results) => {

        if (err) {
            console.error("Erro ao consultar usuário:", err.message);

            return res.status(500).json({
                success: false,
                message: "Erro interno no servidor."
            });
        }

        if (results.length > 0) {

            const usuario = results[0];

            return res.json({
                success: true,
                message: "Login realizado com sucesso!",
                user: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        }

        return res.status(401).json({
            success: false,
            message: "E-mail ou senha inválidos!"
        });
    });
});

app.post("/api/cadastro", (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios."
        });
    }

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nome, email, senha], (err, result) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    success: false,
                    message: "Este e-mail já está cadastrado!"
                });
            }

            console.error("Erro ao cadastrar usuário:", err.message);

            return res.status(500).json({
                success: false,
                message: "Erro interno no servidor."
            });
        }

        return res.json({
            success: true,
            message: "Cadastro realizado com sucesso!"
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});