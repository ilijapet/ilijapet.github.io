// SPDX-License-Identifier: MIT

/**
    @title SmartCOOP 
    @notice COOP token is based on the OpenZeppelin ERC-20 token standard as defined at ->
            https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20
            
            Ownable is definied on following OpenZeppelin address ->
            https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/
 */

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SmartCOOP is Pausable, Ownable {
    /* State variables
     */

    ERC20 private coopToken;
    AggregatorV3Interface internal priceFeed;
    uint256 public raspberryPrice = 9;
    address[] public members;
    address[] public warehouseStock;

    struct Cooperant {
        uint256 feePayed;
        uint256 kg;
    }

    struct Bidder {
        uint256 totalPayed;
        uint256 kgBought;
    }

    mapping(address => Cooperant) public cooperants;
    mapping(address => Bidder) public bidders;

    constructor(address contractAddress, address chainlinkPrice) {
        coopToken = ERC20(contractAddress);
        priceFeed = AggregatorV3Interface(chainlinkPrice);
    }

    /* Events
     */

    event NewMember(address sender, uint256 amount);
    event DepositFruits(address cooperant, uint256 kilograms);
    event TransferMade(
        string messageToProducer,
        uint256 inEthProducer,
        string messageToCoop,
        uint256 inEthCoop
    );
    event NotEnoughGoods(string message);
    event ToContract(address sender, uint256 amount);

    /* Modifiers
     */

    modifier onlyMembers() {
        require(
            cooperants[msg.sender].feePayed != 0,
            "Please become SmartCOOP member"
        );
        _;
    }

    modifier onlyNewMembers() {
        require(
            cooperants[msg.sender].feePayed == 0,
            "You already pay mebership fee"
        );
        _;
    }

    modifier minimumFee() {
        require(msg.value >= 1000, "Yearly fee is minimum 1000 wei");
        _;
    }

    /* Functions
     */
    function becomeCoopMember()
        public
        payable
        whenNotPaused
        onlyNewMembers
        minimumFee
        returns (bool)
    {
        cooperants[msg.sender].feePayed += msg.value;
        members.push(msg.sender);
        emit NewMember(msg.sender, msg.value);
        return true;
    }

    function depositFruitsToCOOP(uint256 _kg)
        public
        whenNotPaused
        onlyMembers
        returns (bool)
    {
        cooperants[msg.sender].kg += _kg;
        warehouseStock.push(msg.sender);
        coopTokenTransferTo(msg.sender, _kg * (10**18));
        emit DepositFruits(msg.sender, _kg);
        return true;
    }

    function bid(uint256 _amount) public payable whenNotPaused returns (bool) {
        for (
            uint256 warehouseStockIndex = 0;
            warehouseStockIndex < warehouseStock.length;
            warehouseStockIndex++
        ) {
            address inStockCooperantAddress = warehouseStock[
                warehouseStockIndex
            ];
            if (cooperants[inStockCooperantAddress].kg <= _amount) {
                uint256 totalPrice = cooperants[inStockCooperantAddress].kg *
                    raspberryPrice;
                uint256 priceInWeiProducer = (ethUSD(totalPrice) / 100) * 95;
                uint256 priceInWeiCOOP = (ethUSD(totalPrice) / 100) * 5;

                (bool sentProducer, ) = inStockCooperantAddress.call{
                    value: priceInWeiProducer
                }("");
                require(sentProducer, "Failed to send Ether");
                delete warehouseStock[warehouseStockIndex];
                _amount -= cooperants[inStockCooperantAddress].kg;
                bidders[msg.sender].totalPayed += totalPrice;
                bidders[msg.sender].kgBought += cooperants[
                    inStockCooperantAddress
                ].kg;
                cooperants[inStockCooperantAddress].kg = 0;
                emit TransferMade(
                    "To your account was transfered",
                    priceInWeiProducer,
                    "And on COOP account",
                    priceInWeiCOOP
                );
            } else if (cooperants[inStockCooperantAddress].kg >= _amount) {
                cooperants[inStockCooperantAddress].kg -= _amount;
                uint256 totalPrice = _amount * raspberryPrice;
                uint256 priceInWeiProducer = (ethUSD(totalPrice) / 100) * 95;
                uint256 priceInWeiCOOP = (ethUSD(totalPrice) / 100) * 5;
                bidders[msg.sender].kgBought += _amount;
                bidders[msg.sender].totalPayed += totalPrice;

                (bool sentProducer, ) = inStockCooperantAddress.call{
                    value: priceInWeiProducer
                }("");
                require(sentProducer, "Failed to send Ether");
                emit TransferMade(
                    "To your account was transfered",
                    priceInWeiProducer,
                    "And on COOP account",
                    priceInWeiCOOP
                );
            } else {
                emit NotEnoughGoods(
                    "There si no enough raspberries in warhouse"
                );
            }
        }
        return true;
    }

    function coopTokenTransferTo(address receiver, uint256 _kg)
        public
        returns (bool)
    {
        return coopToken.transfer(receiver, _kg);
    }

    // Withdraw function
    function withdraw() public onlyOwner returns (bool) {
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        return true;
    }

    function getUserAccountBalance(address _salje)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            cooperants[_salje].feePayed,
            cooperants[_salje].kg,
            coopToken.balanceOf(_salje) / (10**18)
        );
    }

    function getBidderAccountBalance(address _salje)
        public
        view
        returns (uint256, uint256)
    {
        return (bidders[_salje].totalPayed, bidders[_salje].kgBought);
    }

    // Function to receive Ether to SmartCOOP contract account
    receive() external payable {
        emit ToContract(msg.sender, msg.value);
    }

    // It will be executed when a function that does not exist is called
    fallback() external {
        revert();
    }

    // Pause possbility function to be executed
    function pause() public onlyOwner {
        _pause();
    }

    // Upause possbility function to be executed
    function unpause() public onlyOwner {
        _unpause();
    }

    // Chainlink price feed for ETH/USD
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    //Convert amount for goods in USD to wei values
    function ethUSD(uint256 _amount) public view returns (uint256) {
        uint256 denominator = uint256(getLatestPrice());
        uint256 ethInUsdAmount = ((_amount * 1000000000000000000000) /
            denominator) * 100000;
        return ethInUsdAmount;
    }
}
