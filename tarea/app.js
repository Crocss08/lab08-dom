// Version 3: DOM + eventos + clases y objetos
class Estudiante {
  constructor(nombre, nota) {
    this.nombre = nombre;
    this.nota = nota;
  }

  aprobado() {
    return this.nota >= 11;
  }

  descripcion() {
    return this.nombre + " - " + this.nota.toFixed(2);
  }
}

class Registro {
  constructor() {
    this.estudiantes = [];
  }

  agregar(estudiante) {
    this.estudiantes.push(estudiante);
  }

  eliminar(estudiante) {
    this.estudiantes = this.estudiantes.filter((e) => e !== estudiante);
  }

  buscar(texto) {
    return this.estudiantes.filter((e) =>
      e.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  promedio() {
    if (this.estudiantes.length === 0) {
      return 0;
    }
    let suma = 0;
    this.estudiantes.forEach((e) => {
      suma = suma + e.nota;
    });
    return suma / this.estudiantes.length;
  }
}

const registro = new Registro();
registro.agregar(new Estudiante("Ana", 15));
registro.agregar(new Estudiante("Luis", 9));
registro.agregar(new Estudiante("Marta", 18));

const formNota = document.querySelector("#formNota");
const campoNombre = document.querySelector("#nombre");
const campoNota = document.querySelector("#nota");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const lista = document.querySelector("#lista");
const promedio = document.querySelector("#promedio");

function mostrar() {
  lista.replaceChildren();

  registro.buscar(buscador.value).forEach((e) => {
    const li = document.createElement("li");
    li.textContent = e.descripcion() + " ";
    li.classList.add(e.aprobado() ? "aprobado" : "desaprobado");

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", () => {
      registro.eliminar(e);
      mostrar();
    });

    li.appendChild(btnBorrar);
    lista.appendChild(li);
  });

  promedio.textContent = registro.promedio().toFixed(2);
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
    registro.agregar(new Estudiante(nombre, nota));
    mensaje.textContent = "";
    mensaje.classList.remove("error");
    formNota.reset();
    mostrar();
  }
});

buscador.addEventListener("input", mostrar);

mostrar();