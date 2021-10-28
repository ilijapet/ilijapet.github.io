from brownie import accounts, network, config


LOCAL_BLOCKCHAINE_ENVIROMENT = [
    "development",
    "ganache",
    "hardhat",
    "local-ganache",
    "mainnet-fork",
    "kovan"
]

def get_account (index=None, id=None):
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAINE_ENVIROMENT:
        print(accounts[0].balance())
        return accounts[0]
    if id:
        return accounts.load(id)
    if network.show_active() in config["networks"]:
        return accounts.add(config["wallets"]["from_key"])
    return None