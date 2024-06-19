

document.addEventListener("DOMContentLoaded", (event) => {
});

function updateInfo(target, contentType, message) {
    console.log("New info!", message);
    if (document.getElementById("campname") != null) {
        data = JSON.parse(message);
        AllConfig.fromObject(data);
        readyToGo(data);
        document.getElementById("showscreen").checked = true;
    }
}

function readyToGo(data) {
    document.getElementById("campname").innerText = data.campaign;
    document.getElementById("campsummary").innerText = data.summary;
    list = document.getElementById("campcharacters");
    list.innerHTML = "";
    characterHolder.innerHTML = "";
    index = 0;
    AllConfig.characters.forEach((char) => {
        index++;
        list.innerHTML += `<li><label for="character-${index}">${char.getName()}</label></li>`;
        characterHolder.innerHTML += `<input type="radio" id="character-${index}" name="showcreen" value="${index}">` + char.getConfigAvatar();
    });
}


//Listen for updates
document.addEventListener("DOMContentLoaded", (event) => {
    if (document.getElementById('showscreen')) {
        document.getElementById('showscreen').checked = true;
    }
});
Twitch.ext.onAuthorized(() => {
    console.log("Founded");
    window.Twitch.ext.listen("broadcast", updateInfo);
});