// Version 2: DOM + eventos
const estudiantes = [
  { nombre: "Ana", nota: 15 },
  { nombre: "Luis", nota: 9 },
  { nombre: "Marta", nota: 18 }
];

const formNota = document.querySelector("#formNota");
const campoNombre = document.querySelector("#nombre");
const campoNota = document.querySelector("#nota");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const lista = document.querySelector("#lista");
const promedio = document.querySelector("#promedio");

function mostrar() {
  lista.replaceChildren();
  const texto = buscador.value.toLowerCase();
  let suma = 0;

  estudiantes.forEach((e, i) => {
    suma = suma + e.nota;
    if (!e.nombre.toLowerCase().includes(texto)) {
      return;
    }

    const li = document.createElement("li");
    li.textContent = e.nombre + " - " + e.nota.toFixed(2) + " ";
    li.classList.add(e.nota >= 11 ? "aprobado" : "desaprobado");

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", () => {
      estudiantes.splice(i, 1);
      mostrar();
    });

    li.appendChild(btnBorrar);
    lista.appendChild(li);
  });

  if (estudiantes.length > 0) {
    promedio.textContent = (suma / estudiantes.length).toFixed(2);
  } else {
    promedio.textContent = "0.00";
  }
}

formNota.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const nota = Number(campoNota.value);

  if (nombre === "") {
    mensaje.textContent = "Escribe un nombre";
    mensaje.classList.add("error");
  } else if (campoNota.value === "" || isNaN(nota) || nota < 0 || nota > 20) {
    mensaje.textContent = "La nota debe estar entre 0 y 20";
    mensaje.classList.add("error");
  } else {
    estudiantes.push({ nombre: nombre, nota: nota });
    mensaje.textContent = "";
    mensaje.classList.remove("error");
    formNota.reset();
    mostrar();
  }
});

buscador.addEventListener("input", mostrar);

mostrar();
