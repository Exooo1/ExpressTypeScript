// import express, {NextFunction, Request, Response} from 'express';
// import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'
// import upload from 'express-fileupload'
// import {sessionConfig} from './appConfig'
// import nodemailer from 'nodemailer'
// import cors from 'cors'
// import expression from 'express-session'
// import path from 'path';
// // @ts-ignore
// import morgan from 'morgan'
// import * as fs from 'fs';
//
// dotenv.config()
// const app = express();
// app.use(express.json());
// const __dirname = path.resolve();
// morgan.token('host', (req: Request, res: Response) => req.hostname)
// morgan.token('params', (req: Request, res: Response) => JSON.stringify(req.params))
// morgan.token('body', (req: Request, res: Response) => JSON.stringify(req.body))
// app.use(morgan(':[:date[web]] :method :url :status :res[content-length] - :response-time ms :host :body :params', {stream: fs.createWriteStream(path.join(__dirname, 'src/access.log'), {flags: 'a'})}))
// app.use(express.urlencoded({extended: true}))
// const port = process.env.PORT || 3000;
// app.disable('x-powered-by');
// app.use(express.static(__dirname + '/public'));
// app.use(upload({
//     limits: {fileSize: 50 * 1024 * 1024},
// }));
// app.use(cors());
// app.use(cookieParser(sessionConfig.secret))
// app.use(expression(sessionConfig))
//
// const products = ['apple', 'orange'];
// let user = [
//     {id: 1, name: 'vlas'},
//     {id: 2, name: 'vlad'},
//     {id: 3, name: 'diana'},
// ];
//
//
// app.use((req: Request, res, next) => {
//     if (!req.session.numberOfVisits) {
//         req.session.numberOfVisits = 0
//         next()
//     } else next()
// })
// app.get('/cluster/:id', (req, res) => {
//     let result = 0;
//     let n = +req.params.id
//     if (n > 5000000000) n = 5000000000;
//     for (let i = 0; i <= n; i++) {
//         result += i;
//     }
//     res.send(`count ${result}`)
// })
//
// // app.get('/about', (req: Request, res: Response) => {
// //     res.cookie('mvp', result(), {path: '/about'})
// //     res.send(`MVP ${req.cookies.mvp}`)
// // })
// //
// // app.post('/emails', (req, res, next) => {
// //     const {message, from} = req.body
// //     const transporter = nodemailer.createTransport({
// //         service: 'Gmail',
// //         auth: {
// //             user: process.env.USER,
// //             pass: process.env.PASS,
// //
// //         },
// //     });
// //
// //     const mailOptions = {
// //         from: `${from}<maskalenchik@gmail.com>`,
// //         to: 'vlasmaskalenchik1998@gmail.com',
// //         subject: 'SimpleTextExpress',
// //         text: message,
// //         html: `<div><h1><a style="color:red; background: black" href=\'https://alfilip.github.io/cards/#/set-new-password/$token$\'>change password</h1>
// // <img alt="photo" src='https://catethysis.ru/wp-content/uploads/2013/09/nodejslogo.png'/>
// // </div>`
// //     };
// //     const sendMail = async (mailOptions: any) => {
// //         const resultPromise = new Promise((resolve, reject) => {
// //             transporter.sendMail(mailOptions, (error, info) => {
// //                 if (error) {
// //                     reject(error);
// //                 } else {
// //                     resolve(info);
// //                 }
// //             });
// //         })
// //         const info = await resultPromise
// //         console.log(info)
// //     }
// //     sendMail(mailOptions)
// //     res.send('All ok')
// // })
// //
// // app.post('/upload', async (req, res, next) => {
// //     console.log(req.files)
// //     let sampleFile;
// //     let uploadPath;
// //
// //     if (!req.files || Object.keys(req.files).length === 0) {
// //         return res.status(400).send('No files were uploaded.');
// //     }
// //
// //     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
// //     sampleFile = req.files.file;
// //     uploadPath = __dirname + '\\src\\' + sampleFile.name;
// //     // Use the mv() method to place the file somewhere on your server
// //     // @ts-ignore
// //
// //     await sampleFile.mv(uploadPath, function (err: any) {
// //         if (err)
// //             return res.status(500).send(err);
// //         res.send(uploadPath)
// //         // @ts-ignore
// //
// //         // fs.readFile(uploadPath, (err, data) => {
// //         //     if (err) {
// //         //         throw err;
// //         //     } else {
// //         //         console.log('Content of file is:  ' + data);
// //         //     }
// //         // });
// //     })
// // })
// //
// //
// // app.get('/', (req: Request, res: Response, next: NextFunction) => {
// //     req.session.numberOfVisits = req.session.numberOfVisits + 1
// //     res.send('Visits' + req.session.numberOfVisits)
// //     // if (req.cookies.visit) visits = req.cookies.visit
// //     // else visits = 0
// //     // visits++
// //     // res.cookie('visit', visits, {path: '/', secure: true, httpOnly: true})
// //     // res.cookie('secret', 'something', {signed: true})
// //     // console.log(req.signedCookies.secret)
// //     // console.log(req.cookies.secret)
// //     // res.send(`TypeScript Visit ${visits}`);
// // });
// // // app.post('/products', (req, res, next) => {
// // //     // if (req.body.email === 'yandex') res.redirect(303,'https://yandex.com/')
// // //     res.json({...req.body});
// // // });
// // app.get('/users', (req, res) => {
// //     res.cookie('t', 't', {path: '/users'})
// //     res.json(user);
// // });
// // app.put('/users/:id', (req, res) => {
// //     // for (let i = 0; i < user.length; i++) {
// //     //     if (user[i].id === +req.params.id) {
// //     //         user[i].name = req.body.name;
// //     //     }
// //     // }
// //     const result = user.map(item => item.id === +req.params.id ? {...item, ...req.body} : item)
// //     res.json(result);
// // });
// // app.post('/users', (req: Request, res: Response) => {
// //     if (req.body.name) {
// //         user.push({...req.body, id: user.length + 1})
// //         res.json(user)
// //     } else {
// //         console.log('badrequest')
// //         res.download('')
// //         res.status(400).json({Error: 'BadRequest'})
// //     }
// // })
// // app.delete('/users/:id', (req, res) => {
// //     user = user.filter(item => item.id !== +req.params.id)
// //     res.json(user)
// // })
// // app.get('/products', (req: Request<any, any, any, { count: string }>, res) => {
// //     if (products[+req.query.count]) res.json(products[+req.query.count]);
// //     else res.status(404).json({Error: 'NotFoundSorryBro'});
// // });
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //     res.type('json').status(404).json({error: 'Not Found'});
// // });
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //     res.type('json').status(500).json({error: 'Server Error'});
// // });
// app.listen(port, () => {
//     console.log('Server Started');
// });

import express from 'express'
import cluster from 'cluster'
import CPU from 'os'
import {user} from './monngooseScheme'

const port = 8080;
const totalCPUs = CPU.cpus().length

if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log('Let\'s fork another worker!');
        cluster.fork();
    });
} else {
    const app = express();
    console.log(`Worker ${process.pid} started`);

    app.get('/', (req, res) => {
        console.log(user.length)
        res.send('Hello World!');
    });

    app.get('/cluster/:n', function (req, res) {
        let n = +req.params.n
        let count = 0;

        if (n > 5000000000) n = 5000000000;

        for (let i = 0; i <= n; i++) {
            count += i;
        }

        res.send(`Final count is ${count}`);
    });

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}