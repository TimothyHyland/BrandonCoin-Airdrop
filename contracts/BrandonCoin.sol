pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BrandonCoin is ERC20 {
  constructor() ERC20('BrandonCoin', 'BrandonCoin') {
    _mint(msg.sender, 1000000 * 10 ** 18);
  }
}
