# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos. Navegador usado: (escribe aqui cual usaste)

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
| --- | --- | --- |
| textContent desde la consola | El titulo paso a decir "Hola desde la consola" | No |
| textContent desde app.js | El titulo paso a decir "Hola TECSUP" | Si |
| style.color | El titulo se ve en azul | Si |
| classList.add | El parrafo tiene fondo amarillo | Si |
| createElement + appendChild | La lista muestra un tercer elemento: JavaScript | Si |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
| --- | --- | --- |
| click | Un clic sobre el boton | 1 |
| dblclick | Un doble clic rapido sobre el boton | 1 |
| mouseover | Pasar el puntero por encima del boton | 1 (cada vez que entra) |

- evento.type muestra el tipo de evento que ocurrio (por ejemplo click).
- evento.target muestra el elemento que recibio el evento (el boton btnSumar).

## Ejercicio 4: Eventos input y submit

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
| --- | --- | --- |
| Escribir en el campo nombre | El texto "Hola, ..." cambia letra por letra | No |
| Enviar sin preventDefault | "Enviado" aparece un instante y desaparece; el campo queda vacio | Si |
| Enviar con preventDefault, correo sin @ | Aparece "Correo no valido: falta @" en rojo | No |
| Enviar con preventDefault, correo con @ | Aparece "Enviado:" y el correo | No |

**Captura:** [ Pega aqui tu captura ]

## Ejercicio 5: Clases y objetos

| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
| --- | --- | --- | --- | --- |
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510 |

Con la clase defino una sola vez los datos y las acciones de un producto, y cada objeto nuevo las reutiliza.
Para agregar un producto basta una linea con new y aparece en la pagina sin tocar el HTML.

## Ejercicio 6: DOM, eventos y objetos juntos

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

