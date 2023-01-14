/// <reference types="cypress" />
describe('example to-do app', () => {
    let todos = ["Take Rocky out to go potty", "Give Rocky his lunch", "Give Rocky his medicine", ]
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo')
    })

    it('displays two todo items by default', () => {
        cy.get('.todo-list li').should('have.length', 2)

        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    })

    it('can add new todo items', () => {
        const newItem = 'Feed the cat'
        // cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
        addTodo(newItem);
        cy.pause();

        cy.get('.todo-list li')
        .should('have.length', 3)
        .last()
        .should('have.text', newItem)
    })

    it('can check off an item as completed', () => {
        cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()

        cy.contains('Pay electric bill')
        .parents('li')
        .should('have.class', 'completed')
    })

    context('with a checked task', () => {
        beforeEach(() => {
        cy.contains('Pay electric bill')
            .parent()
            .find('input[type=checkbox]')
            .check()
        })

        it('can filter for uncompleted tasks', () => {
        cy.contains('Active').click()

        cy.get('.todo-list li')
            .should('have.length', 1)
            .first()
            .should('have.text', 'Walk the dog')

        cy.contains('Pay electric bill').should('not.exist')
        })

        it('can filter for completed tasks', () => {
        cy.contains('Completed').click()

        cy.get('.todo-list li')
            .should('have.length', 1)
            .first()
            .should('have.text', 'Pay electric bill')

        cy.contains('Walk the dog').should('not.exist')
        })

        it('can delete all completed tasks', () => {
        cy.contains('Clear completed').click()

        cy.get('.todo-list li')
            .should('have.length', 1)
            .should('not.have.text', 'Pay electric bill')

        cy.contains('Clear completed').should('not.exist')
        })
    })
})


/* 
            cypress review plan
  -create functions to handle code where necessary
  -create page object file
    -move functions into page object file
    -create locators as well
    -import into main file 
  
  -typescript
    -rewrite spec in typescript
    -write page object file in typescript
*/

//adding todos 
function addTodo(todo){
  cy.getDataTag("new-todo").type(`${todo}{enter}`)
}

//asserting number of todos
function assertNumberOfTodos(num, todoText){
  cy.get('.todo-list li').should('have.length', num);
}