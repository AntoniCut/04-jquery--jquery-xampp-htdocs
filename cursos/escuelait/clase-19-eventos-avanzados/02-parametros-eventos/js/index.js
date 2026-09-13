$(".uno").on("click", {
  nombre: "Iván",
  periodo: "dias"
}, saludar);

$(".dos").on("click", {
  nombre: "Marco",
  periodo: "noches"
}, saludar);

function saludar(e){
  $(this).text("hola " + e.data.nombre + " buenos " + e.data.periodo);
}