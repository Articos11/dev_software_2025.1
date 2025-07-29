# Processo de Revisão de Código do Projeto ResumeAI

Este documento detalha o processo de revisão de código do projeto ResumeAI, visando garantir a qualidade, padronização e colaboração entre os desenvolvedores. Atualmente, o processo de *Pull Request* (PR) é feito em encontros presenciais ou online, com revisão em duplas antes do *push* para a *branch*.

---

## 1. Definições

### Escolha do revisor
A revisão é feita por pelo menos um outro colaborador, além do autor do código. Ambos são responsáveis por analisar o código e sugerir melhorias.

O autor do código solicita a revisão de outro colaborador. Não há um sistema de voluntariado ou rodízio formal, mas a colaboração e a disponibilidade são incentivadas. A ideia é que seja uma escolha mútua baseada na disponibilidade e conhecimento técnico relevante.

### Critérios verificados na revisão
Os revisores devem verificar os seguintes critérios:
* **Legibilidade:** O código deve ser fácil de entender, com nomes de variáveis e funções claros, e comentários explicativos quando necessário.
* **Boas Práticas:** O código deve seguir as boas práticas de programação, como princípios SOLID (quando aplicável) e padrões de codificação definidos para o projeto.
* **Testes:** É fundamental que os testes sejam feitos no momento da revisão. As funções e componentes devem ser testados para garantir que funcionam como esperado e que não introduzem regressões.
* **Facilidade de Escrita de Testes:** O código é estruturado de forma que escrever testes para ele não seja excessivamente complicado ou exija muita configuração.
* **Comentários:** É essencial que haja comentários para esclarecer as partes onde a lógica não é auto-explicativa.
* **Tratamento de Erros:** Exceções e possíveis erros devem ser tratados de forma adequada e informam o usuário ou o sistema sobre o problema.

### Padrão de comentários
Os comentários devem ser respeitosos e construtivos, focando em sugestões de melhoria em vez de críticas. Além disso, devem ser claros, diretos e direcionados unicamente para o aprimoramento de código, sem críticas pessoais. É importante evitar sugestões baseadas puramente em preferências pessoais, que não agregam clara melhoria no projeto. Alguns padrões sugeridos incluem:
* **Sugestão:** "Sugiro que esta lógica possa ser refatorada para X, o que poderia melhorar a legibilidade."
* **Pergunta:** "Você considerou o caso Y aqui? Me parece que pode haver um edge case."
* **Elogio:** "Ótima solução para Z, ficou muito claro!"
* **Pontos de Melhoria:** Identificar o problema e, se possível, propor uma solução ou um caminho para ela.

### Aprovando Pull Request (PR) ou Merge Request (MR)
Um *Pull Request* (PR) ou o equivalente ao processo de revisão atual (feito em duplas) não será mesclado sem pelo menos uma aprovação de um colaborador e só poderá ser aprovado e mergido na *branch* principal quando:
* Todos os critérios de revisão listados acima forem verificados e atendidos.
* Todas as conversas e sugestões no PR/MR forem resolvidas e o código for ajustado conforme necessário pelo autor.
* Não houver bloqueadores significativos ou pendências críticas que possam comprometer a funcionalidade, segurança ou manutenção do projeto.
* O revisor responsável der a aprovação formal no sistema de controle de versão.

---

## 2. Fluxo de Trabalho e Revisão

Conforme o documento `CONTRIBUTING.md` do projeto, nosso fluxo de trabalho é centrado em *issues*:

1.  **Criação de Issue:** Toda nova funcionalidade, correção de *bug* ou melhoria deve começar com a criação de uma *issue* no repositório.
2.  **Pull Request (Revisão em Duplas):** Ao finalizar o trabalho (ou ao fazer uma atualização significativa que requeira revisão), o autor solicita a revisão de pelo menos um outro colaborador. Atualmente, essa revisão é feita em encontros presenciais ou online, com a dupla codificando e revisando juntos.
3.  **Quando Revisar:** Uma revisão de código deve ser solicitada após qualquer *commit* do tipo *update* e, obrigatoriamente, antes do *merge* na *branch* principal.
4.  **Como Revisar:** A revisão é feita em pares. O autor do código e o revisor são responsáveis por analisar o código, sugerir melhorias e garantir que os padrões do projeto estão sendo seguidos.
5.  **Aprovação:** Nenhum código será *pushed* ou integrado à *branch* da *sprint* sem pelo menos uma aprovação formal do revisor.
