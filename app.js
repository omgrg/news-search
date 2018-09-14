import express from 'express';
import bodyParser from 'body-parser';
import router from './app/routes/index';
import searchRouter from './app/routes/search';
import exphbs from 'express-handlebars';
import path from 'path';
import Pagination from './app/helpers/HandleBar/Pagination';

const app = express();
const pagination = new Pagination();
let viewsPath = path.join(__dirname, '/app/views');
let hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir : viewsPath + "/layouts/",
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; },
        pagination : pagination.paginate
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', viewsPath);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(router);
app.use(searchRouter);


app.listen(3000, function () {
    console.log('Server is running in port 3000');
    console.log('localhost:3000');
});