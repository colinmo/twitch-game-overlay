
// A Character, expressed as an Object
class Character {
    stats = {};
    name = {};
    class = {};
    race = {};
    level = {};
    maxhp = {};
    ac = {};

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
        return this;
    }

    setFromElement(element) {
        this.stats = {
            "str": element.querySelector('.str').value || element.querySelector('.str').dataset.value,
            "dex": element.querySelector('.dex').value || element.querySelector('.dex').dataset.value,
            "con": element.querySelector('.con').value || element.querySelector('.con').dataset.value,
            "wis": element.querySelector('.wis').value || element.querySelector('.wis').dataset.value,
            "int": element.querySelector('.int').value || element.querySelector('.int').dataset.value,
            "cha": element.querySelector('.cha').value || element.querySelector('.cha').dataset.value,
        };
        this.name = element.querySelector('.name').value || element.querySelector('.name').dataset.value;
        this.class = element.querySelector('.class').value || element.querySelector('.class').dataset.value;
        this.race = element.querySelector('.race').value || element.querySelector('.race').dataset.value;
        this.level = element.querySelector('.level').value || element.querySelector('.level').dataset.value;
        this.maxhp = element.querySelector('.maxhp').value || element.querySelector('.maxhp').dataset.value;
        this.ac = element.querySelector('.ac').value || element.querySelector('.ac').dataset.value;
        return this;
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
        return `<div class="acharacter">
        <label for="showscreen">&#x27A6;</label>
        <label for="showwindow">&#x2718;</label>
        <div class="name" data-value="${this.name}">${this.name}</div>
        <div class="meta"><span class="race" data-value="${this.race}">${this.race}</span>
        <span class="class" data-value="${this.class}">${this.class}</span></div>
        <div class="level" data-value="${this.level}">level ${this.level}</div>
        <div class="maxhp" data-value="${this.maxhp}">HP ${this.maxhp}</div>
        <div class="ac" data-value="${this.ac}">AC ${this.ac}</div>
        <div class="str" data-value="${this.stats.str}">Str ${this.stats.str}</div>
        <div class="dex" data-value="${this.stats.dex}">Dex ${this.stats.dex}</div>
        <div class="con" data-value="${this.stats.con}">Con ${this.stats.con}</div>
        <div class="wis" data-value="${this.stats.wis}">Wis ${this.stats.wis}</div>
        <div class="int" data-value="${this.stats.int}">Int ${this.stats.int}</div>
        <div class="cha" data-value="${this.stats.cha}">Cha ${this.stats.cha}</div></div>`;
    }
}

// All configuration (characters and campaign/summary) expressed as an Object
class AllConfigClass {
    characters = [];
    campaign = "";
    summary = "";
    toString() {
        var returning = `{"characters": `;
        var chars = [];
        AllConfig.characters.forEach((e) => {
            chars.push(e);
        });
        return JSON.stringify({ "campaign": this.campaign, "summary": this.summary, "characters": AllConfig.characters });
    }
    fromObject(object) {
        this.campaign = object.campaign;
        this.summary = object.summary;
        this.characters = [];
        object.characters.forEach((e) => {
            var char = new Character;
            char.setFromObject(e);
            this.characters.push(char);
        });
    }
}
var AllConfig = new AllConfigClass();
const characterHolder= document.getElementById("characters");

// Convert the Twitch config string into the AllConfig JSON object
async function getConfigLoaded() {
    var broadcaster_config = window.Twitch.ext.configuration.broadcaster;
    if (broadcaster_config && broadcaster_config.content) {
        try {
            data = JSON.parse(broadcaster_config.content);
            // we have broadcaster config loaded and parsed it to JSON
        } catch (e) {
        }
    }
    AllConfig.characters = [];
    data.characters.forEach((e) => {
        const c = new Character();
        c.setFromObject(e);
        AllConfig.characters.push(c);
    });
    
    AllConfig.campaign = data.campaign;
    AllConfig.summary = data.summary;
    readyToGo(data);
}

window.Twitch.ext.configuration.onChanged(() => {
    console.log("Changed");
    getConfigLoaded();
});