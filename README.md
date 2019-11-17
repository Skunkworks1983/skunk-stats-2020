# Skunk Stats 2020
Skunk Stats rewritten in Vue.js, and made for the 2020 FRC Season.

## Updates
- Single Page Application via Vue.js 
- New Analyses
- Password Logins (Passport + bcrypt)
- ELO calculator
- Alliance Comparisions
- jStat Implementation

## Environment
As Skunk Stats is designed to run on a Raspberry Pi 3B+ running a 64bit Ubuntu Server 18.04, the goal is to keep the app as lightweight as possible. To run within the limitations of the 1GB of RAM and a low-power processor, Skunk Stats threads the processes whenever possible. To this end, the only system processes running are SSH, MySQL, and various security features to keep OS resource use to a minimum.

## Security Features
- Rate Limiting
- Passport auth
- Bcrypt hashing
- Session tokens