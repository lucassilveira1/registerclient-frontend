import axios from "axios";
let alterusuario = {};
let allClients = [];
let id;
const outputDiv = document.getElementById("output");
const buttonGerarCliente = document.getElementById("gerarCliente");
const buttonDelClient = document.getElementById("delClient");
const buttonUpdateClient = document.getElementById("updateButton");


buttonGerarCliente.addEventListener("click", () => {
    getAllClients();
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

async function getAllClients() {
    await axios.get("http://localhost:3333/").then((response) => {
        const { data } = response;
        allClients = data;
        console.log("Salve", allClients);
        displayCustomers();
    });
}

// buttonDelClient.addEventListener("click", () => {
//     id = document.getElementById("delete").value;
//     deleteClient(id);
// });

async function deleteClient(id) {
    await axios
        .delete(`http://localhost:3333/ ${id}`)
        .then((e) => {
            console.log("Sucesso.");
        })
        .catch((error) => console.warn(error));
}

buttonUpdateClient.addEventListener("click", () => {
    id = document.getElementById("update").value;
    handleFormUpdate();
});

function handleFormUpdate() {
    const name = document.getElementById("name").value;
    const mail = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const cpf = document.getElementById("cpf").value;

    alterusuario = {
        name: name,
        mail: mail,
        phone: phone,
        address: address,
        cpf: cpf,
    };

    // Edita o usuário após o cadastro
    document.getElementById("customerForm").reset();
    updateClient(id);
}

async function updateClient(id) {
    await axios
        .put(`http://localhost:3333/ ${id}`, alterusuario)
        .then((e) => {
            console.log("Sucesso");
        })
        .catch((error) => console.error(error));
}

function displayCustomers() {
    if (allClients.length === 0) {
        outputDiv.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
        return;
    }

    const ul = document.createElement("ul");
    allClients.forEach((allClients) => {
        const li = document.createElement("li");
        li.textContent = `Nome: ${allClients.nome}, E-mail: ${allClients.email}, Telefone: ${allClients.telefone}, Endereço: ${allClients.endereco}, CPF: ${allClients.cpf}`;
        ul.appendChild(li);
    });
    outputDiv.appendChild(ul);
}

// Função para validar os dados do formulário
function validateForm(name, email, phone, address, cpf) {
    if (
        name.trim() === "" ||
        email.trim() === "" ||
        phone.trim() === "" ||
        address === "" ||
        cpf === ""
    ) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    return true;
}

// Event listener para o envio do formulário
const form = document.getElementById("customerForm");
// form.addEventListener("submit", handleFormSubmit);
