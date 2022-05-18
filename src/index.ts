import express, {NextFunction, Request, Response} from 'express';
import cookieParser from 'cookie-parser'
import upload from 'express-fileupload'
import fs from 'fs'
import cors from 'cors'
import expression from 'express-session'
import path from 'path';

const cookies = {
    cookieSecret: 'password'
}

const app = express();
app.use(upload({
    limits: {fileSize: 50 * 1024 * 1024},
}));
app.use(cors());
app.use(cookieParser(cookies.cookieSecret))
app.use(expression({
    secret: 'password',
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 1000 * 60
    }
}))
app.use(express.json());
const __dirname = path.resolve();
const port = process.env.PORT || 8080;
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

const products = ['apple', 'orange'];
let user = [
    {id: 1, name: 'vlas'},
    {id: 2, name: 'vlad'},
    {id: 3, name: 'diana'},
];
let visits = 0

app.post('/upload', async (req, res, next) => {
    console.log(req.files)
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '\\src\\' + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    // @ts-ignore

    await sampleFile.mv(uploadPath, function (err: any) {
        if (err)
            return res.status(500).send(err);
        res.send(uploadPath)
        // @ts-ignore

        // fs.readFile(uploadPath, (err, data) => {
        //     if (err) {
        //         throw err;
        //     } else {
        //         console.log('Content of file is:  ' + data);
        //     }
        // });
    })
})


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 0
    res.send('Visits' + req.session.numberOfVisits)
    // if (req.cookies.visit) visits = req.cookies.visit
    // else visits = 0
    // visits++
    // res.cookie('visit', visits, {path: '/', secure: true, httpOnly: true})
    // res.cookie('secret', 'something', {signed: true})
    // console.log(req.signedCookies.secret)
    // console.log(req.cookies.secret)
    // res.send(`TypeScript Visit ${visits}`);
});
// app.post('/products', (req, res, next) => {
//     // if (req.body.email === 'yandex') res.redirect(303,'https://yandex.com/')
//     res.json({...req.body});
// });
app.get('/users', (req, res) => {
    res.cookie('t', 't', {path: '/users'})
    res.json(user);
});
app.put('/users/:id', (req, res) => {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === +req.params.id) {
            user[i].name = req.body.name;
        }
    }
    res.json(user);
});
app.post('/users', (req: Request, res: Response) => {
    if (req.body.name) {
        user.push({...req.body, id: user.length + 1})
        res.json(user)
    } else {
        console.log('badrequest')
        res.download('')
        res.status(400).json({Error: 'BadRequest'})
    }
})
app.delete('/users/:id', (req, res) => {
    user = user.filter(item => item.id !== +req.params.id)
    res.json(user)
})
app.get('/products', (req: Request<any, any, any, { count: string }>, res) => {
    if (products[+req.query.count]) res.json(products[+req.query.count]);
    else res.status(404).json({Error: 'NotFoundSorryBro'});
});
app.use((req: Request, res: Response, next: NextFunction) => {
    res.type('json').status(404).json({error: 'Not Found'});
});
app.use((req: Request, res: Response, next: NextFunction) => {
    res.type('json').status(500).json({error: 'Server Error'});
});
app.listen(port, () => {
    console.log('Server Started');
});
