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
