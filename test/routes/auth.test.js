const assert = require('assert');
const axios = require('axios');
const { User } = require('../../models/User');

describe('register', () => {
    let ID
    it('with correct format', async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: 'test',
                password: '123456'
            })
            const { data } = response
            ID = data._id
            assert(data._id)


        } catch (error) {
            console.log(error);
            assert(false)
        }
    })
    it('duplicate username', async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: 'test',
                password: '123456'
            })
            const { data } = response
            assert(data.error.username)


        } catch (error) {
            console.log(error);
            assert(false)
        }
    })
    it('no username', async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: '',
                password: '123456'
            })
            const { data } = response
            assert(data.error.username)


        } catch (error) {
            console.log(error);
            assert(false)
        }
    })
    it('no password', async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: 'test',
                password: ''
            })
            const { data } = response
            assert(data.error.password)


        } catch (error) {
            console.log(error);
            assert(false)
        }
    })
    it('delete added user', async (done) => {
        try {
            await User.findOneAndDelete({ id: ID })
            const user = await User.findOne({ id: ID })
            assert(!user)
            done()
        } catch (error) {
            console.log(error);
            assert(false)
        }
    })


})