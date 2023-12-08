const form = document.querySelector("#wrapper")
const email = document.querySelector("#email")
const senha = document.querySelector("#senha")

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".login-form")
    const cadastros = {
        emails: ["ryangmnascimento@gmail.com"],
        senhas: ["123"]
    };

    form.addEventListener("submit", function(event) {


        const campoEmail = document.getElementById("emailu").value
        const campoSenha = document.getElementById("senhau").value

        if (cadastros.emails.includes(campoEmail)) {
            const index = cadastros.emails.indexOf(campoEmail)
            if (cadastros.senhas[index] === campoSenha) {

            } else {
                event.preventDefault()
                alert("Senha incorreta")
            }
        } else {
            event.preventDefault()
            alert("E-mail não encontrado")
        }
    })
})