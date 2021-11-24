
<p align="center">
<img src =".\pictures\red-2650342_1920.jpg" width="300")
</p> 


## <p align="center"> About SmartCOOP </p>
## <p align="center"> Smart contract based agricultural cooperative </p>


With this project we try to assess possibilities coming out from blockchain world to address some of the most pressing challenges small agricultural producers confront. The project will offer simplified version of market reality which is much more complex and nuanced then presented here. But still we believe this project and presented model have all necessary elements which can allow us to demonstrate some of potentials blockchain technology has to offer to the world of agriculture.


### 1) Problem statement

Small agricultural producers don't have enough capacity to be effectively present on market as individual producer. That is why they have two options on their disposal. First: to organize themselves in traditional cooperatives in order to improve their negotiation position with bigger corporate buyers. Second: sell as individual producers to big corporations under conditions often not so favorable to them. Both solutions have some drawbacks. Big corporation tend to offer price to indidvual producers which is basically less then average season price for raw small fruits and they pay them at the end of season. Additionally, there is a counterparty risk involved. Corporations can delay or entirely avoid their obligation to pay producers which sometimes leads towards legal suits. However, big cooperations are also in much better position to fight legal battles than small, individual producers whose postition is weakend by lack of legal knowledge and financial means. On the other hand if they organize themselves in form of more traditional cooperatives there is counterparty risk of mismanagement of cooperative funds or collected goods, high managing cost for running traditional cooperative and low overall management efficiency often associated with this type of organizational structure.  

### 2) Some of potential benefits of introducing blockchain technology (answering to some challenges and problems)

- Get real time market price on the day of selling and not lowest average season price
- Cut different contraparty risks (corporative and cooperative one)
- Cost effective way to manage cooperative
- Increased number of possible buyers. In the blockchain world you don't need to know or trust buyers or to have already developed relations with them to be able to effectively do business with them. This can drastically increases the number of potential business partners and lowers legal and logistical cost of doing business.


### 3) Project assumption:
The project assumes that Agricultural Cooperative has:
- Fully operational refrigerator storage for small fruits and warehouse
- Person responsible for quality check  
- Beam scale
- For purpose and simplicity of the project we will also assume that cooperative is dealing only with one type of small fruits lets say raspberries

### 4) Graphical representation of user workflow (cooperant/small producer and buyer)

<p align="center">
<img src =".\pictures\Logic@2x.png" width="1000" height="600")
</p> 


## Screencast fir this process -->
<hr>

https://www.youtube.com/watch?v=Y9qr7ybG-lA

<br>

## Installing dependencies  -->
<hr>
<br>

## NPM
<hr>
Check if you already have NPM instaled 
   
    $npm -v

If no:

    $npm install

or

    curl -qL https://www.npmjs.com/install.sh | sh

## NVM
<hr>

Check first if you already have NVM installed:
    
    $nvm -v

To install or update nvm you should run the install script. To do that, you may either download and run the script manually or use the following cURL or Wget command:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

## Node >=6.11.5
<hr>
Cech if you already have Node installed
    
    node -v

If no, use NVM to install Node. NVM allows us to quickly install and use different versions of node via the command line.

Example:

    $ nvm install 12
    Now using node v12.22.6 (npm v6.14.5)
    $ node -v
    v12.22.6

    $ nvm use 16
    Now using node v16.9.1 (npm v7.21.1)

    $ node -v
    v16.9.1 

## Ganche-cli
<hr>

Using npm:

    npm install -g ganache-cli

or, if you are using Yarn:

    yarn global add ganache-cli

Check for a version

    ganache-cli --version

## Python >= 3.6.0 
<hr>
Firs check if you have Pyhton already instaled on your machine:

    $python --version

If no, download and install for you machine adequat python version from https://www.python.org/ and follow the instruction. Ones you install check again from command line for python version


## Brownie
<hr>
Recommanded way to install Brownie is by using pipx

    $python3 -m pip install --user pipx
    $python3 -m pipx ensurepath

You may need to restart your terminal after installing pipx.

Install Brownie with pipx (recommended way)

    $pipx install eth-brownie

Once installation is completed type Brownie to verify that is working:

    $brownie

And you should get something like: 

    Brownie v1.16.3 - Python development framework for Ethereum

    Usage:  brownie <command> [<args>...] [options <args>]

    ...

Or simply:

    $pip install brownie


## OpenZeppelin
<hr>
Please from project root directory use following command:

    $brownie pm install OpenZeppelin/openzeppelin-contracts@4.0.0

<br>

## Chainlink
<hr>
Please from project root directory use following command:

    $brownie pm install smartcontractkit/chainlink-brownie-contracts@0.2.2

## https-localhost over HTTPS (recommended)
<hr>
For running https connection localy

MacOS

    $brew install nss

Linux

    $sudo apt install libnss3-tools
-or-

    $sudo yum install nss-tools

-or-

    $sudo pacman -S nss

Linux
Recommendet: Install and use standalone

    $npm i -g --only=prod https-localhost

From front-end directory inside project root directory run:

    $sudo su
    $ serve .

And then from browser:

    https://localhost

Or over HTTP connection
<hr>

    $python3 -m http.server

And then from browser:

    http://localhost:8000

### Address for accessing front-end for SmartCOOP -->
<hr>

https://ilijapet.github.io/coop_predpremijera/client/


### My public ETH address for certification as an NFT 
<hr>
0xBba4256C9dba48281B71610F30E18c4DeD73B2F3

<br>

<br>
<br>
<br>
Step by step guide for dapp usage
<hr>
