import axios from "axios";
let novousuario = {};
const button = document.getElementById("button");


// Função pra enviar o cadastro

button.addEventListener ('click',() => { 

    const name = document.getElementById("name").value;
    const mail = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const cpf = document.getElementById("cpf").value;

    novousuario = {
        name: name,
        mail: mail,
        phone: phone,
        address: address,
        cpf: cpf,
    };

    // Limpa o formulário após o cadastro
    addClient();
    document.getElementById("customerForm").reset();
});

// Função para adicionar um cliente na DB

async function addClient() {
    await axios
        .post("http://localhost:3333/", novousuario)
        .then(() => {
            console.log("Criada!");
        })
        .catch((err) => {
            console.warn(err);
        });
}