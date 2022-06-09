const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/nichargebackfrontend'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/nichargebackfrontend/index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

