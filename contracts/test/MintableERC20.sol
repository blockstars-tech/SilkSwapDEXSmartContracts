// SPDX-License-Identifier: MIT
pragma solidity =0.6.6;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableERC20 is ERC20 {

  constructor(string memory name, string memory symbol, uint8 decimals) ERC20(name, symbol) public {
    _setupDecimals(decimals);
  }

  function mint(uint256 amount) external {
    _mint(msg.sender, amount);
  }

  function mintTo(address user, uint256 amount) external {
    _mint(user, amount);
  }
}
