const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "https://danielloliveira17.github.io",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
const db = mysql.createPool({
    host: process.env.MYSQLHOST || "127.0.0.1",
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "portfolio",

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 5,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

console.log("Pool do MySQL configurado com sucesso!");

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});