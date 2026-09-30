// ---------- Datos ----------
// Estructura de datos: arreglo de objetos { id, nombre, telefono }
let contactos = [];
let siguienteId = 1;

// ---------- Elementos del DOM ----------
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const inputBuscador = document.getElementById("buscador");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");
const contador = document.getElementById("contador");


function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  
  if (nombre === "" || telefono === "") {
    return;
  }

  contactos.push({ id: siguienteId++, nombre: nombre, telefono: telefono });

  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  render();
}


function eliminarContacto(id) {
  contactos = contactos.filter(function (c) {
    return c.id !== id;
  });
  render();
}


function actualizarContador() {
  contador.textContent = "Contactos: " + contactos.length;
}


function render() {
  const texto = inputBuscador.value.trim().toLowerCase();

  const visibles = contactos.filter(function (c) {
    return c.nombre.toLowerCase().includes(texto);
  });

  lista.innerHTML = "";

  visibles.forEach(function (c) {
    const li = document.createElement("li");
    li.className = "contacto";

    const info = document.createElement("div");
    info.className = "contacto-info";

    const nombre = document.createElement("span");
    nombre.className = "contacto-nombre";
    nombre.textContent = c.nombre;

    const telefono = document.createElement("span");
    telefono.className = "contacto-telefono";
    telefono.textContent = c.telefono;

    info.appendChild(nombre);
    info.appendChild(telefono);

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    
    btnEliminar.addEventListener("click", function () {
      eliminarContacto(c.id);
    });

    li.appendChild(info);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });


  if (contactos.length === 0) {
    mensajeVacio.textContent = "Todavía no agregaste contactos.";
    mensajeVacio.classList.remove("oculto");
  } else if (visibles.length === 0) {
    mensajeVacio.textContent = "No se encontraron contactos con ese nombre.";
    mensajeVacio.classList.remove("oculto");
  } else {
    mensajeVacio.classList.add("oculto");
  }

  actualizarContador();
}


btnAgregar.addEventListener("click", agregarContacto);
inputBuscador.addEventListener("input", render);

render();
