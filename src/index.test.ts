import axios from 'axios'

export const api = {
    getA() {
        return axios.get('http://localhost:8080')
    }
}


test('request', async () => {
    const data = await api.getA()
    expect(data.data.arr).toBe(3)
});

test('some', () => {
    expect(2).toBe(3)
})
