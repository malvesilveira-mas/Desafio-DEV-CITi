**Antes de rodar a aplicação faça os passos seguintes:**



Plataforma de Avaliação - Jogo de Voronoi (Grafos)



Aplicação web local em Streamlit para simulação, cronometragem e classificação de estratégias do Jogo de Voronoi em grafos. 



**#Pré-requisitos**

\- Python instalado no sistema (a opção "Add Python to PATH" deve estar marcada na instalação).

**#Criando Pasta .venv**
 abra o terminal na pasta que contém os arquivos da aplicação e digite:
 1. python -m venv .venv
 no windows:
 2. .venv\Scripts\activate
 no linux:
 2. source .venv/bin/activate
 3. pip install -r requirements.txt

**#Instalação**



1. abra o terminal (PowerShell ou CMD) dentro da pasta da aplicação e execute os comandos abaixo. Escolha o método correspondente à ferramenta que está a utilizar.



**MÉTODO A: Instalação Padrão (Python Nativo)**



1. cd "MAT DISCRETA"

2. python -m venv .venv

3. .\\.venv\\Scripts\\pip install -r requirements.txt

4. .\\.venv\\Scripts\\streamlit run app.py



**MÉTODO B: Instalação com uv (Gestor de Pacotes de Alta Velocidade)**



1. cd "MAT DISCRETA"

2. uv pip install -r requirements.txt

3. uv run streamlit run app.py



(Nota: Na primeira execução, o Streamlit pode solicitar um e-mail no terminal. Pressione a tecla Enter para deixar em branco e continuar).

**Como rodar**

1. .\.venv\Scripts\streamlit.exe run app.py

**Utilização da Interface**

Aceda ao endereço gerado no terminal (exemplo: http://localhost:8501).



Utilize o painel de upload para inserir o ficheiro aluno.py contendo a função de estratégia a ser avaliada.



A execução é iniciada automaticamente. O código enfrenta uma bateria de 4 rodadas geradas dinamicamente (12 a 24 vértices, 50% regulares e 50% irregulares com hotspots de pontuação).



Inspeção Temporal: Utilize o controlo deslizante (1 a 6) para manipular os turnos. A interface atualizará simultaneamente as cores de domínio no grafo renderizado e o cálculo de distância, saldo parcial e Delta na matriz de dados.



Depuração Baseada em Falhas: Se a estratégia obtiver nota baixa ou cometer infrações de tempo, utilize o botão de exportação (JSON/CSV) para extrair os dados e o grafo exclusivamente das partidas resultantes em derrota.

