// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MessageBoard {
    string[] private messages;

    event MessageAdded(address indexed user, string message);

    function addMessage(string memory _message) public {
        require(bytes(_message).length > 0, "Message should not be empty");

        messages.push(_message);
        emit MessageAdded(msg.sender, _message);
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }

    function getMessageByIndex(
        uint256 _index
    ) public view returns (string memory) {
        require(_index < messages.length, "Invalid index");

        return messages[_index];
    }

    function getAllMessages() public view returns (string[] memory) {
        string[] memory allMessages = new string[](messages.length);

        for (uint i = 0; i < messages.length; i++) {
            allMessages[i] = messages[i];
        }

        return (allMessages);
    }
}
