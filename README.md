![Banner do programa](./assets/img_readme/Banner.png)

# Easydesk
Sistema de chamados | Programa Trends IT 2026

Olá, meu nome é Mario Henrique Gimenes Santana, sou de Guarujá/SP. Comecei minha carreira em Engenharia Mecânica pela Universidade Santa Cecília (UNISANTA) e hoje sou estudante de Ciência de Dados pela Universidade Virtual do Estado de São Paulo (UNIVESP), atualmente no terceiro semestre.

Durante minha graduação em engenharia mecânica tive um pouco de contato com noções de programação pelo matlab e com CLPs (Controlador lógico programável), dentro do que aprendi em especial gosto muito da parte de desenho 3D (CAD,CAE,CAM) e Impressão 3D.

Trabalhei por cerca de dois anos como freelancer na empresa americana Lionbridge, o que ajudou não só a me habituar com o trabalho home office mas também a desenvolver meu inglês pois toda a comunicação era feita nela.

Hoje, como estudante de Ciência de Dados pela Universidade Virtual do Estado de São Paulo (UNIVESP) e já formado em Tecnologia da Informação pela Univesp sigo na minha recolocação na área de tecnologia, onde possuo mais de 1 ano de experiência até o momento.

Este projeto é parte da segunda fase do programa Programa Trends IT 2026, oferecido pelo Núcleo Softex Campinas (NSC), parceiro da Univesp, o programa é uma iniciativa voltada à formação e capacitação de profissionais em tecnologias emergentes, visando a inovação digital e desenvolvimento de software. Ele tem como objetivo construir um sistema de chamados centralizado capaz de organizar chamados, acompanhar status e tornar visível o que antes estava perdido em mensagens soltas e processos improvisados.

Abaixo estão listados os artefatos gerados durante este desafio.

## Documento de Visão do Projeto – EasyDesk

O EasyDesk é uma aplicação web voltada ao gerenciamento simplificado de chamados internos. O sistema prioriza facilidade de uso, organização das informações e acompanhamento do ciclo de vida das solicitações, oferecendo uma solução leve, responsiva e de rápida implantação para pequenas equipes e organizações.

<details>
    <summary>Descrição(<i>clique para expandir</i>):</summary>
&nbsp;

## 1. Resumo do Problema

Em muitas equipes, principalmente em pequenos departamentos e organizações, o gerenciamento de solicitações internas ainda é realizado por meio de conversas em aplicativos de mensagens, e-mails ou planilhas. Essa abordagem dificulta o acompanhamento do andamento das solicitações, gera perda de informações, falta de organização e reduz a visibilidade sobre quais demandas estão pendentes, em andamento ou concluídas.

Além disso, torna-se difícil identificar responsáveis por cada solicitação, acompanhar comentários relacionados ao atendimento e manter um histórico organizado das atividades realizadas.

O EasyDesk foi desenvolvido para solucionar esse problema por meio de uma aplicação simples, intuitiva e centralizada para gerenciamento de chamados internos.

## 2. Usuários-alvo

O sistema foi projetado para atender principalmente:

* Pequenas empresas e equipes internas
* Departamentos de Tecnologia da Informação (TI)
* Equipes de Infraestrutura
* Equipes Administrativas
* Organizações que necessitam registrar solicitações sem utilizar ferramentas complexas de Service Desk

Os usuários poderão tanto registrar chamados quanto acompanhar seu andamento e atualizar seu status durante o ciclo de atendimento.

## 3. Objetivo Principal

O objetivo do EasyDesk é fornecer um sistema simples de gerenciamento de chamados que permita:

* Cadastro de grupos de atendimento (função extra)
* Criação organizada de chamados
* Classificação por criticidade
* Acompanhamento do ciclo de vida de cada chamado
* Registro de comentários (função extra)
* Busca rápida por informações
* Filtragem e ordenação dos chamados
* Exportação dos dados em formato CSV

O sistema busca oferecer uma interface limpa e de fácil utilização, reduzindo o tempo necessário para localizar informações e acompanhar o status das solicitações. Algumas funções extras também foram implementadas além do pedido como desafio pessoal e para expandir a robustez da solução.

## 4. Principais Funcionalidades Esperadas

O EasyDesk contempla as seguintes funcionalidades:

