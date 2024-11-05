function loadSection(sectionFile) {
    const mainContent = document.getElementById('main-content');

    fetch(sectionFile)
        .then(response => response.text())
        .then(data => {
            mainContent.innerHTML = data;
        })
        .catch(error => {
            mainContent.innerHTML = "<p>Error carregant la secció.</p>";
            console.error('Error carregant el fitxer:', error);
        });
}

function loadSectionWithXSLT(xmlUrl, xsltUrl) {
    // Cargar el XML y el XSLT
    Promise.all([fetch(xmlUrl), fetch(xsltUrl)])
        .then(responses => {
            // Verificar que ambas respuestas son exitosas
            if (!responses[0].ok || !responses[1].ok) {
                throw new Error('Error al cargar el XML o el XSLT.');
            }
            return Promise.all([responses[0].text(), responses[1].text()]);
        })
        .then(data => {
            const [xmlData, xsltData] = data;
            
            // Crear un parser para XML y XSLT
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlData, "text/xml");
            const xslt = parser.parseFromString(xsltData, "text/xml");

            // Procesar el XML con el XSLT
            if (window.XSLTProcessor) {
                const processor = new XSLTProcessor();
                processor.importStylesheet(xslt);
                
                const resultDocument = processor.transformToFragment(xml, document);

                // Insertar el HTML generado en el elemento main-content
                document.getElementById("main-content").innerHTML = "";
                document.getElementById("main-content").appendChild(resultDocument);
            } else {
                document.getElementById("main-content").innerHTML = "<p>El navegador no soporta XSLTProcessor.</p>";
            }
        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = "<p>Error al cargar el contenido.</p>";
            console.error('Error:', error);
        });
}

