describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'sekret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:5173')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.get('button').contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('sekret')
            cy.contains('login').click()
            cy.contains('Matti Luukkainen logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('wrong')
            cy.contains('login').click()
            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'sekret' })
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('input[placeholder="title"]').type('A blog created by cypress')
            cy.get('input[placeholder="author"]').type('Cypress Author')
            cy.get('input[placeholder="url"]').type('https://cypress.io')
            cy.get('form').find('button[type="submit"]').click()
            cy.contains('A blog created by cypress')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Another blog by cypress',
                    author: 'Cypress',
                    url: 'https://cypress.io'
                })
            })

            it('user can like a blog', function () {
                cy.contains('Another blog by cypress')
                    .parent()
                    .find('button')
                    .contains('view')
                    .click()
                cy.contains('Another blog by cypress')
                    .parent()
                    .contains('like')
                    .click()
                cy.contains('Another blog by cypress')
                    .parent()
                    .should('contain', 'likes 1')
            })

            it('user who created a blog can delete it', function () {
                cy.contains('Another blog by cypress').should('exist')
                cy.contains('Another blog by cypress')
                    .parent()
                    .find('button')
                    .contains('view')
                    .click()
                cy.contains('Another blog by cypress')
                    .parent()
                    .contains('remove')
                    .should('be.visible')
                    .click()
                cy.wait(1000)
                cy.contains('Another blog by cypress').should('not.exist')
            })

            it('only the creator can see the delete button', function () {
                cy.contains('Another blog by cypress')
                    .parent()
                    .find('button')
                    .contains('view')
                    .click()
                cy.contains('Another blog by cypress')
                    .parent()
                    .contains('remove')
                    .should('be.visible')
                cy.contains('Another blog by cypress')
                    .parent()
                    .find('button')
                    .contains('hide')
                    .click()
                cy.contains('logout').click()
                const user = {
                    name: 'Another User',
                    username: 'anotheruser',
                    password: 'password'
                }
                cy.request('POST', 'http://localhost:3003/api/users/', user)
                cy.login({ username: 'anotheruser', password: 'password' })
                cy.contains('Another blog by cypress')
                    .parent()
                    .find('button')
                    .contains('view')
                    .click()
                cy.contains('Another blog by cypress')
                    .parent()
                    .should('not.contain', 'remove')
            })
        })

        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'First blog', author: 'Author 1', url: 'http://example.com/1' })
                cy.createBlog({ title: 'Second blog', author: 'Author 2', url: 'http://example.com/2' })
                cy.createBlog({ title: 'Third blog', author: 'Author 3', url: 'http://example.com/3' })
            })

            it('blogs are ordered by likes', function () {
                cy.contains('Second blog').parent().find('button').contains('view').click()
                cy.contains('Second blog').parent().contains('like').click()
                cy.wait(500)
                cy.contains('Second blog').parent().contains('like').click()
                cy.wait(500)
                cy.contains('Third blog').parent().find('button').contains('view').click()
                cy.contains('Third blog').parent().contains('like').click()
                cy.wait(500)
                cy.get('.blog').eq(0).should('contain', 'Second blog')
                cy.get('.blog').eq(1).should('contain', 'Third blog')
                cy.get('.blog').eq(2).should('contain', 'First blog')
            })
        })
    })
})