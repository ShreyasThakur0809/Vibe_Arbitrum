// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract VibePayments {
    address public owner;
    uint256 public membershipFee; // The fee in wei (10 * 10^18)

    // Event to announce a successful payment. Our backend will listen for this.
    event MembershipPurchased(
        address indexed payer, // The user's wallet address
        uint256 amount,        // The amount they paid
        uint256 timestamp      // The time of the transaction
    );

    constructor(uint256 initialFee) {
        owner = msg.sender;
        membershipFee = initialFee;
    }

    // The function users will call to pay for their membership
    function purchaseMembership() public payable {
        // Ensure the user has sent exactly the right amount
        require(msg.value == membershipFee, "Incorrect fee sent for membership");

        // Announce the purchase to the blockchain
        emit MembershipPurchased(msg.sender, msg.value, block.timestamp);

        console.log("%s has purchased a premium membership!", msg.sender);
    }

    // Function for the owner to withdraw the collected ARB
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
}

