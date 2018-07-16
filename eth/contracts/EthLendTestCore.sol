pragma solidity ^0.4.23;

import "./EthLendTestStorage.sol";

/// @title EthLendTestCore
/// @author tiago
/// @dev The core contract for EthLendTest

contract EthLendTestCore {

  EthLendTestStorage storageContract;

  /// @notice Creates the main EthLendTest smart contract instance.
  constructor(address _storageContract) public {
    storageContract = EthLendTestStorage(_storageContract);
  }

  function getNbReviews() public view returns (uint256) {
    return storageContract.getNbReviews();
  }

  function getReview(uint256 _id) public view returns (uint256, string, string, string, uint16) {
    return storageContract.getReview(_id);
  }

  function createReview(string title, string content, string author) public {
    return storageContract.createReview(title, content, author, msg.sender);
  }

  function upvoteReview(uint256 _id) public payable {
    address authorAddress = storageContract.upvoteReview(_id);
    authorAddress.transfer(msg.value);
  }
}
