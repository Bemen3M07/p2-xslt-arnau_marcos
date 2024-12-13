// Funció per carregar una secció HTML dins de l'element amb ID 'main-content'
function loadSection(sectionFile) {
    const mainContent = document.getElementById('main-content'); // Element on es carregarà el contingut

    // Realitza una sol·licitud per obtenir el fitxer HTML de la secció
    fetch(sectionFile)
        .then(response => response.text()) // Converteix la resposta en text
        .then(data => {
            mainContent.innerHTML = data; // Inserta el contingut HTML en l'element principal

            // Carrega el script newBook.js només si s'ha carregat newBook.html
            if (sectionFile.includes('newBook.html')) {
                loadNewBookScript(); // Funció per carregar dinàmicament el script
            }
        })
        .catch(error => {
            // Mostra un missatge d'error si no es pot carregar la secció
            mainContent.innerHTML = "<p>Error carregant la secció.</p>";
            console.error('Error carregant el fitxer:', error);
        });
}

// Funció per carregar dinàmicament el script newBook.js
function loadNewBookScript() {
    // Crea un element <script> per afegir-lo al DOM quan sigui necessari
    const script = document.createElement('script');
    script.src = '/resources/js/newBook.js'; // Especifica la ruta del fitxer JavaScript
    document.body.appendChild(script); // Afegeix el script al cos del document
}

// Funció per carregar contingut XML i XSLT i aplicar l'estil XSLT al contingut XML
function loadSectionWithXSLT(xmlUrl, xsltUrl) {
    // Carrega el fitxer XML i el fitxer XSLT amb una promesa per obtenir-los simultàniament
    Promise.all([fetch(xmlUrl, {cache:"no-store"}), fetch(xsltUrl)])
        .then(responses => {
            // Verifica que les dues respostes siguin correctes (status 200-299) success
            if (!responses[0].ok || !responses[1].ok) {
                throw new Error('Error al carregar el XML o el XSLT.');
            }
            return Promise.all([responses[0].text(), responses[1].text()]); // Obté el text de les respostes
        })
        .then(data => {
            const [xmlData, xsltData] = data; // Guarda el contingut XML i XSLT

            // Crea un analitzador per processar el contingut XML i XSLT
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlData, "text/xml"); // Analitza el contingut XML
            const xslt = parser.parseFromString(xsltData, "text/xml"); // Analitza el contingut XSLT

            // Aplica l'estil XSLT al contingut XML per generar HTML
            if (window.XSLTProcessor) {
                const processor = new XSLTProcessor();
                processor.importStylesheet(xslt); // Importa l'estil del fitxer XSLT
                
                const resultDocument = processor.transformToFragment(xml, document); // Transforma XML a HTML

                // Insereix el contingut generat dins de l'element amb ID 'main-content'
                document.getElementById("main-content").innerHTML = "";
                document.getElementById("main-content").appendChild(resultDocument);
            } else {
                // Missatge d'error si el navegador no suporta XSLTProcessor
                document.getElementById("main-content").innerHTML = "<p>El navegador no suporta XSLTProcessor.</p>";
            }
        })
        .catch(error => {
            // Mostra un missatge d'error si no es pot carregar el contingut
            document.getElementById("main-content").innerHTML = "<p>Error al carregar el contingut.</p>";
            console.error('Error:', error);
        });
}
