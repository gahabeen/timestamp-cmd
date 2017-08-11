# timestamp-cmd
Reveal timestamp ~~misteries~~ readable datetime from the command-line.

## What It Does


```bash
ts 1502056440
# output: Sunday, August 6, 2017 9:20 PM

ts 1502056440 -l fr
#output: dimanche 6 août 2017 21:20

ts 1502056440 -l ru -f LL
#output: 6 августа 2017 г.
```

## How To Use It

```bash
# Simply type ts + the timestamp
ts [timestamp]

# adding language option -l or --lang
ts [timestamp] -l fr
ts [timestamp] --lang fr

# adding formatting option -f or --format
ts [timestamp] -f LLLL
ts [timestamp] --format LLLL

# combining both
ts [timestamp] -l en -f LL
ts [timestamp] --lang en --format LL

```

## Default Settings

- **lang**: en    (english)  
- **format**: LLLL   (for ex with ennglish lang: Sunday, August 6, 2017 11:54 PM)

## Changing Default Settings

```bash

# set default lang with -L or --defaultLang
ts -L fr
ts --defaultLang fr

# set default lang with -F or --defaultFormat
ts -F LLLL
ts --defaultFormat LLLL

# reset to default settings with -R or --resetConfig
ts -R
ts --resetConfig

```

## Documentation

- **lang**: check out [.local() function doc from **momentjs documentation**](https://momentjs.com/docs/#/i18n/changing-locale/)
- **format**: check out [.format() function doc from **momentjs documentation**](https://momentjs.com/docs/#/displaying/format/)

## Roadmap
```bash
# possible updates
- Adding offsets (timezones) handling

# Any other idea? please PR
```

## Changelog
```bash
# version 0.0.1
- Handle any timestamp with -language- and -format- handling
- Settings & Default Settings management
```