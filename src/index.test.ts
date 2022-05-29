import axios from 'axios';
import express from 'express';
import g from 'loadtest';

const app = express();

export const api = {
    getA() {
        return axios.get('http://localhost:8080');
    },
};

// test('request', async () => {
//     const data = await api.getA()
//     expect(data.data.arr).toBe(2)
// });

test('some', () => {
    expect(2).toBe(2);
});

test('started', () => {
    console.log('Hello2')
    const server = app.listen(3000, () => {
        server.close();
    });
});

