const app = require('../app')
const request = require('supertest')
const {Story, sequelize} = require('../models')
const {queryInterface} = sequelize

let createdStoryId = null;

describe('Stories Routes Test', () => {
    const AddStory = {
        title: 'Morna',
        content: 'Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.',
        theme: 'Game',
        createdBy: 'Jessica',
        language: 'en-US'
    }
    describe('POST /stories - create stories', () => {
        test('400 failed create story - should return error if title null', (done) => {
            request(app)
            .post('/stories')
            .send({
                content: 'Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.',
                theme: 'Game',
                createdBy: 'Jessica',
                language: 'en-US'
            })
            .then(response => {
                const {body,status} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message',`title can't be empty`)
                done()
            })
        })
        test('400 failed create story - should return error if content null', (done) => {
            request(app)
            .post('/stories')
            .send({
                title: 'Morna',
                theme: 'Game',
                createdBy: 'Jessica',
                language: 'en-US'
            })
            .then(response => {
                const {body,status} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message',`content can't be empty`)
                done()
            })
        })
        test('400 failed create story - should return error if theme null', (done) => {
            request(app)
            .post('/stories')
            .send({
                title: 'Morna',
                content: 'Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.',
                createdBy: 'Jessica',
                language: 'en-US'
            })
            .then(response => {
                const {body,status} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message',`theme can't be empty`)
                done()
            })
        })
        test('400 failed create story - should return error if Created By null', (done) => {
            request(app)
            .post('/stories')
            .send({
                title: 'Morna',
                content: 'Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.',
                theme: 'Game',
                language: 'en-US'
            })
            .then(response => {
                const {body,status} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message',`created by can't be empty`)
                done()
            })
        })
        test('400 failed create story - should return error if language null', (done) => {
            request(app)
            .post('/stories')
            .send({
                title: 'Morna',
                content: 'Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.',
                theme: 'Game',
                createdBy: 'Jessica'
            })
            .then(response => {
                const {body,status} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message',`language can't be empty`)
                done()
            })
        })
        test('201 success create story - should return data story', (done) => {
            request(app)
            .post('/stories')
            .send(AddStory)
            .then(response => {
                const {body,status} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('title','Morna')
                expect(body).toHaveProperty('content','Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.')
                expect(body).toHaveProperty('theme','Game')
                expect(body).toHaveProperty('createdBy','Jessica')
                expect(body).toHaveProperty('language','en-US')
                createdStoryId = body.id;
                done()
            })
        })
        test(`404 failed get one story - should return error if Can't get one story`, (done) => {
            request(app)
            .get('/stories/detail/1')
            .then(response => {
                const {body,status} = response
                console.log(body)
                expect(status).toBe(404)
                expect(body).toHaveProperty('message',`story not found`)
                done()
            })
        })
        test(`200  get one story - should return a story`, (done) => {
            request(app)
            .get(`/stories/detail/${createdStoryId}`)
            .then(response => {
                const {body,status} = response
                console.log(body)
                expect(status).toBe(200)
                expect(body).toHaveProperty('title','Morna')
                expect(body).toHaveProperty('content','Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.')
                expect(body).toHaveProperty('theme','Game')
                expect(body).toHaveProperty('createdBy', 'Jessica')
                expect(body).toHaveProperty('language', 'en-US')
                done()
            })
        })
        test(`200  get all stories - should return all stories`, (done) => {
            request(app)
            .get('/stories/')
            .then(response => {
                const {body,status} = response
                console.log(body)
                expect(status).toBe(200)
                done()
            })
        })
        afterAll(done => {
            queryInterface
            .bulkDelete('stories',{})
            .then(() => done())
            .catch(err => done(err))
        })
    })
})