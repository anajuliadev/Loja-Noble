const CLIENTE_DB = 'clientedb';

function getClientes() {
    const clientes = localStorage.getItem(CLIENTE_DB);
    return clientes ? JSON.parse(clientes) : [];
}

function salvarClientes(clientes) {
    localStorage.setItem(CLIENTE_DB, JSON.stringify(clientes));
}

function criarCliente(cliente) {
    const clientes = getClientes();
    clientes.push(cliente);
    salvarClientes(clientes);
    alert('Seja bem-vindo(a)!' + cliente.nome);
    window.open('login.html');
}

function lerCliente(email) {
    const clientes = getClientes();
    return clientes.find(cliente => cliente.email === email);
}

function atualizarCliente(email, clienteAlterado) {
    const clientes = getClientes();
    const index = clientes.findIndex(cliente => cliente.email === email);
    if (index !== -1) {
        clientes[index] = clienteAlterado;
        salvarClientes(clientes);
    }
}

function apagarCliente(email) {
    const clientes = getClientes();
    const novaLista = clientes.filter(cliente => cliente.email !== email);
    salvarClientes(novaLista);
}


function cadastrar() {
    
    const nome= document.getElementById('nome').value;
    const nascimento= document.getElementById('nascimento').value;
    const telefone= document.getElementById('telefone').value;
    const email= document.getElementById('email').value;
    const senha= document.getElementById('senha').value;
    if(nome === '' || nascimento === '' || telefone === '' || email === '' || senha === ''){
        alert('Preencha todos os campos');
        return;
    }
    if(lerCliente(email)){
        alert('Email já cadastrado');
        return;
    }
    
    const cliente = {
        nome: nome,
        nascimento: nascimento,
        telefone: telefone,
        email: email,
        senha: senha
    }

    criarCliente(cliente);
    
    
}


//eventos


document.getElementById('btn-cadastrar')
    .addEventListener('click', cadastrar );


   