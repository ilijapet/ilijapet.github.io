// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract COOPToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("COOP Token", "COOP") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    modifier onlyRole() {
        require(hasRole(MINTER_ROLE, msg.sender));
        _;
    }

    function mint(address to, uint256 amount) public onlyRole returns (bool) {
        _mint(to, amount);
        return true;
    }
}