* Cadastro e exclusão de grupos de atendimento (função extra)
* Criação de chamados associados a um grupo
* Geração automática de código do chamado (ex.: INF-001)
* Definição de solicitante, responsável, data, criticidade e descrição
* Controle de status do chamado:

  * Pendente;
  * Em Progresso;
  * Pausado;
  * Concluído;
  * Cancelado;
* Avanço do fluxo de atendimento por meio de botões específicos
* Sistema de comentários em ordem cronológica (função extra)
* Busca por código, título, solicitante ou responsável
* Filtros por grupo e status
* Ordenação por data ou criticidade
* Contadores automáticos de caracteres nos campos de texto (função extra)
* Expansão e minimização individual dos chamados (função extra)
* Expansão e minimização global da lista de chamados (função extra)
* Exportação dos chamados de cada grupo em arquivo CSV
* Armazenamento local utilizando LocalStorage

## 5. Restrições de Tecnologia e Escopo

### Restrições Tecnológicas

O projeto foi desenvolvido utilizando apenas tecnologias de front-end:

* HTML5
* CSS3
* JavaScript (ES6)

Não há utilização de frameworks ou bibliotecas externas para interface ou persistência dos dados.

Todos os dados são armazenados localmente no navegador por meio do LocalStorage.

### Restrições de Escopo

Nesta primeira versão do sistema, algumas funcionalidades não fazem parte do escopo, como:

* Sistema de login e autenticação
* Controle de permissões de usuários
* Banco de dados remoto
* Sincronização entre dispositivos
* Histórico detalhado das alterações realizadas nos chamados
* Notificações automáticas
* Upload de arquivos e anexos
* Integração com serviços externos

</details>
&nbsp;

## Lista de Requisitos (Backlog Inicial)

A lista de requisitos, combinada com o Documento de Visão, cria o Plano de Projeto deste desafio.

<details>
    <summary>Descrição(<i>clique para expandir</i>):</summary>
&nbsp;

## 1. Requisitos Funcionais (RF)

| Código   | Requisito Funcional                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| **RF01** | O sistema deve permitir o cadastro de grupos de atendimento.                                                             |
| **RF02** | O sistema deve permitir a exclusão de grupos de atendimento.                                                             |
| **RF03** | O sistema deve impedir o cadastro de grupos com nome ou prefixo duplicados.                                              |
| **RF04** | O sistema deve permitir a criação de chamados vinculados a um grupo.                                                     |
| **RF05** | O sistema deve gerar automaticamente um código único para cada chamado (ex.: INF-001).                                   |
| **RF06** | O sistema deve permitir informar título, solicitante, responsável, data, criticidade e descrição do chamado.             |
| **RF07** | O sistema deve validar o preenchimento dos campos obrigatórios antes da criação do chamado.                              |
| **RF08** | O sistema deve listar todos os chamados cadastrados.                                                                     |
| **RF09** | O sistema deve permitir pesquisar chamados por código, título, solicitante ou responsável.                               |
| **RF10** | O sistema deve permitir filtrar chamados por grupo.                                                                      |
| **RF11** | O sistema deve permitir filtrar chamados pelos estados: Todos, Ativos, Finalizados, Em Progresso, Concluído e Cancelado. |
| **RF12** | O sistema deve permitir ordenar os chamados por mais novos, mais antigos ou criticidade.                                 |
| **RF13** | O sistema deve permitir alterar o status de um chamado para Em Progresso.                                                |
| **RF14** | O sistema deve permitir pausar um chamado em andamento.                                                                  |
| **RF15** | O sistema deve permitir retomar um chamado pausado.                                                                      |
| **RF16** | O sistema deve permitir concluir um chamado.                                                                             |
| **RF17** | O sistema deve permitir cancelar um chamado.                                                                             |
| **RF18** | O sistema deve exibir comentários associados a cada chamado em ordem cronológica.                                        |
| **RF19** | O sistema deve permitir adicionar comentários aos chamados.                                                              |
| **RF20** | O sistema deve manter os comentários salvos junto ao chamado.                                                            |
| **RF21** | O sistema deve exibir a quantidade de chamados abertos por grupo.                                                        |
| **RF22** | O sistema deve contabilizar como chamados abertos os estados Pendente, Em Progresso e Pausado.                           |
| **RF23** | O sistema deve permitir expandir ou recolher individualmente cada chamado.                                               |
| **RF24** | O sistema deve permitir expandir ou recolher todos os chamados simultaneamente.                                          |
| **RF25** | O sistema deve exibir, no modo recolhido, apenas as informações principais do chamado.                                   |
| **RF26** | O sistema deve permitir expandir e recolher descrições longas utilizando o botão "Ver mais".                             |
| **RF27** | O sistema deve exportar os chamados de um grupo para um arquivo CSV.                                                     |
| **RF28** | O sistema deve armazenar grupos e chamados utilizando LocalStorage.                                                      |
| **RF29** | O sistema deve atualizar automaticamente a interface após qualquer alteração realizada nos dados.                        |
| **RF30** | O sistema deve impedir comentários sem nome ou sem texto.                                                                |
| **RF31** | O sistema deve limitar o tamanho dos campos de entrada conforme definido pelo sistema.                                   |
| **RF32** | O sistema deve exibir um contador de caracteres para os campos de texto do formulário de chamados e comentários.         |

