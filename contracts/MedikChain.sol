// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/// @title MedikChain
/// @author Radoslav Dimitrov
contract MedikChain {

    struct MedicalRecord {
        uint id;
        string title;
        string description;
        address physician;
        address patient;
        uint date;
        address medicalCenter;
        string[] tags;
        string attachment;
    }

    struct UserRole {
        bool isAdmin; // Admins can grant edit access and can also edit
        bool isEditor; // Editors can push changes to the blockchain
    }

    struct PatientInfo {
        address id;
        string name;
        string birthday;
        string gender;
        bool registered;
    }

    event MedicalRecordPublished (
        uint id,
        address patient
    );

    event PatientRegistered (
        address patient
    );

    uint private recordsCount = 0;

    // keeps mapping between user (their address) and their access rights
    mapping(address => UserRole) private userRoles;

    // keeps the mapping between users and the id generator for their records
    mapping(address => uint) private recordsForPatients;

    // @notice this mapping is the main structure of data for this contract
    // it maps the patient address to a nested mapping of ids => records of data
    mapping(address => mapping(uint => MedicalRecord)) private patientRecords;

    address[] private registeredPatients;
    mapping(address => PatientInfo) private patientsInfo;

    constructor() {
        // initially, only the creator has access rights
        userRoles[msg.sender] = UserRole(true, true);
    }

    modifier onlyEditors() {
        require(userRoles[msg.sender].isEditor, "This user has no sufficient access rights to perform this action");
        _;
    }

    modifier onlyAdmins() {
        require(userRoles[msg.sender].isAdmin, "This user has no sufficient access rights to perform this action");
        _;
    }

    modifier onlyViewer(address _patient) {
        bool isAdmin = userRoles[msg.sender].isAdmin;
        bool isEditor = userRoles[msg.sender].isEditor;
        bool isOwner = (msg.sender == _patient);
        bool registered = isRegistered();
        require(isAdmin || isEditor || (isOwner && registered), "This user has no sufficient access rights to perform this action");
        _;
    }

    modifier expectPaymentAmount(uint paymentAmount) {
        require(msg.value >= paymentAmount, "Transaction value is not sufficient");
        _;
    }

    function grantAdminAccess(address payable _user) public payable onlyAdmins expectPaymentAmount(2 ether) {
        userRoles[_user].isAdmin = true;
        userRoles[_user].isEditor = true;
        _user.transfer(2 ether);
    }

    function grantEditAccess(address payable _user) public payable onlyAdmins expectPaymentAmount(1 ether) {
        userRoles[_user].isEditor = true;
        _user.transfer(1 ether);
    }

    function canEdit() public view returns(bool) {
        return userRoles[msg.sender].isEditor;
    }

    function canGiveAccess() public view returns(bool) {
        return userRoles[msg.sender].isAdmin;
    }

    function addMedicalRecord(address _patient, address _physician, string memory _title, string memory _description,
                              address _medicalCenter, string[] memory _tags, string memory _attachment) public onlyEditors {
        uint recordsCountForUser = recordsForPatients[_patient];
        patientRecords[_patient][recordsCountForUser] = MedicalRecord(recordsCount, _title, _description, _physician,
                                                                      _patient, block.timestamp, _medicalCenter, _tags,
                                                                      _attachment);
        recordsForPatients[_patient] = recordsCountForUser + 1;
        emit MedicalRecordPublished(recordsCount++, _patient);
    }


    function getMedicalRecords(address _patient) public onlyViewer(_patient) view returns (MedicalRecord[] memory) {
        uint recordsCountForUser = recordsForPatients[_patient];
        MedicalRecord[] memory result = new MedicalRecord[](recordsCountForUser);
        for (uint i = 0; i < recordsCountForUser; i++) {
            result[i] = patientRecords[_patient][i];
        }
        return result;
    }

    function getPatientsInfo() public onlyEditors view returns (PatientInfo[] memory) {
        uint registeredPatientsCount = registeredPatients.length;
        PatientInfo[] memory result = new PatientInfo[](registeredPatientsCount);
        for (uint i = 0; i < registeredPatientsCount; i++) {
            address currentPatient = registeredPatients[i];
            result[i] = patientsInfo[currentPatient];
        }
        return result;
    }

    function isRegistered() public view returns(bool) {
        return patientsInfo[msg.sender].registered;
    }

    function registerAsPatient(string memory _name, string memory _birthday, string memory _gender) public {
        require(!isRegistered(), "Patient is already registered");
        patientsInfo[msg.sender] = PatientInfo(msg.sender, _name, _birthday, _gender, true);
        registeredPatients.push(msg.sender);
        emit PatientRegistered(msg.sender);
    }
}