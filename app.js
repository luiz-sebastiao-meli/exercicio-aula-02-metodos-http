const express = require('express')
let products = require('./products')

const app = express()

app.use(express.json())

app.post('/products', (req, res) => {
    const newProducts = req.body
    products = [...products, ...newProducts]
    return res.status(201).send(products)
})

app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedProduct = req.body

    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }

    products = products.map(product => product.id === id ? updatedProduct : product)
    return res.send(products)
})

app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id)

    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }

    products = products.filter(product => product.id !== id)
    return res.send(products)
})

app.get('/products', (_req, res) => res.send(products))

app.listen(3000, () => console.log('Servidor em execução'))