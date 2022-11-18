//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IProgressNFT is IERC721 {

    
    function tokenIdToLevel (uint tokenId) external view returns (uint level);

    function setBatmon (address _progmon) external returns (bool success);

    function mint (address player) external returns (uint tokenId);
    
    function levelUp (uint tokenId) external returns (bool success);

}