const kms = require('@google-cloud/kms');
const Storage = require('@google-cloud/storage');
const {promisify} = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// if running in production we need to get the .env file from a storage budcket and decrypt.
const addSecretsToEnv = () => {
    // setup for storage bucket
    const bucketName='budget-app-encrypted-secrets';
    const fileName='enc-64.env';
    const storage = new Storage.Storage();
    const file = storage.bucket(bucketName).file(fileName);
    
    // setup for KMS
    const client = kms.KeyManagementServiceClient();
    const projectId = 'budget-app-259923';
    const locationId = 'global';
    const keyRingID = 'budget-integration-secrets';
    const keyID = 'budget-api-secrets'
    const encFileName = 'encrypted.txt';

    await file.download(encFileName);

    const cipherText = readFile(encFileName);
    const name = client.cryptoKeyPath(
        projectId,
        locationId,
        keyRingID,
        keyID,
    );

    const [result] = await client.decrypt({name, cipherText});
    
    const decryptFileName = global.baseDir + '/.env';
    await writeFile(decryptFileName);

    require('dotenv').config();
}

module.exports = {
    addSecretsToEnv
};