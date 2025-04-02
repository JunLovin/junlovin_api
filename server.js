const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https')
const http = require('http')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/banners', (req, res) => {
    fs.readdir(path.join(__dirname, 'public', 'banners'), (err, banners) => {
        if (err) {
            const error = new Error('Error al obtener los banners')
            error.status = 500
            return next(error)
        }
        const bannersConId = banners.map(banner => ({
            id: banner,
            url: `/banners/${banner}`
        }))
        return res.json(bannersConId)
    })
})

app.delete('/api/banners/:id', (req, res) => {
    const bannerId = req.params.id
    const rutaBanner = path.join(__dirname, 'public', 'banners', bannerId)

    fs.access(rutaBanner, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Banner no encontrado' })
        }

        fs.unlink(rutaBanner, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el banner' })
            }

            return res.json({ success: true, message: 'Banner eliminado correctamente.' })
        })
    })
})

app.get('/api/agregarbanner', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addBanner.html'))
})

app.get('/api/:usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'banners.html'))
})

app.post('/api/agregar', (req, res) => {
    const { imagenUrl } = req.body

    if (!imagenUrl) {
        return res.status(400).json({ error: 'La URL de la imagen es requerida' })
    }

    const extension = path.extname(imagenUrl.split('?')[0]) || '.jpg'
    const nombreArchivo = `banner-${uuidv4()}${extension}`
    const rutaDestino = path.join(__dirname, 'public', 'banners', nombreArchivo)

    const archivoStream = fs.createWriteStream(rutaDestino)

    const request = imagenUrl.startsWith('https') ? https : http

    request.get(imagenUrl, (response) => {
        if (response.statusCode !== 200) {
            return res.status(500).json({ error: 'Error al descargar la imagen' })
        }

        response.pipe(archivoStream)

        archivoStream.on('finish', () => {
            archivoStream.close()
            return res.status(201).json({
                success: true,
                message: 'Banner agregado correctamente',
                bannerUrl: `/banners/${nombreArchivo}`
            })
        })
    }).on('error', (error) => {
        fs.unlink(rutaDestino, () => {})
        return res.status(500).json({ error: 'Error al descargar la imagen' })
    })

})

app.listen(PORT, () => {
    console.log(`El servidor se inició en el puerto ${PORT}`)
})