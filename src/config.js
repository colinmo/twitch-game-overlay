class Character {
    stats = {};
    name = {};
    class = {};
    race = {}
    level = {}
    maxhp = {}
    ac = {}

    constructor() {
        this.stats = { "str": 0, "dex": 0, "con": 0, "wis": 0, "int": 0, "cha": 0 };
        this.name = "";
        this.class = "";
        this.race = "";
        this.level = "";
        this.maxhp = "";
        this.ac = "";
    }

    setAll(stats, name, nclass, race, level, maxhp, ac) {
        this.stats = stats;
        this.name = name;
        this.class = nclass;
        this.race = race;
        this.level = level;
        this.maxhp = maxhp;
        this.ac = ac;
        return this
    }

    setFromElement(element) {
        this.stats = {
            "str": element.querySelector('.str').value,
            "dex": element.querySelector('.dex').value,
            "con": element.querySelector('.con').value,
            "wis": element.querySelector('.wis').value,
            "int": element.querySelector('.int').value,
            "cha": element.querySelector('.cha').value,
        };
        this.name = element.querySelector('.name').value;
        this.class = element.querySelector('.class').value;
        this.race = element.querySelector('.race').value;
        this.level = element.querySelector('.level').value;
        this.maxhp = element.querySelector('.maxhp').value;
        this.ac = element.querySelector('.ac').value;
        return this
    }

    setFromObject(obj) {
        this.stats = obj.stats;
        this.name = obj.name;
        this.class = obj.class;
        this.race = obj.race;
        this.level = obj.level;
        this.maxhp = obj.maxhp;
        this.ac = obj.ac;
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
    getClass() {
        return this.class;
    }
    setClass(value) {
        this.class = value;
        return this;
    }
    getRace() {
        return this.race;
    }
    setRace(value) {
        this.race = value;
        return this;
    }
    getLevel() {
        return this.level;
    }
    setLevel(value) {
        this.level = value;
        return this;
    }
    getMaxhp() {
        return this.maxhp;
    }
    setMaxhp(value) {
        this.maxhp = value;
        return this;
    }
    getAc() {
        return this.ac;
    }
    setAc(value) {
        this.ac = value;
        return this;
    }
    getSaveRepresentation() {
        return JSON.stringify(this);
    }

    getConfigAvatar() {
        console.log(this);
        return `<div id="acharacter">
        <div class="chartitle">${this.name}</div>
        <div class="charmeta">${this.race} ${this.class}</div>
        <div class="charlevel">level ${this.level}</div>
        <div class="charhp">HP ${this.maxhp}</div>
        <div class="charac">AC ${this.ac}</div>
        <div class="charstr">Str ${this.stats.str}</div>
        <div class="chardex">Dex ${this.stats.dex}</div>
        <div class="charcon">Con ${this.stats.con}</div>
        <div class="charwis">Wis ${this.stats.wis}</div>
        <div class="charint">Int ${this.stats.int}</div>
        <div class="charcha">Cha ${this.stats.cha}</div></div>`;
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
    campaign = ""
    summary = ""
    icon = "";
    toString() {
        var returning = `{"characters": `;
        var chars = [];
        AllConfig.characters.forEach((e) => {
            chars.push(e)
        })
        return JSON.stringify({ "campaign": this.campaign, "summary": this.summary, "characters": AllConfig.characters });
    }

}
var AllConfig = new AllConfigClass()

var editingIndex = -1;
const characterHolder = document.getElementById("characters");
var imageDataUrl = "";

document.getElementById("save").addEventListener('click', (e) => {
    e.preventDefault()
    char = new Character()
    char.setFromElement(document.getElementById("character-edit"));
    if (editingIndex == -1) {
        // Add
        characterHolder.innerHTML += `<div class="display-screen">${char.getConfigAvatar()}</div>`;
    } else {
        // Edit
        document.querySelector(`#characters div:nth-child(${editingIndex})`).innerHTML = char.getConfigAvatar();
    }
});

function deleteMe(e) {
    e.preventDefault()
    if (window.confirm("Really delete?")) {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
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
    AllConfig.campaign = data.campaign
    AllConfig.summary = data.summary
    AllConfig.icon = data.icon
}

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
