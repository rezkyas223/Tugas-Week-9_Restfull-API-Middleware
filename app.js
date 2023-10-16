const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerconfig'); 

const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
