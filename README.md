# SilkSwap API Documentation

## Overview

This API documentation presents the procedures for interfacing with the deployed UniswapV2 contracts on the Bahamut blockchain. It facilitates the retrieval of prices and liquidity data for pairs. Each pair within Uniswap is underpinned by a liquidity pool, which operates through smart contracts. These contracts manage balances of two distinct tokens and enforce rules governing their deposit and withdrawal. The primary rule is the constant product formula, ensuring that upon token withdrawal (purchase), a proportional amount must be deposited (sold) to maintain equilibrium. The price at which a swap is executed is ultimately determined by the proportion of tokens in the pool, coupled with the constant product formula.

## Blockchain Details

- Blockchain Name: Bahamut
- Chain ID: 5165
- BAHAMUT_URL: [https://rpc1.sahara.bahamutchain.com]

## Smart Contracts

- **UniswapV2 Factory Address:** `0xd0C5d23290d63E06a0c4B87F14bD2F7aA551a895`
- **UniswapV2 Router Address:** `0xF660558a4757Fb5953d269FF32E228Ae3d5f6c68`

### Read Functions

Within the `UniswapV2Factory` and `UniswapV2Router02` contracts, numerous read functions enable the retrieval of information from the Uniswap decentralized exchange. Here's an elucidation of key read functions in these contracts:

# UniswapV2Factory

## 1. allPairs

### Function Signature
```Solidity
// Solidity
function allPairs(uint256 index) external view returns (address pair)
```
### Description:
Retrieves the address of the pair contract corresponding to the specified index.
### Arguments:
index: The index of the pair contract to retrieve.
### Returns:
pair: The address of the pair contract at the specified index.
### Example:
```Solidity
// Solidity
uint256 pairIndex = 0; // Index of the pair contract to retrieve
address pairAddress = factory.allPairs(pairIndex);

// JavaScript
const pairIndex = 0; // Index of the pair contract to retrieve
const pairAddress = await factory.allPairs(pairIndex);
console.log('Pair Address:', pairAddress);
```

## 2. getPair
### Function Signature:
```Solidity
// Solidity
function getPair(address tokenA, address tokenB) external view returns (address pair)
```
### Description:
Retrieves the address of the pair contract corresponding to the specified pair of tokens.
### Arguments:
tokenA: The address of the first token in the pair.
tokenB: The address of the second token in the pair.
### Returns:
pair: The address of the pair contract for the specified tokens.
### Example:
```Solidity
// Solidity
address tokenA = address(tokenAContract); // Address of tokenA
address tokenB = address(tokenBContract); // Address of tokenB
address pairAddress = factory.getPair(tokenA, tokenB);

// JavaScript:
const tokenA = tokenAContract.address; // Address of tokenA
const tokenB = tokenBContract.address; // Address of tokenB
const pairAddress = await factory.getPair(tokenA, tokenB);
console.log('Pair Address:', pairAddress);
```

# UniswapV2Router02

## 1. getAmountIn

### Function Signature

```Solidity
// Solidity
function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) public view returns (uint256 amountIn)
```
### Description:
Calculates the requisite input tokens to obtain a specified amount of output tokens in a swap. This function is integral to Uniswap's mathematical formulas for determining swap amounts based on liquidity pool reserves.
### Arguments:
amountOut: Desired amount of output tokens.
reserveIn: Current reserve of input tokens in the liquidity pool.
reserveOut: Current reserve of output tokens in the liquidity pool.
### Returns:
amountIn: Required input amount to achieve the desired output amount.
### Example:
```Solidity
// Solidity
uint256 amountOut = 500; // Desired output amount of tokenB
uint256 reserveIn = 1000; // Current reserve of tokenA in the liquidity pool
uint256 reserveOut = 2000; // Current reserve of tokenB in the liquidity pool
uint256 amountIn = router.getAmountIn(amountOut, reserveIn, reserveOut);

// javascript
const amountOut = 500; // Desired output amount of tokenB
const reserveIn = 1000; // Current reserve of tokenA in the liquidity pool
const reserveOut = 2000; // Current reserve of tokenB in the liquidity pool
const amountIn = await router.getAmountIn(amountOut, reserveIn, reserveOut);
console.log('Input Amount:', amountIn);
```

## 2. getAmountOut
### Function Signature:
```Solidity
// Solidity
function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public view returns (uint256 amountOut)
```
### Description:
Calculates the amount of output tokens received for a given amount of input tokens in a swap. This function is part of Uniswap's mathematical formulas for determining swap amounts based on liquidity pool reserves.
### Arguments:
amountIn: Amount of input tokens to be swapped.
reserveIn: Current reserve of input tokens in the liquidity pool.
reserveOut: Current reserve of output tokens in the liquidity pool.
### Returns:
amountOut: Calculated amount of output tokens received in the swap.
### Example:
```Solidity
// Solidity
uint256 amountIn = 1000; // 1000 tokens to be swapped
uint256 reserveIn = 1500; // Current reserve of tokenA in the liquidity pool
uint256 reserveOut = 3000; // Current reserve of tokenB in the liquidity pool
uint256 amountOut = router.getAmountOut(amountIn, reserveIn, reserveOut);

// JavaScript
const amountIn = 1000; // 1000 tokens to be swapped
const reserveIn = 1500; // Current reserve of tokenA in the liquidity pool
const reserveOut = 3000; // Current reserve of tokenB in the liquidity pool 
const amountOut = await router.getAmountOut(amountIn, reserveIn, reserveOut);
console.log('Output Amount:', amountOut);
```

## 3. getAmountsIn
### Function Signature
```Solidity
// Solidity
function getAmountsIn(uint256 amountOut, address[] memory path) public view returns (uint256[] memory amounts)
```
### Description:
Calculates the input tokens required to receive a specified amount of output tokens along the specified path of tokens. It returns an array of input amounts.
### Arguments:
amountOut: Desired amount of output tokens.
path: Array of token addresses representing the swap path. It must start with the input token and end with the output token.
### Returns:
amounts: Array of input amounts. The first element in this array is the required input amount.
### Example:
```Solidity
// Solidity
uint256 amountOut = 500; // Desired output amount of tokenB
address[] memory path = new address[](2);
path[0] = address(tokenA); // Address of tokenA
path[1] = address(tokenB); // Address of tokenB
uint256[] memory amountsIn = router.getAmountsIn(amountOut, path);

// JavaScript
const amountsIn = await router.getAmountsIn(amountOut, [tokenAddressA, tokenAddressB]);
console.log('Input Amounts:', amountsIn);
```

## 4. getAmountsOut

### Function Signature
```Solidity
// Solidity
function getAmountsOut(uint256 amountIn, address[] memory path) public view returns (uint256[] memory amounts)
```
### Description:
Calculates the output tokens received for a given input amount of input tokens along the specified path of tokens. It returns an array of output amounts.
### Arguments:
amountIn: Amount of input tokens to be swapped.
path: Array of token addresses representing the swap path.
### Returns:
amounts: Array of output amounts. The last element in this array is the desired output amount.
### Example:
```Solidity
// Solidity
uint256 amountIn = 1000; // 1000 tokens to be swapped
address[] memory path = new address[](2);
path[0] = address(tokenA); // Address of tokenA
path[1] = address(tokenB); // Address of tokenB
uint256[] memory amountsOut = router.getAmountsOut(amountIn, path);

// JavaScript
const amountsOut = await router.getAmountsOut(amountIn, [tokenAddressA, tokenAddressB]);
console.log('Output Amounts:', amountsOut);
```

## 5. swapExactTokensForTokens
### Function Signature
```Solidity
// Solidity
function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts)
```
### Description:
Executes a swap of an exact amount of input tokens for a minimum amount of output tokens along a specified path, ensuring that the received output amount meets the specified minimum.
### Arguments:
amountIn: Exact amount of input tokens to be swapped.
amountOutMin: Minimum acceptable amount of output tokens.
path: Array of token addresses representing the swap path.
to: Recipient address to receive the output tokens.
deadline: Timestamp deadline for execution.
### Returns:
amounts: Array of output amounts representing the amounts of tokens received for each swap in the path.
### Example:
```Solidity
// Solidity
uint256 amountIn = 1000; // Exact amount of input tokens to be swapped
uint256 amountOutMin = 450; // Minimum acceptable amount of output tokens
address[] memory path = new address[](2);
path[0] = address(tokenA); // Address of tokenA (input token)
path[1] = address(tokenB); // Address of tokenB (output token)
address to = address(swapRecipient); // Recipient address
uint256 deadline = block.timestamp + 3600; // Deadline timestamp (1 hour from now)
uint256[] memory amounts = router.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);

// JavaScript
const amounts = await router.swapExactTokensForTokens(amountIn, amountOutMin, [tokenAddressA, tokenAddressB], swapRecipientAddress, deadline);
console.log('Received Amounts:', amounts);
```

## 6. swapTokensForExactTokens
### Function Signature
```Solidity
// Solidity
function swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts)
```
### Description:
Executes a swap of tokens to receive an exact amount of output tokens, with the maximum acceptable input tokens, ensuring that the input tokens spent do not exceed a specified maximum amount.
### Arguments:
amountOut: Exact amount of output tokens desired.
amountInMax: Maximum acceptable amount of input tokens.
path: Array of token addresses representing the swap path.
to: Recipient address to receive the output tokens.
deadline: Timestamp deadline for execution.
### Returns:
amounts: Array of output amounts representing the amounts of tokens received for each swap in the path.
### Example:
```Solidity
// Solidity
uint256 amountOut = 500; // Exact amount of output tokens desired
uint256 amountInMax = 1200; // Maximum acceptable amount of input tokens
address[] memory path = new address[](2);
path[0] = address(tokenA); // Address of tokenA (input token)
path[1] = address(tokenB); // Address of tokenB (output token)
address to = address(swapRecipient); // Recipient address
uint256 deadline = block.timestamp + 3600; // Deadline timestamp (1 hour from now)
uint256[] memory amounts = router.swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline);

// JavaScript
const amounts = await router.swapTokensForExactTokens(amountOut, amountInMax, [tokenAddressA, tokenAddressB], swapRecipientAddress, deadline);
console.log('Received Amounts:', amounts);
```

## 7. swapExactTokensForETH

### Function Signature
```Solidity
// Solidity
function swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts)
```
### Description:
Executes a swap of an exact amount of input tokens for FTN based on the specified path, ensuring that the received FTN amount is at least the specified minimum.
### Arguments:
amountIn: Exact amount of input tokens to be swapped.
amountOutMin: Minimum acceptable amount of FTN to receive.
path: Array of token addresses representing the swap path.
to: Recipient address to receive the output FTN.
deadline: Timestamp deadline for execution.
### Returns:
amounts: Array of output amounts representing the amounts of tokens received for each swap in the path, with the last element being the received FTN amount.
### Example:
```Solidity
// Solidity
uint256 amountIn = 1000; // Exact amount of input tokens to be swapped
uint256 amountOutMin = 2 ether; // Minimum acceptable amount of FTN 
address[] memory path = new address[](2);
path[0] = address(tokenA); // Address of tokenA (input token)
path[1] = address(wftnToken); // Address of WFTN token
address to = address(swapRecipient); // Recipient address
uint256 deadline = block.timestamp + 3600; // Deadline timestamp (1 hour from now)
uint256[] memory amounts = router.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);

// JavaScript
const amountIn = 1000; // Exact amount of input tokens to be swapped
const amountOutMin = ethers.utils.parseEther('2'); // Minimum acceptable amount of FTN
const path = [tokenAddressA, wftnTokenAddress]; // Swap path from tokenA to WFTN
const to = swapRecipientAddress; // Address of the recipient
const deadline = Math.floor(Date.now() / 1000) + 3600; // Deadline timestamp (1 hour from now)
const amounts = await router.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
console.log('Received Amounts:', amounts);
```

## 8. swapTokensForExactETH
### Function Signature
```Solidity
// Solidity
function swapTokensForExactETH(uint256 amountOut, uint256 amountInMax, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts)
```
### Description:
Executes a swap of tokens for an exact amount of FTN, ensuring that the input tokens spent do not exceed a specified maximum. The function returns an array of output amounts, including the received FTN amount.
### Arguments:
amountOut: Exact amount of FTN desired.
amountInMax: Maximum acceptable amount of input tokens.
path: Array of token addresses representing the swap path.
to: Recipient address to receive the output FTN.
deadline: Timestamp deadline for execution.
### Returns:
amounts: Array of output amounts representing the amounts of tokens received for each swap in the path, with the last element being the received FTN amount.
### Example:
```Solidity
// Solidity
uint256 amountOut = ethers.utils.parseEther('2'); // Exact amount of FTN desired
uint256 amountInMax = 1000; // Maximum acceptable amount of input tokens
address[] memory path = new address[](2);
path[0] = address(tokenA); // Address of tokenA (input token)
path[1] = address(wftnToken); // Address of WFTN token
address to = address(swapRecipient); // Recipient address
uint256 deadline = block.timestamp + 3600; // Deadline timestamp (1 hour from now)
uint256[] memory amounts = router.swapTokensForExactETH(amountOut, amountInMax, path, to, deadline);

// JavaScript
const amountOut = ethers.utils.parseEther('2'); // Exact amount of FTN desired
const amountInMax = 1000; // Maximum acceptable amount of input tokens
const path = [tokenAddressA, wftnTokenAddress]; // Swap path from tokenA to WFTN
const to = swapRecipientAddress; // Address of the recipient
const deadline = Math.floor(Date.now() / 1000) + 3600; // Deadline timestamp (1 hour from now)
const amounts = await router.swapTokensForExactETH(amountOut, amountInMax, path, to, deadline);
console.log('Received Amounts:', amounts);
```

These functions enable seamless interaction with the Uniswap decentralized exchange on the Bahamut blockchain, empowering users to execute swaps efficiently and reliably.






