# Jukselapp for å sette predefinerte verdier til bli kunde skjema


## Installasjon
Åpne [chrome://extensions](chrome://extensions) i chrome-nettleseren, huk av for developer mode, trykk på _Load unpacked extension_
og angi denne katalogen _./bli-kunde_


### Definer din bruker

Gå til utviklerverktøy / console og skriv eks

```javascript
var user = {fornavn: "Jan", etternavn: "Banan", epost: "banana@jan.no", mobil: 99887766, fnr: "05050599887"}
eika.setUser(user)

```

dette lagrer en bruker i din localStorage og setter feltene i bli-kunde-skjemaet. Neste gang du kommer til tomt skjema (feks etter session timeout)
kjører du bare

```javascript
eika.autoPhill()
```

så fylles feltene ut med samme data. Hvis du i tillegg angir _true_ som parameter til _autoPhil_-finksjonen, vil du automatisk submitte
skjemaet og sendes videre til neste side. # Dillinger


### Hent eksisternede brukerprofil
```javascript
eika.getUser()
```
returnerer den brukeren du har lagret i localStorage så du kan endre på denne før du lagrer igjen


##Discalaimer

Hva gjelder AHV-skjemaet fylles det med solskinns-data for å få deg som bruker raskest mulig gjennom skjemaet.
