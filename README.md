# Skunk Stats 2020
Skunk Stats rewritten in Vue.js, and made for the 2020 FRC Season.
Check it out at [whostinks.tk](whostinks.tk "Skunk Stats 2020")!

## Features
- Single Page Vue App
- WebAPK support
- jStat Analyses
- Visualizations
- User Accounts
- ELO calculator

## Environment
As Skunk Stats is designed to run on a Raspberry Pi 3B+ running a 64bit Ubuntu Server 18.04, the goal is to keep the app as lightweight as possible. To run within the limitations of the 1GB of RAM and a low-power processor, Skunk Stats threads the processes whenever possible. To this end, the only system processes running are SSH, MySQL, and various security features to keep OS resource use to a minimum.

### Installing the app
While the app is fully functional from the browser window, it can also be installed as an app through WebAPK.
1. Navigate to [whostinks.tk](whostinks.tk "Skunk Stats 2020").
##### Android:
2. Open the browser context menu and select "Add to Home screen".
##### Apple:
2. Open the browser menu and add it as a shortcut to the home screen. 