// Array para armazenar os clientes e  função para adicionar um novo cliente ao array
const customers = [];

function addCustomer(name, email, phone, address, cpf) {
    const customer = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        cpf: cpf,
    };
    customers.push(customer);
}

// Função para adicionar um novo cliente ao localStorage
function addCustomer(name, email, phone, address, cpf) {
    // Verifica se já existem clientes no localStorage
    let customersArray = JSON.parse(localStorage.getItem("customers")) || [];

    // Verifica se o cliente com o mesmo e-mail já está cadastrado
    const existingCustomer = customersArray.find(
        (customer) => customer.email === email || customer.cpf === cpf
    );

    if (existingCustomer) {
        alert("Cliente com o mesmo e-mail ou cpf já cadastrado.");
        return;
    }

    // Adiciona o novo cliente ao array
    const customer = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        cpf: cpf,
    };
    customersArray.push(customer);

    // Atualiza o localStorage com o array atualizado
    localStorage.setItem("customers", JSON.stringify(customersArray));
}

// Exibe todos os clientes cadastrados no localStorage
function displayCustomers() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    // Obtém os clientes do localStorage
    let customersArray = JSON.parse(localStorage.getItem("customers")) || [];

    if (customersArray.length === 0) {
        outputDiv.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
        return;
    }

    const ul = document.createElement("ul");
    customersArray.forEach((customer) => {
        const li = document.createElement("li");
        li.textContent = `Nome: ${customer.name}, E-mail: ${customer.email}, Telefone: ${customer.phone}, Endereço: ${customer.address}, CPF: ${customer.cpf}`;
        ul.appendChild(li);
    });
    outputDiv.appendChild(ul);
}

// Função para validar os dados do formulário
function validateForm(name, email, phone, address, cpf) {
    if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || address === "" || cpf === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    return true;
}

// Função para lidar com o envio do formulário
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("phone").value;
    const endereco = document.getElementById("address").value;
    const cpf = document.getElementById("cpf").value;

    if (validateForm(name, email, telefone, endereco, cpf)) {
        addCustomer(name, email, telefone, endereco, cpf);
        displayCustomers();

        // Limpa o formulário após o cadastro
        document.getElementById("customerForm").reset();
    }
}

// Event listener para o envio do formulário
const form = document.getElementById("customerForm");
form.addEventListener("submit", handleFormSubmit);

// // Exibe os clientes cadastrados ao carregar a página
displayCustomers();
