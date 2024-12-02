const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa cors
const jwt = require('jsonwebtoken'); 
const app = express();
const authMiddleware = require('./middlewares/authMiddleware'); // Importa el middleware



// Servir archivos estáticos desde la carpeta 'img' en la raíz del proyecto
app.use('/img', express.static(path.join(__dirname, 'img')));

// Habilitar CORS
app.use(cors());

app.use(express.json());

// Rutas
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const productsCommentsRoutes = require('./routes/productsComments');
const cartsRoutes = require('./routes/carts');


app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes); // Registra las rutas de categorías
app.use('/products_comments', productsCommentsRoutes);
app.use('/cart', cartsRoutes);


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Clave secreta para JWT (en producción usar variable de entorno)
const JWT_SECRET = 'claveSecretaParaEstudiantes123';

// Usuario de prueba (en producción usar base de datos)
const USER = {
    username: 'estudiante',
    password: '123456'
};

// Tiempo de expiración del token (30 segundos para demostración)
const TOKEN_EXPIRATION = '30s';

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    // Obtener el header de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = user;
        next();
    });
};

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar credenciales
    if (username !== "" && password !== "") {
        // Crear token
        const token = jwt.sign(
            { username: username },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRATION }
        );

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});
