/* locators */
let locators = {
    // completedBtn: cy.contains("Clear completed")
}

/* functions */

//adding single todo or multiple 
export const addTodo = (todos) => {
    if(Array.isArray(todos)){
        for(let i = 0; i < todos.length; i++){
            cy.getDataTag("new-todo").type(`${todos[i]}{enter}`);
        }   
    } else {
        cy.getDataTag("new-todo").type(`${todos}{enter}`);
    }

}

//asserting number of todos
export const assertNumberOfTodos = num => {
    cy.get('.todo-list li').should('have.length', num);
}

//assert todo text for full list
export const assertTodosText = (todoText) => {
  for(let i = 0; i < todoText.length; i++){
    cy.get('.todo-list li').eq(i).should("have.text", todoText[i])
  }
}

//assert single todo text
export const assertSingleTodoText = (text, boolean = true, index = 0) => {
    cy.get('.todo-list li').eq(index).should(boolean ? "have.text" : "not.have.text", text)
}

//check todo (can be used to check or uncheck todo)
export const clickTodoCheckbox = (todoText, checkboxBool) => {
    cy.contains(todoText).parent().find('input[type=checkbox]').check();
    cy.contains(todoText).parents('li').should(checkboxBool ? 'have.class' : 'not.have.class', 'completed');
}

export const clearAllTodos = (num) => {
    for(let x = 0; x < num; x++){
        cy.get('.todo-list').within(() => {
            cy.get('li').eq(0).within(() => {
                cy.get('.destroy').invoke('show').click();
            });
        });
    }
}

export const removeTodo = index => {
            cy.get('.todo-list').within(() => {
            cy.get('li').eq(index).within(() => {
                cy.get('.destroy').invoke('show').click();
            });
        });
}

export const filterTodos = type => {
    cy.get('.filters').within(() => {
        cy.contains(type).click();
    })
}

export const deleteCompletedTasks = () => {
    locators.completedBtn.click();
}

export const clearCompletedTodos = () => {
    cy.get('.clear-completed').click();
}
