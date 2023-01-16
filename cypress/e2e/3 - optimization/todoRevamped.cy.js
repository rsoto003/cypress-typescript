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
            todoPage.assertNumberOfTodos(1);
            todoPage.assertSingleTodoText('Pay electric bill');
            todoPage.assertSingleTodoText('Walk the dog', false)
        })

        it('can delete all completed tasks', () => {
            todoPage.clearCompletedTodos();
            todoPage.assertNumberOfTodos(1);
            todoPage.assertSingleTodoText('Pay electric bill', false)

            cy.contains('Clear completed').should('not.exist')
        })
    })

    context('brand new list of todos - best practices refresher', () => {
        it('can perform actions on various todos', () => {
            todoPage.clearAllTodos(2);
            todoPage.addTodo(todos);
            cy.get('.todo-count').should('contain', `${todos.length} items left`);
            todoPage.assertNumberOfTodos(todos.length);

            //mark random todo as completed
            let todoToComplete = todos[Math.floor(Math.random() * todos.length)];
            todoPage.clickTodoCheckbox(todoToComplete, true);
            todoPage.filterTodos('Completed');
            cy.get('.todo-count').should('contain', `${todos.length - 1} items left`);

            //remove random todo
            todoPage.filterTodos('All');
            let deletedTodoText = todos[Math.floor(Math.random() * todos.length)];
            let indexOfDeletedTodo = todos.indexOf(deletedTodoText);
            
            todoPage.assertSingleTodoText(deletedTodoText, true, indexOfDeletedTodo);
            todoPage.removeTodo(indexOfDeletedTodo);
            todoPage.assertSingleTodoText(deletedTodoText, false, indexOfDeletedTodo);
        });
    })
})
