from flask import Flask, request, jsonify
from flask_cors import CORS
import xml.etree.ElementTree as ET
import os

# Inicialitzem una aplicació Flask
app = Flask(__name__)
# Permetem peticions d'altres dominis (per exemple, si la interfície està en un altre servidor)
CORS(app)

def prettify_xml(elem):
    """Posa l'XML en un format bonic amb ordre i sense línies en blanc sobrants."""
    from xml.dom import minidom
    # Converteix l'element XML a una cadena de text
    rough_string = ET.tostring(elem, 'utf-8')
    # Torna a analitzar l'XML per fer-lo bonic
    reparsed = minidom.parseString(rough_string)
    # Converteix-lo a text amb ordre
    pretty_xml = reparsed.toprettyxml(indent="  ")
    # Treu les línies en blanc que no calen i torna l'XML com a text
    return "\n".join([line for line in pretty_xml.splitlines() if line.strip()])

# Endpoint per afegir dades d'un llibre
@app.route('/submit_book_data', methods=['POST'])
def submit_book_data():
    try:
        # Agafem les dades que arriben com a JSON del client
        data = request.json
        author = data.get('author')
        title = data.get('title')
        genre = data.get('genre')
        price = data.get('price')
        publish_date = data.get('publish_date')
        description = data.get('description')

        # Ruta on es guarda l'arxiu XML
        xml_file_path = 'resources/xml/books.xml'
        
        # Comprovem si l'arxiu XML ja existeix o està buit
        if not os.path.exists(xml_file_path) or os.path.getsize(xml_file_path) == 0:
            # Si no existeix o està buit, en creem un de nou amb l'arrel <catalog>
            root = ET.Element("catalog")
            tree = ET.ElementTree(root)
            tree.write(xml_file_path, encoding='utf-8', xml_declaration=True)

        # Carrega l'arxiu XML que ja tenim o el nou que hem creat
        tree = ET.parse(xml_file_path)
        root = tree.getroot()

        # Crea un nou element <book> amb subelements per a cada atribut del llibre
        new_book = ET.Element('book')
        ET.SubElement(new_book, 'author').text = author           # Autor del llibre
        ET.SubElement(new_book, 'title').text = title             # Títol del llibre
        ET.SubElement(new_book, 'genre').text = genre             # Gènere del llibre
        ET.SubElement(new_book, 'price').text = price             # Preu del llibre
        ET.SubElement(new_book, 'publish_date').text = publish_date # Data de publicació
        ET.SubElement(new_book, 'description').text = description # Descripció

        # Afegeix el nou llibre al document XML
        root.append(new_book)

        # Guarda l'arxiu XML en format bonic (indentat) sense línies buides extra
        xml_string = prettify_xml(root)
        with open(xml_file_path, "w", encoding='utf-8') as f:
            f.write(xml_string)

        # Retorna un missatge en JSON per confirmar que el llibre s'ha afegit correctament
        return jsonify({"message": "Llibre afegit amb èxit."}), 200
    except Exception as e:
        # Si passa alguna cosa, torna un missatge d'error amb el detall del problema
        return jsonify({"error": str(e)}), 500

# Executa l'aplicació Flask en mode de depuració
if __name__ == '__main__':
    app.run(debug=True)
