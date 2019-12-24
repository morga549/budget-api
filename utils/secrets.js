const kms = require('@google-cloud/kms');
const Storage = require('@google-cloud/storage');
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// if running in production we need to get the .env file from a storage bucket and decrypt.
const getSectrets = async () => {
    // setup for storage bucket
    const bucketName='budget-app-encrypted-secrets';
    const fileName='pg_secrets.json.enc';
    const storage = new Storage.Storage();
    const file = storage.bucket(bucketName).file(fileName);
    
    // setup for KMS
    const client = new kms.KeyManagementServiceClient();
    const locationId = 'global';
    const projectId = 'budget-app-259923';
    const keyRingID = 'budget-integration-secrets';
    const keyID = 'local-dev-key';

    const formattedName = client.cryptoKeyPath(
        projectId,
        locationId,
        keyRingID,
        keyID,
    );

    const ciphertextDownload = await file.download();

    const ciphertext = ciphertextDownload[0];

    const [decrypted] = await client.decrypt({
        name: formattedName,  
        ciphertext,
    });
    const result = decrypted.plaintext.toString();
    const json_result = JSON.parse(result);
   
    return json_result;
}

exports.getSecrets = getSectrets;
