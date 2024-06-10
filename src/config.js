class Character {
    stats = {};
    name = {};
    portrait = {};
    player = {};

    constructor() {
        this.stats = "";
        this.name = "";
        this.player = "";
        this.portrait = "";
    }

    setAll(name, stats, player, portrait) {
        this.stats = stats;
        this.name = name;
        this.player = player;
        this.portrait = portrait;
        return this
    }

    setFromElement(element) {
        this.stats = element.querySelector('.stats').innerHTML,
            this.name = element.querySelector('.name').innerHTML,
            this.player = element.querySelector('.player').innerHTML,
            this.portrait = element.querySelector('.portrait').style.backgroundImage
        return this
    }

    setFromObject(obj) {
        this.stats = obj.stats;
        this.name = obj.name;
        this.player = obj.player;
        this.portrait = obj.portrait;

    }

    getStats() {
        return this.stats;
    }
    setStats(stat) {
        this.stats = stat;
        return this;
    }
    getName() {
        return this.name;
    }
    setName(myname) {
        this.name = myname;
        return this;
    }
    getPortrait() {
        return this.portrait;
    }
    setPortrait(port) {
        this.portrait = port;
        return this;
    }
    getPlayer() {
        return this.player;
    }
    setPlayer(play) {
        this.player = play;
        return this;
    }
    getConfigAvatar() {
        return `<div style="display: inline-block;padding-right: 10px;">${this.getDisplayAvatar()}<br /><button class="edit">Edit</button><button class="delete" onclick="deleteMe(event);">Delete</button></div>`
    }
    getDisplayAvatar() {
        return `<div class="portrait" style="background-image: url(${this.portrait});"><div class="player">${this.player}</div><div class="stats">${this.stats}</div><div class="name active">${this.name}</div><div class="frontplate" onclick="togglePlate(event)"></div></div>`;
    }
    getSaveRepresentation() {
        var steve = JSON.stringify(this);
        return steve;
    }
}

class Overlay {
    #active = false;
    #characters = {};

    constructor() {
    }

    activate() {
        this.#active = true;
    }

    deactivate() {
        this.#active = false;
    }

    addCharacter(x) {
        this.#characters[x.getName()] = x;
    }

}

class AllConfigClass {
    characters = []
    toString() {
        var returning = `{"characters": `;
        var chars = [];
        AllConfig.characters.forEach((e) => {
            chars.push(e)
        })
        return JSON.stringify({ "characters": AllConfig.characters });
    }

}
var AllConfig = new AllConfigClass()

var editingIndex = -1;
const characterHolder = document.getElementById("characters");
var imageDataUrl = "";

function togglePlate(t) {
    console.log('hi', t.target);
    let steve = t.target.parentElement.querySelector('div.active'),
        dave = t.target.parentElement.querySelector('div.active + div:not(.frontplate)');
    if (dave == null) {
        dave = t.target.parentElement.querySelector('div:first-child');
    }
    steve.classList.remove('active');
    dave.classList.add('active');
}

document.getElementById("save").addEventListener('click', (e) => {
    e.preventDefault()
    char = new Character()
    char.setAll(
        document.getElementById("newname").value,
        document.getElementById("newstats").value,
        document.getElementById("newplayer").value,
        imageDataUrl
    );
    if (editingIndex == -1) {
        // Add
        characterHolder.innerHTML += char.getConfigAvatar();
    } else {
        // Edit
        document.querySelector(`#characters div:nth-child(${editingIndex})`).outerHTML = char.getConfigAvatar();
    }
});

function deleteMe(e) {
    e.preventDefault()
    if (window.confirm("Really delete?")) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    }
}

document.getElementById("mainform").addEventListener('submit', (ev) => {
    ev.preventDefault();
    AllConfig.characters = [];
    document.querySelectorAll('#characters > div').forEach((e) => {
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
document.addEventListener("DOMContentLoaded", (event) => {
    repeat = setInterval(() => {
        console.log("Checking")
        console.log(typeof window.Twitch)
        if (typeof window.Twitch == 'undefined') {
            console.log("No")
            return;
        }
        clearInterval(repeat)
        window.Twitch.ext.configuration.onChanged(() => {
            console.log("Changed")
            getConfigLoaded()
        });
        if (typeof window.Twitch.ext.configuration.broadcaster != 'undefined') {
            console.log("Already")
            getConfigLoaded()
        }
    }, 500);
    console.log("Waiting")
});

async function getConfigLoaded() {
    var broadcaster_config = window.Twitch.ext.configuration.broadcaster;
    if (broadcaster_config && broadcaster_config.content) {
        try {
            data = JSON.parse(broadcaster_config.content)
            // we have broadcaster config loaded and parsed it to JSON
        } catch (e) {
        }
    }
    AllConfig.characters = [];
    data.characters.forEach((e) => {
        let c = new Character()
        c.setFromObject(e)
        AllConfig.characters.push(c)
    })
    AllConfig.characters.forEach((char) => {
        characterHolder.innerHTML += char.getConfigAvatar();
    });
}

const fileInput = document.getElementById("newportrait");
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
            imageDataUrl = reader.result;
        });
    }
});
