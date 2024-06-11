# Lady V's Twitch Overlay

## Goal

A twitch overlay for Lady V's D&D streams that shows an interactive plate for viewers of the stream during games.

![Mockup](mockup.png)

* Icon on the stream that can be clicked to open the window
* Contents of the window
  * Name of campaign
  * Link to Summary
    * What's in here? Just text?
  * Link to Character (multiple)
    * Character name
    * Race+class
    * Level
    * Max HP and AC
    * Str, Dex, Con, Wis, Int, Cha

### Stretch Goals

* Genericise it so anyone can use it

# Starting up

## Prepare

* Download and install docker
* Run docker
* Create a twitch extension with:
  * Type: Video overlay
  * Base url: https://localhost/
  * Config url: config.html
  * Overlay url: video_overlay.html
* Download and install OBS (or use your favourite streaming software)

## Testing

* Run `docker-compose up --build`
  * This starts a local web server, with the same address as the Twitch overlay
* Start a stream in your streaming software
  * You need to have a running stream for the overlay to run
* Interact

## Going live

TBD

# Todo

* [x] Basic test of overlay runs
* [ ] Config
  * [ ] Pick a layout
  * [ ] Add characters (portrait, stats, name, player)
* [ ] Display
  * [ ] Portraits show
  * [ ] Clicking portraits cycles through details
* [ ] Code tidying
  * [ ] Character as an Object

# References

* [Example extension using saved config](https://github.com/twitchdev/bot-commander)