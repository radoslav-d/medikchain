# Medikchain
## Decentralized application for managing Health Medical Records

_This is project is initially developed as dissertation work for my bachelor degree in Technical University of Sofia._

## Motivation

Healthcare can be classified as the most important area in our society. The development of medicine is a critical factor
because everyone's life depends on it. The integration of information technologies in healthcare definitely has a
positive impact on the overall development of the field. Improving the way medical information is processed will always
benefit patients as well as medical staff and clinic administration. According to the dissertation assignment, a
blockchain-based medical record management system must be developed. A web application has been proposed that uses
Ethereum Smart Contracts to create and manage medical records. This approach has clear advantages over alternative
solutions with a centralized server, and this is due to the nature of Web 3.0 applications. Decentralization ensures
security and privacy for both the stored information and the users who make use of the service. This specification is
critical in systems that work with patients' medical data. Therefore, blockchain implementation is not only possible but
also extremely appropriate. Patients will rely on the privacy of their data, and doctors will work with clear medical
records. In addition, various functionalities for secure payments between medical staff, patients and medical facilities
can be easily integrated.

## Tech stack

As a result of the diploma assignment, a Web 3.0 application was developed. An Ethereum Smart Contract was written in
Solidity. Additionally, A React Web application was implemented in order to provide nice user interface and experience
for interacting with the Smart Contract.
The React application is powered by TypeScript and Redux.
Material UI is used to provide beatiful styling for the components.

## Project structure

_**/contracts**_ - place for all the Solidity Smart Contracts

_**/migrations**_ - the migrations scripts of the blockchain

_**/public**_ - publicly served files like index.html

_**/src**_ - React application
 - _**/assets**_ - place for all the static files (i18n labels, images, etc)
 - _**/components**_ - all the reusable components - the building blocks for the application
 - _**/contracts**_ - compiled abis for the smart contracts 
 - _**/hooks**_ - custom hooks and hook abstractions
 - _**/lib**_ - types and utility functions
 - _**/state**_ - Redux related interfaces like store, slices, reducers, etc
 - _**/views**_ - the view components, which represent whole pages

_**/test**_ - Smart contract unit tests

## Gallery

Home screen for not registered users:
![Guest Home Screen](/screenshots/guest-home-screen.png)

Register screen:
![Guest Register Screen](/screenshots/guest-register-screen.png)

Home screen for registered patient:
![Patient Home Screen](/screenshots/patient-home-screen.png)

Home screen for physician:
![Physician Home Screen](/screenshots/physician-home-screen.png)

Physician searches patients by their name:
![Physician Search Patients Screen](/screenshots/physician-search-patients-by-name-screen.png)

Physician searches patients by their ID:
![Physician Search Patients Screen](/screenshots/physician-search-patients-by-id-screen.png)

Physician fills in a new record for selected patient:
![Physician Fill New Record Screen](/screenshots/physician-fill-new-record-screen.png)

Physician searches medical records for a patient:
![Physician Search Records For Patient Screen](/screenshots/physician-search-records-screen.png)

Medical record detailed view screen: 
![Physician Review Record Screen](/screenshots/physician-review-record-screen.png)

Home screen for admin: 
![Admin Home Screen](/screenshots/admin-home-screen.png)

Administrator grants access to a user:
![Admin Grant Access Screen](/screenshots/admin-grant-access-screen.png)

