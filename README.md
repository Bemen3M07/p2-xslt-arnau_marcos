
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/G9fQk55K)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16836902&assignment_repo_type=AssignmentRepo)

# Projecte: Desenvolupament d'interfícies.
### Marcos Mateo i Arnau Azogue
## Pràctica 2: Confecció d'interfícies d'usuari

Aquest projecte permet afegir i consultar llibres utilitzant una interfície web. Els llibres s'emmagatzemen en un fitxer XML i es gestionen mitjançant un servidor Flask. El client es serveix al port 8000 i l'API de Flask al port 5000.

## Requisits

- **Python 3.x**: Assegura't de tenir Python 3 instal·lat a la teva màquina. Pots verificar la versió de Python executant:
  
  ```bash
  python --version
  ```

- **Instal·lar dependències**: Aquest projecte requereix les biblioteques `Flask` i `Flask-CORS`. Instal·la-les executant la següent comanda a la terminal:

  ```bash
  pip install flask flask-cors
  ```

## Estructura del Projecte

- **pages/**: Conté `newBook.html`, la pàgina amb el formulari per afegir nous llibres.
- **resources/**:
  - **css/**: Inclou els fitxers d'estils CSS (ex: `styles.css`).
  - **js/**: Inclou els fitxers JavaScript (`newBook.js` i `script.js`) per gestionar la interacció amb el formulari i la interfície.
  - **xml/**: Conté `books.xml`, on s'emmagatzemen els llibres.
  - **xslt/**: Inclou `books.xslt` per a la transformació XSLT si és necessari.
- **app.py**: Servidor Flask per gestionar les dades dels llibres en XML.
- **index.html**: Pàgina principal de la interfície web.


## Passos per Executar el Projecte

### 1. Iniciar el Servidor Flask (API al port 5000)

A la carpeta arrel del projecte, obre una terminal i executa la següent comanda per iniciar el servidor Flask:

### Terminal 1: 
```bash
python app.py
```

Això iniciarà el servidor Flask a `http://127.0.0.1:5000`. Aquest servidor s'encarregarà de processar les sol·licituds per afegir llibres al fitxer XML.

### 2. Iniciar el Servidor d'Arxius per a la Interfície (Client al port 8000)

En una altra terminal, executa la següent comanda per iniciar un servidor HTTP simple al port 8000:

### Terminal 2: 
```bash
python -m http.server 8000
```

Això servirà la interfície web a `http://127.0.0.1:8000`.

### 3. Accedir a l'Aplicació

1. Obre un navegador i ves a `http://127.0.0.1:8000`.
2. A la pàgina principal, pots veure dues opcions:
   - **Consultar Llibres**: Mostra la llista de llibres emmagatzemats al fitxer XML.
   - **Nou Llibre**: Obre el formulari per afegir un nou llibre.

3. Completa el formulari del "Nou Llibre" i fes clic a "Carregar" per afegir un llibre. La pàgina mostrarà un popup després d'afegir el llibre correctament.

### Notes

- Assegura't que ambdós servidors (Flask al port 5000 i el servidor HTTP al port 8000) estiguin funcionant al mateix temps.
- Flask gestiona la lògica del backend i les operacions de manipulació del fitxer XML, mentre que el servidor HTTP simple al port 8000 serveix la interfície web.
- Cada cop que s'afegeix un nou llibre, aquest es formatarà i s'emmagatzemarà a `resources/xml/books.xml`.

## Errors Comuns

- **Error CORS**: Si veus un error relacionat amb CORS, assegura't que `Flask-CORS` estigui instal·lat i configurat a `app.py`.
- **500 Internal Server Error**: Aquest error generalment es deu a un problema amb el fitxer XML. Verifica que `resources/xml/books.xml` tingui una estructura XML vàlida.

## Crèdits

Projecte desenvolupat per a la pràctica de Desenvolupament d’interfícies - Pràctica 2: Confecció d’interfícies d’usuari
