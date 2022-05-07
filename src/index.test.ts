import {api} from './index';


test('request', async () => {
    const data = await api.getA()
    expect(data.data.arr).toBe(3)
});

test('some',()=>{
    expect(2).toBe(2)
})
