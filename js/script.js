document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.querySelector(".menu");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});


function enviarWhats(event) {
    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5544999861300'

    const texto = `Olá! Me chamo ${nome}, ${mensagem}`
    const msgFormatada = encodeURIComponent(texto)
    const url = `https://wa.me/${telefone}?text=${msgFormatada}`

    console.log(url)

    window.open(url, '_blank')
}

function validarFormulario(event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const mensagemInput = document.getElementById("mensagem");

    const erroNome = document.getElementById("erro-nome");
    const erroMensagem = document.getElementById("erro-mensagem");

    erroNome.textContent = "";
    erroMensagem.textContent = "";

    let valido = true;

    if (!nomeInput.value.trim()) {
        erroNome.textContent = "Por favor, preencha seu nome.";
        valido = false;
    }

    if (!mensagemInput.value.trim()) {
        erroMensagem.textContent = "Por favor, digite sua mensagem.";
        valido = false;
    }

    if (valido) {
        enviarWhats(event);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const githubRepositoriosHtml = document.getElementById("github_repositorios");
    let totalCommits = 0;
    let totalPRs = 0;
    const repositorios = ["portfolio-gabrielalima", "IFolha", "projeto-nibbi", "projeto-fullsttack-web"];

    githubRepositoriosHtml.innerHTML = "";
    document.getElementById("repo_count").textContent = repositorios.length;

    repositorios.forEach(repoName => {
        fetch(`https://api.github.com/repos/gabrielasilima/${repoName}`)
            .then(repoResponse => repoResponse.json())
            .then(repo => {
                const repoDiv = document.createElement("div");
                repoDiv.classList.add("repo_card");

                repoDiv.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>Atualizado em: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                `;
                githubRepositoriosHtml.appendChild(repoDiv);

                fetch(repo.commits_url.replace("{/sha}", ""))
                    .then(r => r.json())
                    .then(commits => {
                        totalCommits += commits.length;
                        document.getElementById("commit_count").textContent = totalCommits;
                    })
                    .catch(() => {
                        console.error(`Erro ao buscar commits do repositório ${repo.name}`);
                    });

                fetch(`https://api.github.com/repos/gabrielasilima/${repo.name}/pulls?state=all`)
                    .then(r => r.json())
                    .then(pulls => {
                        totalPRs += pulls.length;
                        document.getElementById("pr_count").textContent = totalPRs;
                    })
                    .catch(() => {
                        console.error(`Erro ao buscar PRs do repositório ${repo.name}`);
                    });
            })
            .catch(error => {
                console.error(`Erro ao buscar dados do repositório ${repoName}:`, error);
            });
    });


});