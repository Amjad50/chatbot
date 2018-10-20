String.prototype.format = function () {
    var e = this.toString();
    if (!arguments.length)
        return e;
    var t = typeof arguments[0]
        , n = "string" == t || "number" == t ? Array.prototype.slice.call(arguments) : arguments[0];
    for (var i in n)
        e = e.replace(new RegExp("\\{" + i + "\\}", "gi"), n[i]);
    return e
}

const __MSGTYPE = {
    OUTGOING: 0,
    INCOMING: 1
};

const kit_list_item_template = `<div class="chat_list"><div class="chat_people"><div class="chat_ib"><h5>{0}</h5><p>{1}</p></div></div></div>`;

const incoming_message_template = `<div class="incoming_msg"><div class="received_msg"><div class="received_withd_msg"><p>{0}</p><span class="time_date">{1}</span></div></div></div>`;

const outgoing_message_template = `<div class="outgoing_msg"><div class="sent_msg"><p>{0}</p><span class="time_date">{1}</span></div></div>`;


let kit_list_holder = document.getElementsByClassName('inbox_chat')[0];
let messages_holder = document.getElementsByClassName('msg_history')[0];
let send_button = document.getElementsByClassName('msg_send_btn')[0];
let message_input = document.getElementsByClassName('write_msg')[0];

const kit_list = [
    { title: "At least 5 gallons of water per person".format(), place: "market" },
    { title: "Put together a 3 to 5 day supply of food that doesn’t go bad (like canned food)", place: "market" },
    { title: "Prescription medicines", place: "closet" },
    { title: "First Aid Kit", place: "pharmacy" },
    { title: "Flashlight", place: "store" }
];

function send_click(event){
    if(event.type === 'keydown' && event.keyCode != 13/*Enter*/)
        return;
    let message = message_input.value;
    push_message(message, __MSGTYPE.OUTGOING);
    message_input.value = '';
    
}

function push_message(msg, type) {
    sendToBot(msg);
    let date = new Date();
    let c_date = `${date.getHours()}:${date.getMinutes()} | ${date.getMonth()}-${date.getDay()}`;
    console.log(c_date)
    if(type === __MSGTYPE.INCOMING){
        messages_holder.innerHTML += incoming_message_template.format(msg, c_date);
    }else{
        messages_holder.innerHTML += outgoing_message_template.format(msg, c_date);
    }
    messages_holder.scrollTop = messages_holder.scrollHeight;
}

function send_bot_message(msg){
    push_message(msg, __MSGTYPE.INCOMING);
}

function check_item(index){
    if (index > 0)
        kit_list_holder.children[index - 1].classList.add('active_chat');
}

function main() {
    
    kit_list.forEach(element => {
        kit_list_holder.innerHTML += kit_list_item_template.format(element.title, element.place);
    });

    send_button.addEventListener('click', send_click)
    message_input.addEventListener('keydown', send_click);
}

main();