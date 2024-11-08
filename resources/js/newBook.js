// Afegeix un listener d'esdeveniments al formulari amb l'ID 'bookForm' per capturar l'enviament
document.getElementById('bookForm').addEventListener('submit', function(event) {
    // Evita el comportament per defecte d'enviar el formulari i recarregar la pàgina
    event.preventDefault();
    console.log("Formulari enviat, preparant-se per enviar dades a Flask...");

    // Recull les dades del formulari en un objecte FormData per facilitar la seva manipulació
    const formData = new FormData(this);
    // Crea un objecte de dades estructurat per enviar al servidor
    const data = {
        author: formData.get('author'),           // Obté el nom de l'autor del camp 'author'
        title: formData.get('title'),             // Obté el títol del llibre del camp 'title'
        genre: formData.get('genre'),             // Obté el gènere del llibre del camp 'genre'
        price: formData.get('price'),             // Obté el preu del llibre del camp 'price'
        publish_date: formData.get('publish_date'), // Obté la data de publicació del camp 'publish_date'
        description: formData.get('description')  // Obté la descripció del llibre del camp 'description'
    };

    // Envia les dades del llibre a l'API Flask a l'URL especificat
    fetch('http://127.0.0.1:5000/submit_book_data', {
        method: 'POST', // Defineix la sol·licitud com una sol·licitud POST
        headers: {
            'Content-Type': 'application/json' // Especifica que les dades s'enviaran en format JSON
        },
        body: JSON.stringify(data) // Converteix l'objecte de dades en una cadena JSON per enviar-lo
    })
    .then(response => {
        // Verifica si la resposta és correcta (status 200-299). Si no, llença un error
        if (!response.ok) {
            // Si hi ha un error, obté el text de la resposta per mostrar més detalls
            return response.text().then(text => { throw new Error(text) });
        }
        // Converteix la resposta en JSON si és correcte
        return response.json();
    })
    .then(responseData => {
        // Mostra un missatge d'èxit a l'usuari amb la resposta del servidor
        alert(responseData.message || "Llibre afegit amb èxit.");
        // Recàrrega la pàgina per actualitzar la llista de llibres o l'estat del formulari
        window.location.reload();
    })
    .catch(error => {
        // Registra qualsevol error en la consola per ajudar amb el diagnòstic
        console.error('Error:', error);
        // Mostra un missatge d'error a l'usuari amb informació de l'error
        alert("Error en enviar les dades: " + error.message);
    });
});
