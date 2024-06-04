class Character {
    #stats = {};
    #name = {};
    #portrait = {};
    #player = {};

    constructor() {
        this.#stats = "";
        this.#name = "";
        this.#player = "";
        this.#portrait = "";
    }

    setAll(name, stats, player, portrait) {
        this.#stats = stats;
        this.#name = name;
        this.#player = player;
        this.#portrait = portrait;
        return this
    }

    setFromElement(element) {
        this.#stats = element.querySelector('.stats').innerHTML,
        this.#name = element.querySelector('.name').innerHTML,
        this.#player = element.querySelector('.player').innerHTML,
        this.#portrait = element.querySelector('.portrait').style.backgroundImage
        return this
    }

    getStats() {
        return this.#stats;
    }
    setStats(stat) {
        this.#stats = stat;
        return this;
    }
    getName() {
        return this.#name;
    }
    setName(myname) {
        this.#name = myname;
        return this;
    }
    getPortrait() {
        return this.#portrait;
    }
    setPortrait(port) {
        this.#portrait = port;
        return this;
    }
    getPlayer() {
        return this.#player;
    }
    setPlayer(play) {
        this.#player = play;
        return this;
    }
    getConfigAvatar() {
        return `<div style="display: inline-block;padding-right: 10px;">${this.getDisplayAvatar()}<br /><button class="edit">Edit</button><button class="delete">Delete</button></div>`
    }
    getDisplayAvatar() {
        return `<div class="portrait" style="background: url(${this.#portrait}) no-repeat center #eee;background-size: contain;height: 200px; width: 150px;overflow-y:scroll;"><div class="player">${this.#player}</div><div class="stats">${this.#stats}</div><div class="name">${this.#name}</div></div>`;
    }
    getSaveRepresentation() {
        return JSON.stringify({
            stats: this.#stats,
            name: this.#name,
            player: this.#player,
            portrait: this.#portrait
        });
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
        var returning =  `{"characters": `;
        var chars = [];
        AllConfig.characters.forEach((e) => {
            console.log(e);
            chars.push(e.getSaveRepresentation())
        })
        returning += JSON.stringify(chars) + "}";
        console.log(returning)
        return returning;
    }

}
var AllConfig = new AllConfigClass()