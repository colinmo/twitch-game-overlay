var editingTarget = null;
var imageDataUrl = "";

var deletedia = document.getElementById("delete-dialog"),
    immadelete = {};
deletedia.querySelector("button[value=yes]").addEventListener("click", (e) => { console.log("yes"); immadelete.parentNode.removeChild(immadelete); deletedia.close(); });
deletedia.querySelector("button[value=no]").addEventListener("click", (e) => { console.log("no"); deletedia.close(); });

document.getElementById("save").addEventListener('click', (e) => {
    e.preventDefault()
    char = new Character()
    char.setFromElement(document.getElementById("character-edit"));
    console.log(editingTarget);
    if (editingTarget == null) {
        // Add
        console.log("Add");
        characterHolder.innerHTML += `<div class="display-screen">${char.getConfigAvatar()}<button data-action="edit">Edit</button><button data-action="delete">Delete</button></div>`;
    } else {
        // Edit
        console.log("Edit");
        editingTarget.innerHTML = `${char.getConfigAvatar()}<button data-action="edit">Edit</button><button data-action="delete">Delete</button>`;
        editingTarget = null;
    }
    document.querySelector('#character-edit .str').value = ""
    document.querySelector('#character-edit .dex').value = ""
    document.querySelector('#character-edit .con').value = ""
    document.querySelector('#character-edit .wis').value = ""
    document.querySelector('#character-edit .int').value = ""
    document.querySelector('#character-edit .cha').value = ""
    document.querySelector('#character-edit .name').value = ""
    document.querySelector('#character-edit .class').value = ""
    document.querySelector('#character-edit .race').value = ""
    document.querySelector('#character-edit .level').value = ""
    document.querySelector('#character-edit .maxhp').value = ""
    document.querySelector('#character-edit .ac').value = ""
});

function deleteMe(e) {
    immadelete = e.parentNode;
    deletedia.dataset.target = e
    deletedia.showModal();
}

function readyToGo(data) {
    AllConfig.characters.forEach((char) => {
        characterHolder.innerHTML += `<div class="display-screen">${char.getConfigAvatar()}<button data-action="edit">Edit</button><button data-action="delete">Delete</button></div>`;
    });
    document.getElementById("capname").value = data.campaign;
    document.getElementById("capsumm").value = data.summary;
}

document.getElementById("mainform").addEventListener('submit', (ev) => {
    if (ev.submitter.dataset.action == "delete") {
        deleteMe(ev.submitter);
        ev.preventDefault();
        return;
    }
    if (ev.submitter.dataset.action == "edit") {
        editingTarget = ev.submitter.parentNode;
        console.log(editingTarget);
        char = new Character();
        char.setFromElement(editingTarget);
        console.log(char);
        document.querySelector('#character-edit .str').value = char.stats.str
        document.querySelector('#character-edit .dex').value = char.stats.dex
        document.querySelector('#character-edit .con').value = char.stats.con
        document.querySelector('#character-edit .wis').value = char.stats.wis
        document.querySelector('#character-edit .int').value = char.stats.int
        document.querySelector('#character-edit .cha').value = char.stats.cha
        document.querySelector('#character-edit .name').value = char.name
        document.querySelector('#character-edit .class').value = char.class
        document.querySelector('#character-edit .race').value = char.race
        document.querySelector('#character-edit .level').value = char.level
        document.querySelector('#character-edit .maxhp').value = char.maxhp
        document.querySelector('#character-edit .ac').value = char.ac
        ev.preventDefault();
        return;
    }
    ev.preventDefault();
    AllConfig.campaign = document.querySelector("#capname").value;
    AllConfig.summary = document.querySelector("#capsumm").value;
    AllConfig.characters = [];
    document.querySelectorAll('.acharacter').forEach((e) => {
        console.log(e);
        char = new Character()
        char.setFromElement(e);
        AllConfig.characters.push(char)
    })
    // Update config
    try {
        Twitch.ext.configuration.set('broadcaster', '', AllConfig.toString())
    } catch (e) {
        console.error("Save", e);
    }
    try {
        Twitch.ext.send("broadcaster", "application/json", AllConfig.toString());
    } catch (e) {
        console.error("Send", e);
    }
});

var data = { "characters": [] }
var repeat = 0
