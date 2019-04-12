const app = require('./api/server');

const port = process.env.PORT || 6500;

app.listen(port, console.log(`Server running on port ${port}`));