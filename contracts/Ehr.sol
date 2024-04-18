// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Ehr {

    struct Doctor{
        uint256 doctorId;
        string name;
        address provider;
    }

    uint patientid = 0;
    uint docId = 0;

    struct MedicalRecord{

        uint256 patientID;
        string name;
        string condition;
        address provider;
    }

    MedicalRecord[] public Records;
    Doctor[] public ValidDoctors;


    function ValidateDoctor(address _a, string memory _name ) public {
        Doctor memory newDoctor = Doctor(docId,_name, _a);
        ValidDoctors.push(newDoctor);
        docId +=1;
    }

    function getValidDoctors() public view returns(Doctor[] memory)
    {
        return ValidDoctors;
    }

    function addMedicalRecord(address _a, string memory _name, string memory _condition ) public {

        bool isValid = false;
        for( uint i=0;i<ValidDoctors.length;i++)
        {
            if(ValidDoctors[i].provider == _a)
            {
                isValid = true;
                break;
            }
        }

        require(isValid, "Unauthorized User");
        MedicalRecord memory newRecord = MedicalRecord(patientid, _name, _condition, _a);
        patientid +=1;
        Records.push(newRecord);
    }

    function getMedicalRecord() public view returns(MedicalRecord[] memory){
        return Records;
    }

    function checkDoctor(address _a) public view returns (bool)
    {
        bool isValid = false;
        for(uint i=0;i<ValidDoctors.length;i++)
        {
            if(ValidDoctors[i].provider == _a)
            {
                isValid = true;
                break;
            }
        }

        return isValid;
    }


}