## 2. Requisitos Não Funcionais (RNF)

| Código    | Requisito Não Funcional                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| **RNF01** | A interface deve ser responsiva para utilização em computadores, tablets e smartphones.                               |
| **RNF02** | O sistema deve ser desenvolvido utilizando HTML5, CSS3 e JavaScript puro (Vanilla JS).                                |
| **RNF03** | O sistema não deve depender de banco de dados externo para seu funcionamento.                                         |
| **RNF04** | Os dados devem permanecer armazenados localmente utilizando LocalStorage.                                             |
| **RNF05** | A interface deve possuir navegação simples e intuitiva.                                                               |
| **RNF06** | O sistema deve utilizar componentes visuais padronizados para manter consistência na interface.                       |
| **RNF07** | Os formulários devem validar os dados antes de permitir o envio.                                                      |
| **RNF08** | Os campos de entrada devem possuir limite máximo de caracteres.                                                       |
| **RNF09** | O sistema deve exibir contadores de caracteres em tempo real nos campos de texto.                                     |
| **RNF10** | O sistema deve utilizar cores e indicadores visuais para representar criticidade e status dos chamados.               |
| **RNF11** | O sistema deve permitir navegação sem recarregar a página durante as operações.                                       |
| **RNF12** | O sistema deve manter desempenho adequado mesmo com dezenas de chamados cadastrados.                                  |
| **RNF13** | O código-fonte deve ser organizado e modular para facilitar manutenção e evolução.                                    |
| **RNF14** | O layout deve adaptar automaticamente seus componentes para diferentes resoluções de tela.                            |
| **RNF15** | Os arquivos CSV exportados devem ser compatíveis com softwares de planilhas, como Microsoft Excel e LibreOffice Calc. |

</details>
&nbsp;

## Histórias de Usuário e Planejamento do Quadro Kanban

As User Stories(US) ajudam a guiar o desenvolvimento de forma concisa de forma a construir um quadro Kanban que ajude a entender o que é esperado do projeto e as etapas para chegar ao entregável. Por ser uma ferramenta viva ele pode mudar/aumentar conforme o desenvolvimento, as stories iniciais servem para ajudar a guiar o desenvolvedor.

<details>
    <summary>Descrição(<i>clique para expandir</i>):</summary>
&nbsp;

## Histórias de Usuário (User Stories)

### US01 – Cadastro de grupos

**História de Usuário**

Como um administrador, eu quero cadastrar grupos de atendimento, para que os chamados possam ser organizados por departamento.

**Subtarefas**

* Criar formulário de cadastro de grupos
* Validar nome e prefixo
* Impedir grupos duplicados
* Salvar grupo no LocalStorage
* Atualizar a lista de grupos automaticamente

---

### US02 – Exclusão de grupos

**História de Usuário**

Como um administrador, eu quero remover grupos de atendimento, para manter o sistema organizado.

**Subtarefas**

* Criar botão de exclusão
* Atualizar LocalStorage
* Atualizar interface após exclusão

---

### US03 – Cadastro de chamados

**História de Usuário**

Como um usuário, eu quero registrar um chamado, para solicitar atendimento.

**Subtarefas**

* Criar formulário de chamado
* Validar campos obrigatórios
* Associar chamado ao grupo
* Gerar código automático
* Salvar no LocalStorage

---

### US04 – Consulta dos chamados

**História de Usuário**

Como um usuário, eu quero visualizar todos os chamados cadastrados, para acompanhar as solicitações existentes.

**Subtarefas**

