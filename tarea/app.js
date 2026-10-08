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
 