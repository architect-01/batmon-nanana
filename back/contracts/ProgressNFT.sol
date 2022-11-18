//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./interfaces/IProgressNFT.sol"; 



contract ProgressNFT is IProgressNFT, ERC721 {

    mapping (uint => uint) public tokenIdToLevel;
    address public owner;    
    address public batmon;
    uint public tokenCounter;

    modifier onlyOwner () {
        require(msg.sender == owner, "Only Owner can call this method!!!");
        _;
    }
    modifier onlybatmon () {
        require(msg.sender == batmon, "Only batmon contract can call this method!!!");
        _;
    }

    constructor() ERC721 ("ProgressNFT", "PNFT") {
        owner = msg.sender;
    }

    function setBatmon (address _batmon) public returns (bool success) {
        batmon = _batmon;
        success = true;
    }

    function mint (address player) public onlybatmon returns (uint tokenId) {

        tokenId = tokenCounter;
        tokenIdToLevel[tokenId] = 0; // not needed but just in case
        _mint(player, tokenId);
        tokenCounter += 1;

    }

    function levelUp (uint tokenId) public onlybatmon returns (bool success) {
        tokenIdToLevel[tokenId] += 1;
        success = true;
    }

}