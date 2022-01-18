describe('auth endpoints', ()=>{
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
        await request(api).post('/register').send({email: 'test@gmail.com', username: 'test', password: 'test'})
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

  
    it('registers new user', async()=>{
        const res = await request(api)
            .post('/register')
            .send({
                email: 'test2@gmail.com',
                username: "test2",
                password: "test"
            })
        expect(res.statusCode).toBe(201)

    })

    it('logs in user', async ()=>{
        const res = await request(api)
            .post('/login')
            .send({
                username: 'test',
                password: 'test'
            })
        expect(res.statusCode).toBe(200)
    })
})