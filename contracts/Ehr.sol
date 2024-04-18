// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract Ehr {
    // Struct to represent a patient's medical record
    struct MedicalRecord {
        uint256 patientId;
        string name;
        string condition;
        uint256 timestamp;
        address provider; // Address of the healthcare provider who added the record
    }

    // Array to store medical records
    MedicalRecord[] public medicalRecords;

    // Mapping to store authorized providers for each patient
    mapping(uint256 => mapping(address => bool)) public authorizedProviders;

    // Event to log when a medical record is added
    event MedicalRecordAdded(uint256 indexed patientId, string name, string condition, uint256 timestamp, address provider);

    // Modifier to check if the sender is an authorized provider for a patient
    modifier onlyAuthorized(uint256 _patientId) {
        require(authorizedProviders[_patientId][msg.sender], "Sender is not authorized for this patient");
        _;
    }

    // Function to add a new medical record
    function addMedicalRecord(uint256 _patientId, string memory _name, string memory _condition) public{
        MedicalRecord memory newRecord = MedicalRecord(_patientId, _name, _condition, block.timestamp, msg.sender);
        medicalRecords.push(newRecord);
        emit MedicalRecordAdded(_patientId, _name, _condition, block.timestamp, msg.sender);
    }

    // Function to authorize a healthcare provider to access patient's records
    function authorizeProvider(uint256 _patientId, address _provider) public {
        authorizedProviders[_patientId][_provider] = true;
    }

    // Function to revoke authorization from a healthcare provider
    function revokeAuthorization(uint256 _patientId, address _provider) public {
        authorizedProviders[_patientId][_provider] = false;
    }

    // Function to get the number of medical records for a patient
    function getMedicalRecordCount() public view returns (uint256) {
        return medicalRecords.length;
    }

    // Function to get all medical records
    function getMedicalRecords() public view returns (MedicalRecord[] memory) {
        return medicalRecords;
    }
}
