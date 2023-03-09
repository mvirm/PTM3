const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

let id = 0; 

server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;
    if(author&&title&&contents) {
        id++
        const publicacion = {
            author,
            title,
            contents,
            id : id
        }; 
        publications.push(publicacion);
            res.status(200).json(publicacion);
    } else {
        res.status(400).json({error: "No se recibieron los parámetros necesarios para crear la publicación"});
    }
});

server.get('/posts', (req, res) => {
    const { author, title } = req.query;
    if(author && title) {
        const posteos = publications.filter(posteo => {posteo.author === author && posteo.title === title});
        if(posteos.length) {
            return res.status(200).json(posteos)
        } else {
        return res.status(400).json({error: "No existe ninguna publicación con dicho título y autor indicado"});
        };
    };
});

server.get('/posts/:author', (req, res) => {
    const {author} = req.params;
    if(author) {
        const posteos = publications.filter(posteo => posteo.author === author);
        if(posteos.length) {
            return res.status(200).json(posteos)
        } else {
        return res.status(400).json({error: "No existe ninguna publicación del autor indicado"});
        };
    };
 });

 server.put('/posts/:id', (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;

    if(title&&contents&&id) {
       let postId = publications.find(post => post.id === Number(id));
        if(!postId) {
            res.status(400).json({error: "No se recibió el id correcto necesario para modificar la publicación"})
        } else {
            postId = {...postId,
                    title,
                    contents
                    };
            res.status(200).json(postId)
        };    
    } else{
        return res.status(400).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"});
    }; 
 });

 server.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({error: "No se recibió el id de la publicación a eliminar"});
    } else {
        let filtered = publications.filter(post => post.id !== Number(id));
        if(publications.length === filtered.length) {
            res.status(404).json( {error: "No se recibió el id correcto necesario para eliminar la publicación"})
        } else {
            publications = filtered;
            res.status(200).json({ success: true })
        }
    };
 });

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