* Criar componente de listagem
* Renderizar cards dinamicamente
* Atualizar listagem automaticamente

---

### US05 – Controle do fluxo de atendimento

**História de Usuário**

Como um responsável, eu quero alterar o status dos chamados, para controlar seu andamento.

**Subtarefas**

* Implementar botão "Avançar chamado"
* Implementar estado "Em Progresso"
* Implementar estado "Pausado"
* Implementar retomada do chamado
* Implementar conclusão
* Implementar cancelamento

---

### US06 – Comentários

**História de Usuário**

Como um usuário, eu quero registrar comentários em um chamado, para documentar seu andamento.

**Subtarefas**

* Criar formulário de comentários
* Validar nome e comentário
* Armazenar comentários
* Exibir comentários em ordem cronológica

---

### US07 – Pesquisa

**História de Usuário**

Como um usuário, eu quero pesquisar chamados rapidamente, para localizar uma solicitação específica.

**Subtarefas**

* Criar campo de busca
* Filtrar por código
* Filtrar por título
* solicitante
* responsável

---

### US08 – Filtros

**História de Usuário**

Como um usuário, eu quero filtrar chamados por status e grupo, para visualizar somente as informações relevantes.

**Subtarefas**

* Filtro por grupo
* Filtro por status
* Categoria "Ativos"
* Categoria "Finalizados"

---

### US09 – Ordenação

**História de Usuário**

Como um usuário, eu quero ordenar os chamados, para visualizar primeiro os itens mais importantes.

**Subtarefas**

* Ordenação por data
* Ordenação por criticidade

---

### US10 – Expansão dos chamados

**História de Usuário**

Como um usuário, eu quero expandir apenas o chamado que estou consultando, para reduzir a quantidade de informações exibidas na tela.

**Subtarefas**

* Criar modo recolhido
* Criar expansão por clique
* Ajustar layout resumido

---

### US11 – Expandir/Recolher todos

**História de Usuário**

Como um usuário, eu quero expandir ou recolher todos os chamados simultaneamente, para facilitar a navegação entre muitos registros.

**Subtarefas**

* Criar botão na barra de ferramentas
* Controlar estado global
* Atualizar todos os cards

---

### US12 – Controle da descrição

**História de Usuário**

Como um usuário, eu quero expandir descrições longas somente quando necessário, para manter a interface organizada.

**Subtarefas**

* Limitar altura da descrição
* Criar botão "Ver mais"
* Criar botão "Ver menos"

---

### US13 – Contadores de caracteres

**História de Usuário**

Como um usuário, eu quero visualizar quantos caracteres ainda posso digitar, para evitar ultrapassar os limites permitidos.

**Subtarefas**

* Contador do título
* Contador do nome
* Contador da descrição
* Contador do comentário

---

### US14 – Exportação CSV

**História de Usuário**

Como um administrador, eu quero exportar os chamados de um grupo para um arquivo CSV, para gerar relatórios ou realizar análises externas.

**Subtarefas**

* Gerar arquivo CSV
* Criar botão Exportar
* Baixar arquivo automaticamente

---

### US15 – Estatísticas dos grupos

**História de Usuário**

Como um administrador, eu quero visualizar a quantidade de chamados abertos em cada grupo, para acompanhar sua carga de trabalho.

**Subtarefas**

* Contar chamados
* Considerar chamados pausados
* Atualizar automaticamente

---

### US16 – Persistência dos dados

**História de Usuário**

Como um usuário, eu quero que meus dados permaneçam salvos após fechar o navegador, para não perder informações.

**Subtarefas**

* Salvar grupos
* Salvar chamados
* Restaurar dados ao abrir a aplicação

---

### US17 – Interface Responsiva

**História de Usuário**

Como um usuário, eu quero utilizar o sistema em computadores e dispositivos móveis, para acessar os chamados de qualquer lugar.

**Subtarefas**

* Adaptar toolbar
* Adaptar cards
* Adaptar modais
* Adaptar formulários
* Ajustar navegação em telas pequenas

</details>
&nbsp;


## Registro de Decisões Técnicas

Este documento registra as principais decisões técnicas adotadas durante o desenvolvimento do sistema de gerenciamento de chamados. O objetivo é documentar o motivo das escolhas realizadas, as alternativas consideradas e as referências utilizadas durante o processo de desenvolvimento.

<details>
    <summary>Descrição(<i>clique para expandir</i>):</summary>
