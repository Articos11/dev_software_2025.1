# Guia de Contribuição do Projeto

Prezado colaborador,

Agradecemos seu interesse em contribuir com nosso projeto! Este documento serve como um guia para garantir que o processo de colaboração seja claro, eficiente e padronizado para todos. Solicitamos que leia atentamente as seções a seguir antes de iniciar seu trabalho.

## Fluxo de Colaboração

Nosso fluxo de trabalho é centrado em `Issues`. Toda e qualquer nova funcionalidade, correção de bug ou melhoria deve começar com a criação de uma Issue no repositório.

1.  **Verifique as Issues:** Antes de criar uma nova Issue, verifique se não existe uma similar já aberta.
2.  **Crie uma Issue:** Caso não exista, crie uma nova Issue detalhando claramente a tarefa a ser realizada. Inclua descrições, critérios de aceitação e, se for um bug, passos para reproduzi-lo.
3.  **Atribua a Issue:** Atribua a Issue a si mesmo ou aguarde que um dos mantenedores a atribua a você.
4.  **Crie uma Branch:** Crie uma nova branch a partir da branch da sprint atual (ex: `sprint-1`) para trabalhar na sua Issue.
5.  **Desenvolva:** Implemente o código necessário para resolver a Issue.
6.  **Abra um Pull Request (PR):** Ao finalizar o trabalho (ou ao fazer uma atualização significativa que requeira revisão), abra um Pull Request para a branch da sprint correspondente. No título ou na descrição do PR, faça referência à Issue que ele resolve (ex: `Resolve #42`).

## Padrão de Ramificação (Branches)

O desenvolvimento é organizado em Sprints. As branches principais de desenvolvimento seguirão o padrão:
* `sprint-1`
* `sprint-2`
* `sprint-3`
* `sprint-4`
* `sprint-5`

Todo o trabalho deve ser feito em branches de funcionalidade criadas a partir da branch da sprint vigente. Recomendamos nomear sua branch seguindo o padrão `feature/nome-da-funcionalidade` ou `issue/numero-da-issue`.

## Padrão de Mensagens de Commit

Para manter um histórico de commits limpo e rastreável, seguimos um padrão sequencial de mensagens:

1.  **`commit inicial`**
    * **Uso:** Apenas para o primeiro commit na sua branch, geralmente com a estrutura inicial de arquivos para a tarefa.

2.  **`update (situação)`**
    * **Uso:** Para cada atualização significativa durante o desenvolvimento. Substitua `(situação)` por uma descrição curta e imperativa do que foi feito.
    * **Exemplos:**
        * `update (adiciona validação no formulário de login)`
        * `update (corrige cálculo de juros na API)`
        * `update (refatora serviço de autenticação)`

3.  **`produto finalizado`**
    * **Uso:** Para o último commit da branch, indicando que a funcionalidade está completa, testada e pronta para a revisão final e merge.

## Processo de Revisão de Código (Code Review)

A revisão de código é uma etapa fundamental para garantir a qualidade do nosso projeto.

* **Quando revisar:** Uma revisão de código deve ser solicitada após qualquer commit do tipo `update` e, obrigatoriamente, antes do merge do `produto finalizado`.
* **Como revisar:** A revisão é feita **em pares**. O autor do Pull Request deve solicitar a revisão de pelo menos um outro colaborador. Ambos são responsáveis por analisar o código, sugerir melhorias e garantir que os padrões do projeto estão sendo seguidos. Nenhum PR será mesclado sem pelo menos uma aprovação.

## Configuração do Ambiente de Desenvolvimento Local

Para configurar o projeto em sua máquina local, siga os passos abaixo:

```bash
# 1 - Inicializar um ambiente virtual com o comando:
python -m venv .venv

# 2 - Mudar para a pasta do servidor:
cd server

# 3 - Iniciar o ambiente virtual:
# Para Windows (Git Bash ou PowerShell com políticas de execução liberadas):
source .venv/Scripts/activate

# Para Linux/macOS:
source .venv/bin/activate

# 4 - Instalar as bibliotecas externas:
pip install -r requirements.txt

# 5 - Rodar o arquivo da API:
# Usando Git Bash:
py api.py

# Usando PowerShell ou CMD no Windows:
python api.py