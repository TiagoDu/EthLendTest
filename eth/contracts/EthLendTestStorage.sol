pragma solidity ^0.4.23;

/// @title EthLendTestStorage
/// @author tiago
/// @dev The storage for EthLendTest contracts

contract EthLendTestStorage {

  // Controls whoever can access this storage contract,
  // mainly the Core contract of EthLendTest
  mapping(address => bool) accessAllowed;

  constructor() public {
    accessAllowed[msg.sender] = true;
  }

  modifier platform() {
    require(accessAllowed[msg.sender] == true);
    _;
  }

  function allowAccess(address _address) platform public {
    accessAllowed[_address] = true;
  }

  function denyAccess(address _address) platform public {
    accessAllowed[_address] = false;
  }

  // Reviews structure
  struct Review {
    string title;
    string content;
    string author;
    address authorAddress;
    uint16 positiveVotes; // We consider that these positive votes cannot go over uint16 MAX_VALUE
  }

  Review[] reviews;

  function getNbReviews() public view returns (uint256) {
    return reviews.length;
  }

  function getReview(uint256 _id) public view returns (uint256, string, string, string, uint16) {
    Review storage review = reviews[_id];
    return (_id, review.title, review.author, review.content, review.positiveVotes);
  }

  function createReview(string _title, string _content, string _author, address _authorAddress) platform public {
    Review memory newReview = Review({
      title: _title,
      content: _content,
      author: _author,
      authorAddress: _authorAddress,
      positiveVotes: 0
    });

    reviews.push(newReview);
  }

  function upvoteReview(uint256 _id) platform public returns (address) {
    reviews[_id].positiveVotes++;
    return reviews[_id].authorAddress;
  }
}
