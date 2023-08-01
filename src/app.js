const cuentas = [
    { name: 'Malena', lastname: 'Martínez', username: 'Mali', password: 'm2630', saldo: 200 },
    { name: 'Gerardo', lastname: 'Mendieta', username: 'Gera', password: 'g5137', saldo: 290 },
    { name: 'Mauricio', lastname: 'Torres', username: 'Maui', password: 'm3754', saldo: 67 },
    { name: 'Doris', lastname: 'Rivera', username: 'Dor', password: 'd7589', saldo: 356 },
    { name: 'Federico', lastname: 'Mercado', username: 'Fede', password: 'f3330', saldo: 421}
];

const saldoMaximo = 990;
const saldoMinimo = 10;

let currentUser = null;
let saldo = 0;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const cliente = cuentas.find(c => c.username === username && c.password === password);
    
    if (!cliente) {
       
       Swal.fire({
        imageUrl: 'Images/warning2.webp',
        imageHeight: 120,
        imageWidth: 120,
        type:'warning',
        title:'<span class="formato-texto">El Usuario o la contraseña es incorrecto,</span> <br> <br> <span class="formato-texto2">Por favor ingréselos nuevamente</span>',
        background: '#E2CB7D',
        confirmButtonColor: '#17649C',
        confirmButtonText: '<span class="size-text">OK</span>',                
    });
       return;
    }
    
    currentUser = cliente.username;
    saldo = cliente.saldo;
    firstName = cliente.name;
    lastName = cliente.lastname;
    console.log(firstName + lastName);

    document.getElementById('currentUser').textContent = currentUser;
    document.getElementById('saldo').textContent = saldo;
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainSection').style.display = 'block';
}

function consultarSaldo() {
    
    Swal.fire({
        imageUrl: 'Images/Ok_icon_2.png',
        imageHeight: 120,
        imageWidth: 120,
        type:'notification',
        title:`<small class="formato-texto">${firstName} ${lastName}</small>`,
        html: `
        <h2 class="formato-texto">Saldo actual: <span class="formato-texto2">$</span><small class="formato-texto2">${saldo}</small> MXN</h2>`,
        background: '#E2CB7D',
        confirmButtonColor: '#17649C',
        confirmButtonText: '<span class="size-text">OK</span>',                 
    }); 
}

function ingresarMonto() {
    const montoIngreso = parseFloat(document.getElementById('montoIngreso').value);
    if (isNaN(montoIngreso) || montoIngreso <= 0) {
        
        Swal.fire({
            imageUrl: 'Images/warning2.webp',
            imageHeight: 120,
            imageWidth: 120,
            type:'warning',
            title:'<span class="formato-texto">Ingresa una cantidad válida mayor a 0</span>',
            background: '#E2CB7D',
            confirmButtonColor: '#17649C',
            confirmButtonText: '<span class="size-text">OK</span>',                
        });
        return;
    }
    const nuevoSaldo = saldo + montoIngreso;
    if (nuevoSaldo > saldoMaximo) {
        
        Swal.fire({
            imageUrl: 'Images/warning2.webp',
            imageHeight: 120,
            imageWidth: 120,
            type:'warning',
            title:`<small class="formato-texto">${firstName} ${lastName}</small>`,
            html: `
            <h2 class="formato-texto">El saldo no debe superar los <span class="formato-texto2">$</span><small class="formato-texto2">${saldoMaximo}</small> MXN</h2>`,
            background: '#E2CB7D',
            confirmButtonColor: '#17649C',
            confirmButtonText: '<span class="size-text">OK</span>',                 
        });
        return; 
    }

    saldo = nuevoSaldo;
    actualizarSaldo();
    
    Swal.fire({
        imageUrl: 'Images/Ok_icon_2.png',
        imageHeight: 120,
        imageWidth: 120,
        type:'notification',
        title:`<small class="formato-texto">${firstName} ${lastName}</small>`,
        html: `
        <h2 class="formato-texto">Has ingresado <span class="formato-texto2">$</span><small class="formato-texto2">${montoIngreso}</small> MXN.</h2>
        <br>
        <h3 class="formato-texto">Tu nuevo saldo es de: <span class="formato-texto2">$</span><small class="formato-texto2">${saldo}</small> MXN.</h3>`,
        background: '#E2CB7D',
        confirmButtonColor: '#17649C',
        confirmButtonText: '<span class="size-text">OK</span>',                 
    });

}

function retirarMonto() {
    const montoRetiro = parseFloat(document.getElementById('montoRetiro').value);
    if (isNaN(montoRetiro) || montoRetiro <= 0) {
       
        Swal.fire({
            imageUrl: 'Images/warning2.webp',
            imageHeight: 120,
            imageWidth: 120,
            type:'warning',
            title:'<span class="formato-texto">Ingresa una cantidad válida mayor a 0</span>',
            background: '#E2CB7D',
            confirmButtonColor: '#17649C',
            confirmButtonText: '<span class="size-text">OK</span>',                
        }); 
        return;
    }
    const nuevoSaldo = saldo - montoRetiro;
    console.log(nuevoSaldo);
    if (nuevoSaldo < saldoMinimo && nuevoSaldo >= 0) {
        
        Swal.fire({
            imageUrl: 'Images/warning2.webp',
            imageHeight: 120,
            imageWidth: 120,
            type:'warning',
            title:`<small class="formato-texto">${firstName} ${lastName}</small>`,
            html: `
            <h2 class="formato-texto">El saldo no puede ser menor a los <span class="formato-texto2">$</span><small class="formato-texto2">${saldoMinimo}</small> MXN</h2>`,
            background: '#E2CB7D',
            confirmButtonColor: '#17649C',
            confirmButtonText: '<span class="size-text">OK</span>',                 
        });
        return;
    } 
    if (nuevoSaldo < 0) {         
        
        Swal.fire({
            imageUrl: 'Images/warning2.webp',
            imageHeight: 120,
            imageWidth: 120,
            type:'warning',
            title:'<span class="formato-texto">Fondos insuficientes</span>',
            background: '#E2CB7D',
            confirmButtonColor: '#17649C',
            confirmButtonText: '<span class="size-text">OK</span>',                
        });
        return;
    } 
    
    saldo = saldo =  nuevoSaldo; 
    actualizarSaldo();
    
    Swal.fire({
        imageUrl: 'Images/Ok_icon_2.png',
        imageHeight: 120,
        imageWidth: 120,
        type:'notification',
        title:`<small class="formato-texto">${firstName} ${lastName}</small>`,
        html: `
        <h2 class="formato-texto">Tu retiro fue de <span class="formato-texto2">$</span><small class="formato-texto2">${montoRetiro}</small> MXN.</h2>
        <br>
        <h3 class="formato-texto">Tu nuevo saldo es de: <span class="formato-texto2">$</span><small class="formato-texto2">${saldo}</small> MXN.</h3>`,
        background: '#E2CB7D',
        confirmButtonColor: '#17649C',
        confirmButtonText: '<span class="size-text">OK</span>',                 
    });
}
    
    
    
function logout() {
    currentUser = null;
    saldo = 0;

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('montoIngreso').value = '';
    document.getElementById('montoRetiro').value = '';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainSection').style.display = 'none';   
}

function actualizarSaldo() {
    document.getElementById('saldo').textContent = saldo;
}
