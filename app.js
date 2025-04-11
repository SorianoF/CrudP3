// ====== LOGIN ======
if (window.location.pathname.includes("login.html")) {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.username === user && u.password === pass);

    if (!existe) return alert("Usuario o contraseña incorrectos");

    localStorage.setItem("usuarioActual", user);
    window.location.href = "index.html";
  });
}

// ====== REGISTER ======
if (window.location.pathname.includes("register.html")) {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("registerUser").value.trim();
    const pass = document.getElementById("registerPass").value;

    if (!user || !pass) return alert("Completa todos los campos");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find(u => u.username === user)) {
      return alert("Ese usuario ya existe");
    }

    usuarios.push({ username: user, password: pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario registrado con éxito");
    window.location.href = "login.html";
  });
}

let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
let editandoId = null;

// DOM
const form = document.getElementById('patientForm');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido'); // Nuevo campo
const dni = document.getElementById('dni');
const edad = document.getElementById('edad');
const lista = document.getElementById('listaPacientes');
const buscar = document.getElementById('buscar');

function mostrarPacientes(filtro = '') {
  lista.innerHTML = '';

  const filtrados = pacientes.filter(p =>
    (p.nombre + ' ' + p.apellido).toLowerCase().includes(filtro.toLowerCase())
  );

  filtrados.forEach(p => {
    const li = document.createElement('li');
    li.className = 'paciente';
    li.innerHTML = `
      <p><strong>Nombre:</strong> ${p.nombre} ${p.apellido}</p>
      <p><strong>DNI:</strong> ${p.dni}</p>
      <p><strong>Edad:</strong> ${p.edad}</p>
      <button onclick="editarPaciente(${p.id})">Editar</button>
      <button onclick="eliminarPaciente(${p.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener('submit', e => {
    e.preventDefault();
  
    const paciente = {
      id: editandoId || Date.now(),
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      dni: dni.value.trim(),
      edad: edad.value.trim()
    };
  
    if (editandoId) {
      pacientes = pacientes.map(p => (p.id === editandoId ? paciente : p));
      editandoId = null;
    } else {
      pacientes.push(paciente);
    }
  
    guardarYMostrar();
    form.reset();
});

function eliminarPaciente(id) {
  if (confirm('¿Deseas eliminar este paciente?')) {
    pacientes = pacientes.filter(p => p.id !== id);
    guardarYMostrar();
  }
}

function editarPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  nombre.value = paciente.nombre;
  apellido.value = paciente.apellido;
  dni.value = paciente.dni;
  edad.value = paciente.edad;
  editandoId = id;
}

buscar.addEventListener('input', () => {
  mostrarPacientes(buscar.value);
});

function guardarYMostrar() {
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  mostrarPacientes();
}

mostrarPacientes();