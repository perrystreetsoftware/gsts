#!/usr/bin/env node

const fs = require('fs');
const fsPromises = fs.promises;
const untildify = require('untildify');
const semverSort = require('semver-sort');
const path = require('path');

async function huntForExtension() {
  let extensionsDirectory = untildify('~/Library/Application Support/Google/Chrome/Default/Extensions/');
  let extensionIdentifier = 'callobklhcbilhphinckomhgkigmfocg'
  let endpointVerificationExtensionDirectory = path.join(extensionsDirectory, extensionIdentifier);

  return fsPromises.readdir(endpointVerificationExtensionDirectory)
    .then(function(files) {
      if (files && files.length > 0) {
        latestExtensionVersion = semverSort.desc(files)[0];

        console.log("\nENDPOINT VERIFICATION ENABLED")
        console.log(`Found Endpoint Verification Extension version installed: ${latestExtensionVersion}`)

        return path.join(endpointVerificationExtensionDirectory, latestExtensionVersion);
      } else {
        return null;
      }
    }).catch((error) => {
      console.warn("\nWARNING")
      console.warn(`Endpoint verification requested but plugin not found at ${endpointVerificationExtensionDirectory}`)
      console.warn("Please make sure you have installed the Google Endpoint Verification Chrome Extension at: https://chrome.google.com/webstore/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?hl=en")

      return null;
    });
}

module.exports = {
  huntForExtension
};
