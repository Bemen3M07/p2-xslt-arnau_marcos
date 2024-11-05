<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Book Catalog</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            </head>
            <body>
                <div class="container my-5">
                    <h1 class="text-center">Book Catalog</h1>
                    <div class="row">
                        <!-- Process each book in the catalog -->
                        <xsl:for-each select="catalog/book">
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            <xsl:value-of select="title"/>
                                        </h5>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            <xsl:value-of select="author"/>
                                        </h6>
                                        <p class="card-text">
                                            <strong>Genre:</strong> <xsl:value-of select="genre"/><br/>
                                            <strong>Price:</strong> $<xsl:value-of select="price"/><br/>
                                            <strong>Publish Date:</strong> <xsl:value-of select="publish_date"/>
                                        </p>
                                        <p class="card-text">
                                            <xsl:value-of select="description"/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </xsl:for-each>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
