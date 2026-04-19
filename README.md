# Backend för laboration 2 - Dokumentation om API

## https://lab2-workexperience.onrender.com/

## Installation av databas
MySQL används för databasen och denna kan klonas och köras genom att köra npm install för att få paketen som krävs.
Installationsskriptet heter sql.js och skapar en tabell:
| Tabellnamn  |  Fält | 
|---|---|
|  workexperience | **id**(serial), **companyname**(varchar(100), **jobtitle**(varchar(100)), **jobLocation**(varchar(30)), **enddate**(date), **startdate**(date), **description**(varchar(500))  |


## Användning av API

APIt kan användas med hjälp av fetch och stödjer för nuvarande nedan:

| Metod   | Ändpunkt  | Beskrivning  |
|---|---|---|
| GET | /api//workexperience/  |  Hämtar samtliga poster |
|  GET | /api//workexperience/:id  | Hämtar post utefter ID som parameter  |
|  POST | /api//workexperience/  | Skapar ny post. Kräver att samtliga fält är ifyllda (se kod)  |
|  PUT |  /api//workexperience/:id | Uppdaterar existerande post med ID som parameter. Samma krav som POST, objekt måste skickas med.  |
|  DELETE    | /api//workexperience/:id    | Raderar kurs utefter ID som parameter. |


GET returnerar denna struktur i JSON:

```
{
    "id": 25,
    "companyname": "Hemsökning AB",
    "jobtitle": "Poltergeist",
    "jobLocation": "Övergivna Fabriken",
    "startdate": "2016-03-19T00:00:00.000Z",
    "enddate": "2019-03-31T00:00:00.000Z",
    "description": "Slängde i dörrar, skakade i kedjor och sprang runt i vita lakan.\nRev ibland ned skåp i fall besökare kom alldeles för nära."
  },
```
