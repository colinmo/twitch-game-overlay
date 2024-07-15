AllConfig.characters = [];
var test1 = new Character();
test1.setAll(
    { "str": 3, "dex": 90, "con": 5, "wis": 1, "int": 70, "cha": 0 },
    "Wick",
    "Pew Pew",
    "Hot Lady",
    "1",
    3,
    5)
AllConfig.characters.push(test1);
AllConfig.campaign = "?";
AllConfig.summary = "?"
var smerk = {
    campaign: "?",
    summary: "??",
}
readyToGo(smerk)