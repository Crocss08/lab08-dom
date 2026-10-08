# Tarea: Mi componente interactivo
 
## Componente elegido
 
Registro de notas con promedio. Permite agregar estudiantes con su nota (0 a 20), buscarlos por nombre, borrarlos y ver el promedio del grupo. Una nota de 11 o mas se marca como aprobada (verde) y menos de 11 como desaprobada (rojo).
 
## Version 1: solo DOM
 
```js
// Version 1: solo DOM
const nombres = ["Ana", "Luis", "Marta"];
const notas = [15, 9, 18];
 
const lista = document.querySelector("#lista");
const promedio = document.querySelector("#promedio");
 
let suma = 0;
for (let i = 0; i < nombres.length; i++) {
  const li = document.createElement("li");
  li.textContent = nombres[i] + " - " + notas[i];
  if (notas[i] >= 11) {
    li.classList.add("aprobado");
  } else {
    li.classList.add("desaprobado");
  }
  lista.appendChild(li);
  suma = suma + notas[i];
}
 
promedio.textContent = (suma / notas.length).toFixed(2);
```
 
- **Que agregue:** una lista con tres estudiantes fijos, creada con createElement y appendChild, y el promedio calculado con un bucle.
- **Por que:** para tener primero la estructura en pantalla usando solo DOM, sin eventos ni clases.
- **Que cambio en el comportamiento:** la pagina muestra Ana, Luis y Marta con color segun su nota y el promedio 14.00, pero no reacciona a nada: para cambiar los datos hay que editar app.js.
**Captura:** [ Pega aqui tu captura ]
 
## Version 2: con eventos
 
```js
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
```
 
- **Que agregue:** un formulario (evento submit) con validacion y mensaje en pantalla, un boton Borrar por cada fila (evento click) y un buscador (evento input). Los datos pasaron a un arreglo de objetos literales y la lista se dibuja con la funcion mostrar().
- **Por que:** para que el usuario pueda cambiar los datos sin tocar el codigo.
- **Que cambio en el comportamiento:** ahora se pueden agregar y borrar estudiantes, filtrar por nombre y el promedio se actualiza solo. Los datos invalidos muestran un mensaje en rojo en la pagina.
**Captura:** [ Pega aqui tu captura ]
 
## Version 3: con clases y objetos
 
```js
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
```
 
- **Que agregue:** las clases Estudiante (nombre, nota, aprobado(), descripcion()) y Registro (estudiantes, agregar(), eliminar(), buscar(), promedio()). La logica de los datos salio de los eventos y quedo dentro de los objetos.
- **Por que:** los objetos literales repetian la logica (nota aprobada, promedio, busqueda) dentro de los eventos. Con clases cada cosa tiene un solo lugar y el codigo se entiende mejor.
- **Que cambio en el comportamiento:** nada a la vista del usuario; la pagina funciona igual, pero el codigo esta mas ordenado y es mas facil de ampliar.
**Captura:** [ Pega aqui tu captura ]
 
## Donde uso DOM, eventos y objetos
 
| Pieza | Linea de mi codigo donde aparece | Para que sirve |
| --- | --- | --- |
| DOM | `lista.appendChild(li);` y `promedio.textContent = ...` | Mostrar cada estudiante y el promedio en la pagina |
| Evento | `formNota.addEventListener("submit", ...)`, `btnBorrar.addEventListener("click", ...)` y `buscador.addEventListener("input", mostrar)` | Reaccionar al envio del formulario, al boton Borrar y a lo que se escribe en el buscador |
| Objeto | `registro.agregar(new Estudiante(nombre, nota));` | Guardar los datos de cada estudiante y calcular el promedio con metodos |
 
## Pruebas realizadas
 
| Accion | Resultado esperado | Resultado obtenido | Cumple (Si / No) |
| --- | --- | --- | --- |
| Abrir la pagina | Lista con Ana 15.00, Luis 9.00 y Marta 18.00; promedio 14.00 | Lista con Ana 15.00, Luis 9.00 y Marta 18.00; promedio 14.00 | Si |
| Agregar Pedro con nota 12 | Pedro aparece en verde y el promedio pasa a 13.50 | Pedro aparece en verde y el promedio pasa a 13.50 | Si |
| Agregar con el nombre vacio | Mensaje "Escribe un nombre" en rojo y no se agrega | Mensaje "Escribe un nombre" en rojo y no se agrega | Si |
| Agregar con nota 25 | Mensaje "La nota debe estar entre 0 y 20" y no se agrega | Mensaje "La nota debe estar entre 0 y 20" y no se agrega | Si |
| Borrar a Luis | Luis desaparece y el promedio pasa a 16.50 | Luis desaparece y el promedio pasa a 16.50 | Si |
| Escribir "an" en el buscador | Solo se muestra Ana; el promedio sigue en 14.00 | Solo se muestra Ana; el promedio sigue en 14.00 | Si |
 
**Captura:** [ Pega aqui tu captura ]
 
## Por que disene asi mi clase
 
Cree la clase Estudiante con los atributos nombre y nota porque son los dos datos que tiene cada fila, y le di los metodos aprobado() y descripcion() para que cada objeto sepa decir si aprobo y como se escribe en pantalla. Cree la clase Registro con el atributo estudiantes porque necesitaba un lugar que guardara a todos y tuviera las acciones del grupo: agregar(), eliminar(), buscar() y promedio(). Separe las dos clases para que lo que le pasa a un estudiante no se mezcle con lo que pasa al grupo, y asi los eventos solo llaman a los metodos sin repetir la logica.