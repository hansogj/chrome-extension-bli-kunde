# Jukselapp for å sette predefinerte verdier til Bli-Kunde-skjema


## Installasjon
Åpne [chrome://extensions](chrome://extensions) i chrome-nettleseren, huk av for developer mode, trykk på _Load unpacked extension_
og angi path til denne katalogen (_./chrome-extensions-bli-kunde_).


### Definer din bruker

Gå til utviklerverktøy / console og skriv eks

```javascript

var user = {
    fornavn: "Jan",
    etternavn: "Banan",
    epost: "banana@jan.no",
    mobil: 99887766,
    fnr: "05050599887"
    };

eika.setUser(user)

```

Dette vil lagre en bruker i din localStorage og setter feltene i Bli-Kunde-skjemaet.
Neste gang du kommer til tomt skjema (feks etter session timeout) kjører du bare:

```javascript
eika.autoPhill()
```

Da fylles feltene på personalia-siden ut med angitte data, samt at AHV-skjema fylles ut med solskinnsdata.
Hvis du i tillegg angir _true_ som parameter til _autoPhil_-funksjonen, vil du automatisk submitte
skjemaet og sendes videre til neste side.


### Hent eksisternede brukerprofil
```javascript
eika.getUser()
```
returnerer den brukeren du har lagret i localStorage så du kan endre på denne før du lagrer igjen med _setUser_.


##Discalaimer

Hva gjelder AHV-skjemaet fylles det med solskinns-data for å få deg som bruker raskest mulig gjennom skjemaet.
