// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


pragma solidity ^0.8.0;


contract Coop is Ownable {
   
    // COOPToken private coopToken;
    ERC20 private coopToken;

    // address public owner;  
    address public coopTokenContractAddress;  
        
    struct Cooperant {
        uint256 feePayed;
        uint256 kg;
    } 
    
    // map of cooperant addresses to structs
    mapping (address => Cooperant) private cooperants;      
        
    constructor (address contractAddress) {
       coopTokenContractAddress = contractAddress;
       coopToken = ERC20(contractAddress);
    } 

    event MakeTransfer (address sender, uint256 amount);
    event Deposit (address cooperant, uint256 kilograms);
    event MembershipStatus (address member, string message);  
   
    modifier onlyMembers() {
        require (cooperants[msg.sender].feePayed != 0, "Please become SmartCOOP member");
        _;
    }

    modifier onlyNewMembers () {
        require(cooperants[msg.sender].feePayed == 0, "You already pay mebership fee");
        _;
    }

    // WIDROW FUNCTION
    function withdraw(uint _amount) public payable onlyOwner {
        payable(owner()).transfer(_amount);
    }
    

    function fundCoop() public payable onlyNewMembers returns (bool) {        
        cooperants[msg.sender].feePayed += msg.value;
        emit MakeTransfer(msg.sender, msg.value); 
        return true;        
    }      

    function depositFruitsToCOOP(uint256 _kg) public onlyMembers returns (bool) {       
        cooperants[msg.sender].kg += _kg;
        coopTokenTransferTo(_kg*(10**18));  
        emit Deposit (msg.sender, _kg);
        return true;          
    }    
    
    function getUserAccountBalance(address _salje) public view returns (uint256, uint256, uint256) {
        return (cooperants[_salje].feePayed, cooperants[_salje].kg, coopToken.balanceOf(_salje)/(10**18));
    }
    
    function coopTokenTransferTo (uint256 _kg) private returns (bool) {        
        return coopToken.transfer(owner(), msg.sender, _kg);
    }      
    
    function coopTokenTransferFrom (uint256 _kg) private returns (bool) {        
        return coopToken.transfer(msg.sender, owner(), _kg);
    }      
}