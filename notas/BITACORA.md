# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos. Navegador usado: (escribe aqui cual usaste)

## Ejercicio 2: Seleccionar y modificar el DOM

```js
// Ejercicio 2: seleccionar y modificar el DOM
const titulo = document.querySelector("#titulo");
titulo.textContent = "Hola TECSUP";
titulo.style.color = "blue";

const mensaje = document.querySelector(".mensaje");
mensaje.classList.add("destacado");

const lista = document.querySelector("#lista");
const nuevo = document.createElement("li");
nuevo.textContent = "JavaScript";
lista.appendChild(nuevo);
```

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
| --- | --- | --- |
| textContent desde la consola | El titulo paso a decir "Hola desde la consola" | No |
| textContent desde app.js | El titulo paso a decir "Hola TECSUP" | Si |
| style.color | El titulo se ve en azul | Si |
| classList.add | El parrafo tiene fondo amarillo | Si |
| createElement + appendChild | La lista muestra un tercer elemento: JavaScript | Si |

## Ejercicio 3: Evento click

```js
// Ejercicio 3: evento click
const btnSumar = document.querySelector("#btnSumar");
const btnReiniciar = document.querySelector("#btnReiniciar");
const contador = document.querySelector("#contador");
let clics = 0;

btnSumar.addEventListener("click", (evento) => {
  clics = clics + 1;
  contador.textContent = clics;
  console.log(evento.type, evento.target);
});

btnReiniciar.addEventListener("click", () => {
  clics = 0;
  contador.textContent = clics;
});
```

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
| --- | --- | --- |
| click | Un clic sobre el boton | 1 |
| dblclick | Un doble clic rapido sobre el boton | 1 |
| mouseover | Pasar el puntero por encima del boton | 1 (cada vez que entra) |

- evento.type muestra el tipo de evento que ocurrio (por ejemplo click).
- evento.target muestra el elemento que recibio el evento (el boton btnSumar).

## Ejercicio 4: Eventos input y submit

```js
// Ejercicio 4: eventos input y submit
const nombre = document.querySelector("#nombre");
const saludo = document.querySelector("#saludo");

nombre.addEventListener("input", () => {
  saludo.textContent = "Hola, " + nombre.value;
});

const formulario = document.querySelector("#formulario");
const correo = document.querySelector("#correo");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!correo.value.includes("@")) {
    resultado.textContent = "Correo no valido: falta @";
    resultado.classList.add("error");
  } else {
    resultado.textContent = "Enviado: " + correo.value;
    resultado.classList.remove("error");
  }
});
```

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
| --- | --- | --- |
| Escribir en el campo nombre | El texto "Hola, ..." cambia letra por letra | No |
| Enviar sin preventDefault | "Enviado" aparece un instante y desaparece; el campo queda vacio | Si |
| Enviar con preventDefault, correo sin @ | Aparece "Correo no valido: falta @" en rojo | No |
| Enviar con preventDefault, correo con @ | Aparece "Enviado:" y el correo | No |

## Ejercicio 5: Clases y objetos

```js
// Ejercicio 5: clases y objetos
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  conDescuento(pct) {
    return this.precio * (1 - pct);
  }

  descripcion() {
    return this.nombre + " - S/ " + this.precio.toFixed(2);
  }
}

const laptop = new Producto("Laptop", 2500);
const mouse = new Producto("Mouse", 45);
const teclado = new Producto("Teclado", 120);
const monitor = new Producto("Monitor", 680);

const productos = [laptop, mouse, teclado, monitor];
const listaProductos = document.querySelector("#productos");

productos.forEach((p) => {
  const li = document.createElement("li");
  li.textContent = p.descripcion();
  listaProductos.appendChild(li);
});
```

| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
| --- | --- | --- | --- | --- |
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510 |

Con la clase defino una sola vez los datos y las acciones de un producto, y cada objeto nuevo las reutiliza.
Para agregar un producto basta una linea con new y aparece en la pagina sin tocar el HTML.

## Ejercicio 6: DOM, eventos y objetos juntos

```js
// Ejercicio 6: DOM, eventos y objetos juntos
class Carrito {
  constructor() {
    this.items = [];
  }

  agregar(producto) {
    this.items.push(producto);
  }

  total() {
    let suma = 0;
    this.items.forEach((p) => {
      suma = suma + p.precio;
    });
    return suma;
  }
}

const carrito = new Carrito();

const formProducto = document.querySelector("#formProducto");
const prodNombre = document.querySelector("#prodNombre");
const prodPrecio = document.querySelector("#prodPrecio");
const listaCarrito = document.querySelector("#carrito");
const total = document.querySelector("#total");

formProducto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const producto = new Producto(prodNombre.value, Number(prodPrecio.value));
  carrito.agregar(producto);

  const li = document.createElement("li");
  li.textContent = producto.descripcion();
  listaCarrito.appendChild(li);

  total.textContent = carrito.total().toFixed(2);
  formProducto.reset();
});
```

| Prueba | Total que muestra la pagina | Correcto (Si/No) |
| --- | --- | --- |
| Cuaderno 12.50 | 12.50 | Si |
| + Lapicero 3.20 | 15.70 | Si |
| + Mochila 89.90 | 105.60 | Si |
| Sin Number() | El producto no aparece; la consola muestra this.precio.toFixed is not a function | No |

| Pieza | Linea de tu codigo donde aparece | Para que sirve |
| --- | --- | --- |
| DOM | `listaCarrito.appendChild(li);` | Mostrar cada producto en la pagina |
| Evento | `formProducto.addEventListener("submit", ...)` | Reaccionar cuando el usuario envia el formulario |
| Objeto | `new Producto(prodNombre.value, Number(prodPrecio.value))` | Guardar los datos del producto con sus metodos |

