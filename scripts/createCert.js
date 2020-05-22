const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const execSync = require('child_process').execSync;

const date = Date.now();
const tmpDir = path.join(__dirname, '..');
const privatePem = path.join(tmpDir, `private.pem`);
const publicPem = path.join(tmpDir, `public.pem`);

const createCert = () => {
  try {
    fs.mkdirSync(tmpDir);
  } catch (e) {
    console.log(`${tmpDir} exists already.`);
  }
  execSync(`openssl genrsa 2048 > ${privatePem}`);
  execSync(
    `openssl req -x509 -new -key ${privatePem} -out ${publicPem} -subj "/C=DE/ST=Rheinland-Pfalz/L=Trier/O=Testless/CN=saaslify.io"`
  );
};

createCert()