&nbsp;

### DT01 – Utilização de HTML, CSS e JavaScript puro

**Decisão**
Desenvolver toda a aplicação utilizando apenas HTML5, CSS3 e JavaScript (Vanilla JS), sem frameworks como React, Vue ou Angular.

**Justificativa**

O objetivo principal do projeto é consolidar os fundamentos do desenvolvimento web e demonstrar domínio da manipulação da DOM, eventos, armazenamento local e organização do código sem depender de bibliotecas externas.

---

### DT02 – Utilização do LocalStorage para persistência

**Decisão**

Armazenar grupos e chamados utilizando o LocalStorage do navegador.

**Justificativa**

O projeto não possui backend nem banco de dados.

O LocalStorage permite:

- persistência dos dados
- simplicidade de implementação
- funcionamento totalmente offline
- nenhuma dependência externa

Para um sistema acadêmico e de pequeno porte, atende completamente aos requisitos.

---

### DT03 – Organização dos dados utilizando Arrays de Objetos

**Decisão**

Representar grupos e chamados através de arrays de objetos JavaScript.

**Justificativa**

Essa estrutura permite:

- fácil serialização para JSON
- armazenamento direto no LocalStorage
- filtros rápidos
- ordenação simples
- manipulação intuitiva

---

### DT04 – Geração automática do código do chamado

**Decisão**

Cada chamado recebe automaticamente um identificador seguindo o padrão:

```

PREFIXO-001

```

Exemplo:

```

SUP-001
FIN-004
RH-012

```

**Justificativa**

Facilita:

- identificação rápida
- busca
- organização por setor
- exportação dos dados

Além disso, evita códigos duplicados.

---

### DT05 – Utilização de Status em fluxo controlado

**Decisão**

O sistema possui um fluxo fixo de estados:

```

Pendente
↓
Em Progresso
↓
Pausado
↓
Em Progresso
↓
Concluído

```

Também é possível cancelar diretamente um chamado em andamento.

**Justificativa**

Esse fluxo representa o ciclo real de atendimento utilizado em centrais de suporte.

Também impede alterações incoerentes de status.

---

### DT06 – Sistema de comentários incorporado ao chamado

**Decisão**

Os comentários ficam armazenados dentro do próprio objeto do chamado.

Exemplo:

```javascript
comentarios: [
    {
        autor,
        texto,
        data
    }
]
```

**Justificativa**

Mantém todas as informações relacionadas ao chamado em um único objeto, simplificando:

- renderização
- exportação
- armazenamento

---

### DT07 – Contadores de caracteres em tempo real

**Decisão**

Todos os campos com limite de caracteres exibem um contador em tempo real.

Exemplo:

```

18 / 64

```

**Justificativa**

Melhora significativamente a experiência do usuário, reduzindo erros de preenchimento.

Foi implementado nos campos:

- título
- solicitante
- descrição
- nome do comentário
- comentário

---

### DT08 – Cards expansíveis

**Decisão**

Os chamados iniciam recolhidos e podem ser expandidos individualmente ou todos de uma vez.

**Justificativa**

Com muitos chamados cadastrados, a interface ficava excessivamente longa.

A solução melhora:

- navegação
- leitura
- organização visual

---

### DT09 – Busca dinâmica

**Decisão**

Implementar busca em tempo real.

A pesquisa considera:

- código
- título
- solicitante
- responsável

**Justificativa**

Permite localizar rapidamente chamados específicos sem necessidade de recarregar a página.

---

### DT10 – Filtros por status

**Decisão**

Implementar filtros rápidos:

- Todos
- Ativos
- Finalizados
- Em Progresso
- Concluído
- Cancelado

**Justificativa**

Facilita o acompanhamento operacional dos chamados.

O agrupamento "Ativos" inclui:

- Pendente
- Em Progresso
- Pausado

---

### DT11 – Exportação em CSV

**Decisão**

Cada grupo possui opção para exportar seus chamados em formato CSV.

**Justificativa**

Permite:

- backup
- compartilhamento
- abertura no Excel
- relatórios

Foi escolhido CSV por ser um formato universal e extremamente simples.

---

### DT12 – Interface Responsiva

**Decisão**

Toda a interface foi construída utilizando Flexbox, Grid Layout e Media Queries.

**Justificativa**

Permite utilização em:

- desktop
- notebook
- tablet
- smartphone

