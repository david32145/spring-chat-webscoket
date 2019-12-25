const form = document.querySelector(".form-login");
const input = document.querySelector(".form-login input");
const buttonLogin = document.querySelector(".form-login button");

let name = null;
buttonLogin.addEventListener("click", (event) => {
    event.preventDefault()
    form.style.display = 'none';
    name = input.value;
    input.value = "";
    document.querySelector(".message-list").style.display = 'flex'
    buildList()
})


function buildListItem(item = {owner:"", message:""}){
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.innerHTML = `
        <span class="user">@${item.owner}: </span>
        ${item.message}
    `
    li.appendChild(p);
    return li;
}

function buildList(){
    const messageContainer = document.querySelector(".message-list");
    const ul = document.createElement('ul');
    const buttonSendMsg = document.querySelector(".message-list button");
    const inputMst = document.querySelector(".message-list input");

    buttonSendMsg.addEventListener('click', function(event){
        event.preventDefault();
        const data = {
            owner: name,
            message: inputMst.value
        }

        console.log(data)

        fetch("/message", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        }).then(res => console.log(res))
        .catch(err => console.log(err))
        inputMst.value = ""
    })
    
    const socket = new SockJS("/message");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
       stompClient.subscribe("/topic/newMessage", function(data){
            ul.appendChild(buildListItem(JSON.parse(data.body)))
        });
    })

    messageContainer.appendChild(ul);

}