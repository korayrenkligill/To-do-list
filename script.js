let id = 0;
let errorIcon = '<img src="./error.png" width="20px" alt="error icon">';
let verifyIcon = '<img src="./verified.png" width="20px" alt="error icon">';
window.addEventListener('load', ()=>{
    let taskList = [];
    if(localStorage.getItem("taskList") !== null)
        taskList = JSON.parse(localStorage.getItem("taskList"));

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let date = new Date();
    document.getElementById("time").innerText = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list = document.querySelector('#list');
    const logContainer = document.querySelector('#log-container');
    // const refresh = document.querySelector('#refresh');

    taskList.forEach((value,index,array)=>{
        if(array[index] !== null){
            array[index].id = id;
            const taskLabel = document.createElement("label");
            taskLabel.classList.add("task");
            taskLabel.setAttribute("for", id.toString());

            const taskDiv = document.createElement("div");

            const taskInput = document.createElement("input");
            taskInput.setAttribute("type", "checkbox");
            taskInput.setAttribute("id", id.toString());
            taskInput.addEventListener('change', function() {
                if (this.checked){
                    array[index].checked = true;
                    taskLabel.classList.add("checked");
                    localStorage.setItem("taskList",JSON.stringify(taskList));
                }
                else{
                    array[index].checked = false;
                    taskLabel.classList.remove("checked");
                    localStorage.setItem("taskList",JSON.stringify(taskList));
                }
            });
            console.log(array[index].checked);
            taskInput.checked = array[index].checked;
            taskInput.checked ? taskLabel.classList.add("checked") : null;

            const taskMessage = document.createElement("p");
            taskMessage.classList.add("task-message");
            taskMessage.innerText = array[index].text;

            taskDiv.appendChild(taskInput);
            taskDiv.appendChild(taskMessage);

            const taskButton = document.createElement("button");
            taskButton.innerHTML = '<img src="delete.png" alt="">';
            taskButton.addEventListener('click', ()=>{
                delete array[array[index].id];
                localStorage.setItem("taskList",JSON.stringify(taskList));
                list.removeChild(taskLabel);
            });

            taskLabel.appendChild(taskDiv);
            taskLabel.appendChild(taskButton);

            list.appendChild(taskLabel);
            input.focus();
            id++;
        }
        else{
            id++;
        }
    });

    // refresh.addEventListener('click', ()=>{
    //     console.log(taskList);
    // });

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const task = input.value;
        if(task.trim() == ""){
            const error = document.createElement("div");
            error.classList.add("error");
            error.innerHTML= `${errorIcon} <p>This field cannot be left blank</p>`;
            logContainer.appendChild(error);
            let sec = 0;
            let sec2 = 0;
            let timer = setInterval(()=>{
                if(sec < 40){
                    sec++;
                }
                else{
                    clearInterval(timer);
                    error.classList.add("hide");
                    let timer2 = setInterval(()=>{
                        if(sec2 < 2){
                            sec2++;
                        }
                        else{
                            clearInterval(timer2);
                            error.remove();
                        }
                    },100);
                }
            },100);
        }
        else{
            const itemId = id;

            const taskLabel = document.createElement("label");
            taskLabel.classList.add("task");
            taskLabel.setAttribute("for", id.toString());
            
            const taskDiv = document.createElement("div");

            const taskInput = document.createElement("input");
            taskInput.setAttribute("type", "checkbox");
            taskInput.setAttribute("id", id.toString());
            taskInput.addEventListener('change', function() {
                if (this.checked){
                    taskList[itemId].checked = true;
                    taskLabel.classList.add("checked");
                    localStorage.setItem("taskList",JSON.stringify(taskList));
                }
                else{
                    taskList[itemId].checked = false;
                    taskLabel.classList.remove("checked");
                    localStorage.setItem("taskList",JSON.stringify(taskList));
                }
            });

            const taskMessage = document.createElement("p");
            taskMessage.classList.add("task-message");
            taskMessage.innerText = task;

            taskDiv.appendChild(taskInput);
            taskDiv.appendChild(taskMessage);

            const taskButton = document.createElement("button");
            taskButton.innerHTML = '<img src="delete.png" alt="">';
            taskButton.addEventListener('click', ()=>{
                delete taskList[itemId];
                localStorage.setItem("taskList",JSON.stringify(taskList));
                list.removeChild(taskLabel);
            })

            taskLabel.appendChild(taskDiv);
            taskLabel.appendChild(taskButton);

            list.appendChild(taskLabel);

            let object = {
                id: id,
                text: task,
                checked: false
            }
            taskList.push(object);
            localStorage.setItem("taskList",JSON.stringify(taskList));
            input.value = "";
            input.focus();

            const verify = document.createElement("div");
            verify.classList.add("verify");
            verify.innerHTML= `${verifyIcon} <p>Successfully!</p>`;
            logContainer.appendChild(verify);
            let sec = 0;
            let sec2 = 0;
            let timer = setInterval(()=>{
                if(sec < 40){
                    sec++;
                }
                else{
                    clearInterval(timer);
                    verify.classList.add("hide");
                    let timer2 = setInterval(()=>{
                        if(sec2 < 2){
                            sec2++;
                        }
                        else{
                            clearInterval(timer2);
                            verify.remove();
                        }
                    },100);
                }
            },100);

            id++;
        }
    })
})

function Clear(){
    localStorage.clear();

    const logContainer = document.querySelector('#log-container');
    const verify = document.createElement("div");
    verify.classList.add("verify");
    verify.innerHTML= `${verifyIcon} <p>List is being cleared now!</p>`;
    logContainer.appendChild(verify);
    let sec = 0;
    let sec2 = 0;
    let timer = setInterval(()=>{
    if(sec < 5){
        sec++;
    }
    else{
        clearInterval(timer);
        verify.remove();
        location.reload();
    }},100);
}

// localStorage.setItem("dizi",JSON.stringify(dizi));
// console.log(JSON.parse(localStorage.getItem("dizi")));
//localStorage.clear();