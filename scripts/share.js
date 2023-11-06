// form and button

const taskForm = document.getElementId('#task-form');

const taskContainer = document.getElementId('#task-container');

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get values from form
    const task = {
        product: taskForm['product'].value,
        amount: taskForm['amount'].value,
        price: taskForm['price'].value,
        location: taskForm['location'].value,
        photo: taskForm['photo'].value,
    };

    await createTask(task);

    taskForm.reset();
    taskForm['task-title'].focus();
});