# Ontology Email verification Trusted anchor example

This is an example showing how to program a basic Trusted Anchor software. 

## Overview

Main objective of this example is to issue a Verifiable claim to an user, declaring his ownership of an email address.

Working copy is deployed to http://ontdetective.org.

* Create a wallet with default identity.
* Click on the identity
* Create email claim
* Wait for the email to arrive
* Click on the link in email
* Download the claim

## Process

* User will first submit a Request for Verifiable claim based on OEP-2 https://github.com/ontio/OEPs/blob/master/OEP-2/OEP-2.1.mediawiki

* Trusted anchor will send a challenge to the email address specified in the request

* User will click on the link in the email address

* Trusted anchor will issue and attest a Verifiable claim if received the correct challenge

## Getting started

#### Install yarn
For faster building process and development experience install Yarn

```
npm install --global yarn
```

#### Download
```
git clone 'https://github.com/backslash47/ontology-ta-email2.git'
```

#### Build and Start development server
````
yarn build
yarn start
````

## Built With

* [TypeScript](https://www.typescriptlang.org/) - Used language
* [Node.js](https://nodejs.org) - JavaScript runtime for building and ingest
* [Ontology TypeScript SDK](https://github.com/ontio/ontology-ts-sdk) - The framework used

## Authors

* **Matus Zamborsky** - *Initial work* - [Backslash47](https://github.com/backslash47)

## License

This project is licensed under the LGPL License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Many thanks to the whole Ontology team, who done a great job bringing Ontology to life.
