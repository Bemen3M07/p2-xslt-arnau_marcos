# Importa las librerías necesarias
from flask import Flask, request, redirect, url_for
import xml.etree.ElementTree as ET

# Inicia la aplicación Flask
app = Flask(__name__)

# Define la ruta '/submit_book_data' que recibirá los datos del formulario al hacer una solicitud POST
@app.route('/submit_book_data', methods=['POST'])
def submit_book_data():
    # Recibe los datos enviados desde el formulario usando request.form.get
    author = request.form.get('author')        # Captura el autor del libro
    title = request.form.get('title')          # Captura el título del libro
    genre = request.form.get('genre')          # Captura el género del libro
    price = request.form.get('price')          # Captura el precio del libro
    publish_date = request.form.get('publish_date')  # Captura la fecha de publicación del libro
    description = request.form.get('description')    # Captura la descripción del libro

    try:
        # Lee el archivo XML existente ('resources/xml/books.xml') donde se guardan los libros
        # Asegúrate de que la ruta coincida con la ubicación real de tu archivo
        tree = ET.parse('resources/xml/books.xml')
        root = tree.getroot()  # Obtiene el elemento raíz del XML para poder agregar nuevos elementos

        # Crea un nuevo elemento 'book' y añade subelementos para cada campo del libro
        new_book = ET.Element('book')
        ET.SubElement(new_book, 'author').text = author          # Subelemento 'author'
        ET.SubElement(new_book, 'title').text = title            # Subelemento 'title'
        ET.SubElement(new_book, 'genre').text = genre            # Subelemento 'genre'
        ET.SubElement(new_book, 'price').text = price            # Subelemento 'price'
        ET.SubElement(new_book, 'publish_date').text = publish_date  # Subelemento 'publish_date'
        ET.SubElement(new_book, 'description').text = description    # Subelemento 'description'

        # Añade el nuevo elemento 'book' al XML y guarda los cambios
        root.append(new_book)
        tree.write('resources/xml/books.xml', encoding='utf-8', xml_declaration=True)

        # Redirige al usuario a la página de éxito una vez que el libro se ha agregado
        return redirect(url_for('success'))
    except Exception as e:
        # Si ocurre algún error, muestra el mensaje de error
        return f"Error al actualizar el archivo XML: {e}"

# Define la ruta '/success' para mostrar un mensaje de confirmación después de agregar el libro
@app.route('/success')
def success():
    return "Libro agregado exitosamente al archivo XML."

# Ejecuta la aplicación Flask en modo de depuración para facilitar el desarrollo
if __name__ == '__main__':
    app.run(debug=True)
