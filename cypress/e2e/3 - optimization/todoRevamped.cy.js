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
        assertTodosText(testTodos);
    })

    it('can add new todo items', () => {
        const newItem = 'Feed the cat'
        addTodo(newItem);
        assertNumberOfTodos(3);
        assertTodosText(testTodos);
    })

    it('can check off an item as completed', () => {
        clickTodoCheckbox('Pay electric bill', true);
    })

    context('with a checked task', () => {
        beforeEach(() => {
            clickTodoCheckbox('Pay electric bill', true);
        })

        it('can filter for uncompleted tasks', () => {
            filterTodos('Active');

            // cy.get('.todo-list li')
            //     .should('have.length', 1)
            //     .first()
            //     .should('have.text', 'Walk the dog')

            assertSingleTodoText('Walk the dog')
            assertNumberOfTodos(1)
            // cy.contains('Pay electric bill').should('not.exist')
            assertSingleTodoText('Pay electric bill', false)
        })

        it('can filter for completed tasks', () => {
            filterTodos('Completed');

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
            addTodo(todos);
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

//adding single todo or multiple 
const addTodo = (todos) => {
    if(Array.isArray(todos)){
        for(let i = 0; i < todos.length; i++){
            cy.getDataTag("new-todo").type(`${todos[i]}{enter}`);
        }   
    } else {
        cy.getDataTag("new-todo").type(`${todos}{enter}`);
    }

}

//asserting number of todos
const assertNumberOfTodos = num => {
    cy.get('.todo-list li').should('have.length', num);
}

//assert todo text for full list
const assertTodosText = (todoText) => {
  for(let i = 0; i < todoText.length; i++){
    cy.get('.todo-list li').eq(i).should("have.text", todoText[i])
  }
}

//assert single todo text
const assertSingleTodoText = (text, boolean = true, index = 0) => {
    cy.get('.todo-list li').eq(index).should(boolean ? "have.text" : "not.have.text", text)
}

//check todo (can be used to check or uncheck todo)
const clickTodoCheckbox = (todoText, checkboxBool) => {
    cy.contains(todoText).parent().find('input[type=checkbox]').check();
    cy.contains(todoText).parents('li').should(checkboxBool ? 'have.class' : 'not.have.class', 'completed');
}

const clearAllTodos = () => {
    cy.get('.todo-list').within(() => {
        cy.get('li').eq(0).trigger('mouseenter');
        cy.get('.destroy').click({multiple: true});
    });
}

const filterTodos = type => {
    cy.get('.filters').within(() => {
        cy.contains(type).click();
    })
}