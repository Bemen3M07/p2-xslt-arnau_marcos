<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="/"> <!-- Aplicarem un template a la totalitat del document -->
    <div class="container my-5">
        <div class="row">
            <xsl:for-each select="catalog/book"> <!-- Per cada llibre que hi ha al document xml -->
                <div class="col-md-4 mb-4"> <!-- Crearem un div amb les propietats de boostrap -->
                    <div class="card"> <!-- Crearem una nova "card" dins el div -->
                        <div class="card-body">
                            <h5 class="card-title"> <!-- Establim el titol de la card -->
                                <xsl:value-of select="title"/> <!-- Seleccionem el titol amb el "value-of" -->
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted"> <!-- Establim el subtitol de la card -->
                                <xsl:value-of select="author"/> <!-- Seleccionem el autor amb el "value-of" -->
                            </h6>
                            <p class="card-text"> <!-- Crearem un paragraf per les dades principals -->
                                <strong>Genere: </strong><xsl:value-of select="genre"/><br/> <!-- Seleccionem el genere amb el "value-of" -->
                                <strong>Preu: </strong><xsl:value-of select="price"/> €<br/> <!-- Seleccionem el preu amb el "value-of" -->
                                <strong>Data de Publicació: </strong><xsl:value-of select="publish_date"/> <!-- Seleccionem la data de publicació amb el "value-of" -->
                            </p>
                            <p class="card-text"> <!-- Crearem un paragraf per la descripcio de la card -->
                                <xsl:value-of select="description"/> <!-- Seleccionem la descripcio amb el "value-of" -->
                            </p>
                        </div>
                    </div>
                </div>
            </xsl:for-each>
        </div>
    </div>
    </xsl:template>
</xsl:stylesheet>
