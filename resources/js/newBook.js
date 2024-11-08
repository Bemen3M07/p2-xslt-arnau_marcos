document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('bookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Formulario enviado, preparando para enviar datos a Flask...");

        const formData = new FormData(this);
        const data = {
            author: formData.get('author'),
            title: formData.get('title'),
            genre: formData.get('genre'),
            price: formData.get('price'),
            publish_date: formData.get('publish_date'),
            description: formData.get('description')
        };

        fetch('http://127.0.0.1:5000/submit_book_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            alert(responseData.message || "Libro agregado exitosamente.");
        })
        .catch(error => console.error('Error:', error));
    });
});
