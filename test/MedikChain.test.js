const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
const expect = chai.expect;
const MedikChain = artifacts.require('./MedikChain.sol');

contract('MedikChain', accounts => {
    const owner = accounts[0];

    it('Admin should have all rights', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const canEdit = await medikChainInstance.canEdit({from: owner});
        const canGiveAccess = await medikChainInstance.canGiveAccess({from: owner});
        expect(canEdit).to.be.true;
        expect(canGiveAccess).to.be.true;
    });

    it('Admin should create and view new medical record', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const patient = accounts[2];

        await medikChainInstance.addMedicalRecord(patient, owner, 'test title', 'test description', accounts[3],
            ['tag1', 'tag2'], 'attachment location', {from: owner});

        const medicalRecords = await medikChainInstance.getMedicalRecords(patient, {from: owner});
        expect(medicalRecords.length).to.eq(1);
        const medicalRecord = medicalRecords[0];
        expectMedicalRecord(medicalRecord, '0', 'test title', 'test description', owner, patient,
            accounts[3], ['tag1', 'tag2'], 'attachment location');
    });

    it('Admin should grant edit access to new user', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const editorUser = accounts[1];
        await medikChainInstance.grantEditAccess(editorUser, {from: owner});
        const canEdit = await medikChainInstance.canEdit({from: editorUser});
        const canGiveAccess = await medikChainInstance.canGiveAccess({from: editorUser});
        expect(canEdit).to.be.true;
        expect(canGiveAccess).to.be.false;
    });

    it('Editor should create and view new medical record', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const editorUser = accounts[1];
        const patient = accounts[5];

        await medikChainInstance.addMedicalRecord(patient, editorUser, 'new test title', 'new test description',
            accounts[9], ['tag3', 'tag4'], 'attachment location', {from: editorUser});

        const medicalRecords = await medikChainInstance.getMedicalRecords(patient, {from: editorUser});
        expect(medicalRecords.length).to.eq(1);
        const medicalRecord = medicalRecords[0];
        expectMedicalRecord(medicalRecord, '1', 'new test title', 'new test description', editorUser,
            patient, accounts[9], ['tag3', 'tag4'], 'attachment location');
    });

    it('Patient should view assigned medical record', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const patient = accounts[5];

        const medicalRecords = await medikChainInstance.getMedicalRecords(patient, {from: patient});
        expect(medicalRecords.length).to.eq(1);
        const medicalRecord = medicalRecords[0];
        expectMedicalRecord(medicalRecord, '1', 'new test title', 'new test description', accounts[1],
            patient, accounts[9], ['tag3', 'tag4'], 'attachment location');
    });

    it('Editor should not be able to grant access', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const editorUser = accounts[1];
        await medikChainInstance.grantAdminAccess(accounts[5], {from: editorUser}).should.be.rejected;
    });

    it('Patient should not be able to view other patient records', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const currentUser = accounts[6];
        const canEdit = await medikChainInstance.canEdit({from: currentUser});
        const canGiveAccess = await medikChainInstance.canGiveAccess({from: currentUser});
        expect(canEdit).to.be.false;
        expect(canGiveAccess).to.be.false;
        await medikChainInstance.getMedicalRecords(accounts[5], {from: currentUser}).should.be.rejected;
    });

    it('Patient should not be able to edit', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const patient = accounts[6];
        const canEdit = await medikChainInstance.canEdit({from: patient});
        expect(canEdit).to.be.false;
        await medikChainInstance.addMedicalRecord(patient, accounts[1], 'malicious', 'malicious', accounts[9], ['tag3'],
            'malicious location', {from: patient}).should.be.rejected;
    });

    it('Patient should not be able to grant access', async () => {
        const medikChainInstance = await MedikChain.deployed();
        const patient = accounts[6];
        await medikChainInstance.grantAdminAccess(patient, {from: patient}).should.be.rejected;
    });
});

function expectMedicalRecord(medicalRecord, id, title, description, physician, patient, medicalCenter, tags, attachment) {
    expect(medicalRecord.id).to.eq(id);
    expect(medicalRecord.title).to.eq(title);
    expect(medicalRecord.description).to.eq(description);
    expect(medicalRecord.physician).to.eq(physician);
    expect(medicalRecord.patient).to.eq(patient);
    expect(medicalRecord.medicalCenter).to.eq(medicalCenter);
    tags.forEach(tag => expect(medicalRecord.tags).to.contain(tag));
    expect(medicalRecord.attachment).to.contain(attachment);
}
