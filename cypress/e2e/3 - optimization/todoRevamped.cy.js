/// <reference types="cypress" />
describe('example to-do app', () => {
    let todos = [
        "Take Rocky out to go potty", 
        "Give Rocky his lunch", 
        "Give Rocky his medicine",
        "Eat lunch @ 12:30 PM",
        "Apply to 5 jobs after lunch",
        "Take rocky out for afternoon walk"
    ]

    let testTodos = [
        "Pay electric bill",
        "Walk the dog",
    ]
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo')
    })

    it('displays two todo items by default', () => {
        assertNumberOfTodos(2);
        assertTodoText(testTodos);
    })

    it('can add new todo items', () => {
        const newItem = 'Feed the cat'
        testTodos.push(newItem);
        addTodo(newItem);
        assertNumberOfTodos(3);
        assertTodoText(testTodos);
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
const assertNumberOfTodos = num => {
    cy.get('.todo-list li').should('have.length', num);
}

//assert todo text
function assertTodoText(todoText){
  for(let i = 0; i < todoText.length; i++){
    cy.get('.todo-list li').eq(i).should("have.text", todoText[i])
  }
}