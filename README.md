### [Subtitle Resync](https://github.com/warren-bank/subtitle-resync)

Offline client-side tool to shift the subtitles in an .srt file by a fixed time offset

#### Motivation:

* very often downloaded subtitles are out of sync by more than a minute
* sometimes it's just easier to modify the SRT file, than to fight with the video player
  * Kodi only allows to offset by 60 seconds in either direction
  * VLC doesn't set any limit on the offset, but the value is incremented in 100ms steps
  * MX Player is just bad..

#### Comments:

* there are plenty of tools online that perform the same function
  * none are open-source
  * they all send the SRT file contents to a backend server to do the work
    * why?

* [searching github](https://github.com/search?l=JavaScript&q=subtitle+resync&type=Repositories) for an existing client-side only solution yielded very little
  * ["subtitle-resync" by _harryi3t_](https://github.com/harryi3t/subtitle-resync) looked promising, but it actually requires a node server on the backend
    * ..so what's the point of hosting the [frontend on Github Pages](https://harryi3t.github.io/subtitle-resync/)?
  * ["subber" by _lionelB_](https://github.com/lionelB/subber) is a command-line tool for node
    * clean, simple
    * MIT license
    * I forked his work..
      * excellent starting point
      * made a few changes

* this little utility was thrown together quickly
  * it's not fancy
    * there is no JS framework
    * the CSS is barebones
  * it works
    * it's completely static
    * it's hosted on [Github Pages](https://warren-bank.github.io/subtitle-resync/)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
