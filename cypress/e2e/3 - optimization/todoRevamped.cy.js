/// <reference types="cypress" />
import * as todoPage from '../../pageObjects/todo'

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
        todoPage.assertNumberOfTodos(2);
        todoPage.assertTodosText(testTodos);
    })

    it('can add new todo items', () => {
        const newItem = 'Feed the cat'
        todoPage.addTodo(newItem);
        todoPage.assertNumberOfTodos(3);
        todoPage.assertTodosText(testTodos);
    })

    it('can check off an item as completed', () => {
        todoPage.clickTodoCheckbox('Pay electric bill', true);
    })

    context('with a checked task', () => {
        beforeEach(() => {
            todoPage.clickTodoCheckbox('Pay electric bill', true);
        })

        it('can filter for uncompleted tasks', () => {
            todoPage.filterTodos('Active');

            todoPage.assertSingleTodoText('Walk the dog')
            todoPage.assertNumberOfTodos(1)

            todoPage.assertSingleTodoText('Pay electric bill', false)
        })

        it('can filter for completed tasks', () => {
            todoPage.filterTodos('Completed');

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

    context('brand new list of todos', () => {
        before(() => {
            //clear existing todos from previous test to start with blank slate.
            // clearAllTodos();
        })
        it('can add multiple todos', () => {
            // clearAllTodos();
            todoPage.addTodo(todos);
            // assertNumberOfTodos(todos.length)
        })

        it('can mark random todo as completed', () => {

        });

        it('can remove random todo', () => {

        });
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
