// Lógica de Avaliação e Feedback (US11)
let notaSelecionada = 5;

function selecionarEstrela(nota) {
    notaSelecionada = nota;
    let estrelas = document.querySelectorAll("#grupo-estrelas i");
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.classList.add("selecionada");
        } else {
            estrela.classList.remove("selecionada");
        }
    });
}

function enviarAvaliacao() {
    let comentario = document.getElementById("comentario-aval");
    if (comentario.value.trim() === "") {
        comentario.style.border = "2px solid #e74c3c";
        alert("Por favor, escreva um comentário antes de enviar a avaliação.");
        return;
    }
    comentario.style.border = "1px solid #e6d7cd";
    alert(`Obrigado! Sua avaliação de ${notaSelecionada} estrelas foi enviada com sucesso.`);
    comentario.value = "";
    comentario.blur();
    selecionarEstrela(5);
}