Sem necessidade de desenvolver versões diferentes da aplicação.

---

### DT13 – Limitação de caracteres

**Decisão**

Foram definidos limites máximos para diversos campos.

Exemplo:

| Campo | Limite |
|--------|---------|
| Nome do comentário | 32 |
| Comentário | 4000 |
| Título | 64 |
| Solicitante | 64 |
| Descrição | 4000 |

**Justificativa**

Evita excesso de informações e mantém consistência dos dados.

---

### DT14 – Uso da Inteligência Artificial como ferramenta de apoio

**Decisão**

Utilizar ferramentas de IA como ferramenta de apoio durante o desenvolvimento.

**Justificativa**

A IA foi utilizada para:

- esclarecer conceitos de JavaScript
- sugerir melhorias de interface
- revisar trechos de código
- comparar alternativas de implementação
- auxiliar na documentação do projeto

</details>
&nbsp;

## O projeto

A versão final conta com uma interface com cor branca e botões com tons de azul, a identidade visual usou come inspiração ferramentas empresariais como o Azure Devops. O HTML em si é um card com as informações pessoais ao topo, seguido de botões de links e embaixo, quatro opções de links rápidos com ícones svg.

Já o CSS contém toda a estilização, com definição do que cada bloco de código faz.

O projeto segue todos os requisitos e restrições cobrados:

<details>
    <summary>Descrição(<i>clique para expandir</i>):</summary>
&nbsp;

### Requisitos funcionais

- entrada de dados por meio de um formulário com validação simples, que impeça chamados sem título ou descrição
- identificação única para cada chamado, gerada automaticamente via código, como com Date.now()
- filtros em tempo real, permitindo alternar entre Todos, Pendentes, Em Progresso e Concluídos sem recarregar a tela
- persistência local, garantindo que chamados reapareçam após atualizar a página ou fechar o navegador
- feedback visual, indicando o status de cada chamado com recursos como borda amarela para pendente e verde para concluído

### Requisitos técnicos

- Toda a lógica de criação, filtragem e deleção deve ser feita em JavaScript Vanilla
- A manipulação da interface deve usar métodos como createElement, appendChild ou innerHTML com cautela
- O armazenamento deve utilizar localStorage.setItem e localStorage.getItem com conversão por JSON.stringify e JSON.parse
- Como diferencial, recomenda-se tentar aplicar event delegation, usando um único escutador de eventos no elemento pai da lista para gerenciar cliques em Concluir e Excluir

### Restrições

Não é permitido:
- usar bancos de dados externos como Firebase, Supabase ou MySQL
- utilizar frameworks de UI como React, Vue, Angular ou Svelte
- utilizar frameworks CSS como Bootstrap ou Tailwind
- utilizar bibliotecas de componentes prontos, como calendários ou seletores prontos

</details>
&nbsp;

Além disso foram implementados alguns dos itens opcionais exemplificados no guia do projeto e outros itens além do cobrado.

- Barra de pesquisa em tempo real: Permitir que o usuário filtre os chamados conforme digita o nome do solicitante ou o título do problema.
- Contador de chamados: Criar cards no topo da tela com total de chamados, quantidade de pendentes e quantidade de concluídos no dia.
- Prioridade visual com cores: Além do status, destacar a urgência por meio de ícones, espessura de borda ou outro recurso visual.
- Ordenação por data: Fazer com que os chamados mais recentes apareçam automaticamente no topo.
- Exportação para CSV: Adicionar um botão para baixar a lista de chamados em formato compatível com Excel.
- Criação de grupos: Permite a criação de grupos para melhor controlar os chamados.
- Sistema de comentários simples: Permite a postagem de comentários em cada chamado.
- Expandir e minimizar: Permite minimizar ou expandir cards para uma melhor experiência de uso.


## Como visualizar online

O projeto está hospedado no GitHub Pages:

https://mhsantana.github.io/Easydesk/

## Como executar localmente

### Opção 1 — Abrindo direto no navegador
1. Baixe ou clone este repositório.
```bash
git clone https://github.com/MHsantana/Easydesk.git
```
2. Abra o arquivo `index.html` no navegador.

### Opção 2 — Usando Live Server no VS Code
1. Abra o projeto no VS Code.
2. Instale a extensão **Live Server**, se ainda não tiver.
3. Clique com o botão direito no `index.html`.
4. Selecione **Open with Live Server**.