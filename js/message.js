






const MSG_TAB_CONFIGS = [{
        name: "spy",
        ui_id:"ui-id-14",
        transform_func: transform_func_spy,
        broadcast_on: [{
            name: "discord",
            enable: false
        }]
    },{
        name: "combat",
        ui_id:"ui-id-16",
        transform_func: transform_func_combat,
        broadcast_on: [{
            name: "discord",
            enable: true
        }]
    },{
        name: "expedition",
        ui_id:"ui-id-18",
        transform_func: transform_func_expedition,
        broadcast_on: [{
            name: "discord",
            enable: true
        }]
    },{
        name: "transport",
        ui_id:"ui-id-20",
        transform_func: transform_func_transport,
        broadcast_on: [{
            name: "discord",
            enable: false
        }]
    },{
        name: "divers",
        ui_id:"ui-id-22",
        transform_func: transform_func_divers,
        broadcast_on: [{
            name: "discord",
            enable: false
        }]
    }];


// Écoute les événements dans la page web
document.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG og-broadcast has been initialized")
    
    // create all observers for each tab
    MSG_TAB_CONFIGS.forEach(element => {
        loadObserver(tab_config=element, ui_id=element.ui_id);
    });

  });


let last_tab_open = null;

function loadObserver(tab_config, ui_id) {
    // Select the target node that you want to observe for changes
    var targetNode = document.getElementById(ui_id); 

    // Create a new MutationObserver instance
    var observer = new MutationObserver(function(mutationsList) {
        // Handle the mutations

        // console.log(tab_name, last_tab_open, targetNode.getAttribute("aria-hidden"), targetNode.getAttribute("aria-hidden")=="false", last_tab_open!=tab_name)
        if (targetNode.getAttribute("aria-hidden")=="false" && last_tab_open!=tab_config.name) {
            last_tab_open = tab_config.name
            // console.log(tab_config.name + " tab content changed!");

            // get all messages
            let messages = getMessages(tab_config, targetNode);
            processMessageBroadcast(tab_config, messages);
        }
    });

    // Configure the MutationObserver to listen for specific types of mutations
    var config = { childList: true, subtree: false, attributes: false, characterData: false };

    // Start observing the target node with the specified configuration
    observer.observe(targetNode, config);
    // console.log(tab.name + " obverser is ready")

};

function getMessages(tab_config, targetNode) {
    // Messages are pickup from msg_content because ".msg " is not recognized due to the space in the class name
    var messages_content = targetNode.querySelectorAll(".msg_content")
    var messages = []
    
    messages_content.forEach(msg_content => {
        var msg = msg_content.parentNode;
        if (msg.hasAttribute("data-msg-id")) {
            messages.push(msg);
        };
    });

    return messages
};




function transform_func_spy(tab_config, message) {
    return {}
};

function transform_func_combat(tab_config, message) {
    return {}
};

// ##########################################
// EXPEDITION

function getExpeditionType(message) {
    console.log(message);
    console.log(message.classList, message.classList.value, message.getAttribute("class"));
    if (message.classList.contains("ogk-void")) {
        print("AM")
        return "am"
    }

};

function transform_func_expedition(tab_config, message) {
    console.log("transform_func_expedition", message,message.getAttribute("class"))
    let data = {
        type: "getExpeditionType(message)"
    }
    return data
};

function transform_func_transport(tab_config, message) {
    return {}
};

function transform_func_divers(tab_config, message) {
    return {}
};


function processMessageBroadcast(tab_config, messages) {
    console.log(tab_config.name, messages);
    var messages_data = []
    messages.forEach(msg => {
        messages_data.push([msg, tab_config.transform_func(tab_config, msg)])
    });
    console.log(messages_data)

};







function createBroadcastMessageDataBTN(msg, data) {
    
    // create BTN
    const broadcastBTN = document.createElement("button");
    broadcastBTN.setAttribute(qualifiedName="class", value="icon_nf icon_share")
    broadcastBTN.innerText = "BR";

    // Add an event listener to the button
    broadcastBTN.addEventListener('click', function() {
        const data = extractMessageData();

        // Envoie un message à l'arrière-plan pour déclencher l'enregistrement des données
        chrome.runtime.sendMessage({
        action: 'broadcastData',
        data: data
        });
    });


    // Append the button to an existing element on the page
    const msg_actions = msg.getElementByClassName('msg_actions clearfix');
    //msg_actions.appendChild(button);

};

