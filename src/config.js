

var editingIndex = -1;
var imageDataUrl = "";

document.getElementById("save").addEventListener('click', (e) => {
    e.preventDefault()
    char = new Character()
    char.setFromElement(document.getElementById("character-edit"));
    if (editingIndex == -1) {
        // Add
        characterHolder.innerHTML += `<div class="display-screen">${char.getConfigAvatar()}<button data-action="edit">Edit</button><button data-action="delete">Delete</button></div></div>`;
    } else {
        // Edit
        document.querySelector(`#characters div:nth-child(${editingIndex})`).innerHTML = char.getConfigAvatar();
    }
});

function deleteMe(e) {
    immadelete = e.parentNode;
    deletedia.dataset.target = e
    deletedia.showModal();
}

function editDisplayMode(campaign, summary) {
    AllConfig.characters.forEach((char) => {
        characterHolder.innerHTML += `<div class="display-screen">` + char.getConfigAvatar().replace("</div></div>", `</div><button data-action="edit">Edit</button><button data-action="delete">Delete</button></div></div>`);
    });
    document.getElementById("capname").value = campaign;
    document.getElementById("capsumm").value = summary;
}

document.getElementById("mainform").addEventListener('submit', (ev) => {
    if (ev.submitter.dataset.action == "delete") {
        deleteMe(ev.submitter);
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
    console.log(`Saving ${AllConfig.toString()}`)
    try {
        window.Twitch.ext.configuration.set('broadcaster', '', AllConfig.toString())
    } catch (e) {
        console.log(e);
    }
});

var data = { "characters": [] }
var repeat = 0

/*
const fileInput = document.getElementById("gameicon");
fileInput.addEventListener('change', (event) => {
    // Get the selected image file
    const imageFile = event.target.files[0];

    if (imageFile) {
        const reader = new FileReader();

        // Convert the image file to a string
        reader.readAsDataURL(imageFile);

        // FileReader will emit the load event when the data URL is ready
        // Access the string using result property inside the callback function
        reader.addEventListener('load', () => {
            // Get the data URL string
            AllConfig.icon = reader.result;
        });
    }
});

*/

var deletedia = document.getElementById("delete-dialog"),
    immadelete = {};
deletedia.querySelector("button[value=yes]").addEventListener("click", (e) => { console.log("yes"); immadelete.parentNode.removeChild(immadelete); deletedia.close(); });
deletedia.querySelector("button[value=no]").addEventListener("click", (e) => { console.log("no"); deletedia.close(); });