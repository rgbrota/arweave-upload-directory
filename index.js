const core = require("@actions/core");
const exec = require("@actions/exec");
const jsonfile = require("jsonfile");

const commands = {
  uploadDir: "arweave deploy-dir",
};

const flags = {
  deploy: {
    keyFile: "--key-file",
    skipConfirmation: "--force-skip-confirmation",
    ignoreIndex: "--ignore-index",
  },
};

const paths = {
  keyFile: "keyfile.json",
};

const outputs = {
  arweaveUrl: "arweave_url",
  cost: "cost",
};

async function run() {
  try {
    const inputs = {
      keyFileContent: JSON.parse(core.getInput("KEY_FILE_CONTENT")),
      dirPath: core.getInput("DIR_PATH"),
      ignoreIndex: core.getInput("IGNORE_INDEX").toLowerCase() === "true",
    };

    jsonfile
      .writeFile(paths.keyFile, inputs.keyFileContent)
      .then(async () => {
        const args = [
          inputs.dirPath,
          flags.deploy.keyFile,
          paths.keyFile,
          flags.deploy.skipConfirmation,
          ...(inputs.ignoreIndex ? [flags.deploy.ignoreIndex] : []),
        ];

        let commandOutput = "";
        const options = {
          listeners: {
            stdout: (data) => {
              commandOutput += data.toString();
            },
          },
        };

        await exec.exec(commands.uploadDir, args, options);

        const result = getResults(commandOutput);

        core.setOutput(outputs.arweaveUrl, result.arweaveUrl);
        core.setOutput(outputs.cost, result.cost);
      })
      .catch((error) => {
        core.setFailed(error.message);
      });
  } catch (error) {
    core.setFailed(error.message);
  }
}

function getResults(output) {
  // Ugly function, but the output data is not structured, just a huuge string
  const splittedOutput = output.split("\n");

  const indexes = {
    arweaveUrlIndex: splittedOutput.findIndex((e) =>
      e.includes("https://arweave.net")
    ),
    costIndex: splittedOutput.findIndex((e) => e.includes("Total price")),
  };

  return {
    arweaveUrl: splittedOutput[indexes.arweaveUrlIndex],
    cost: splittedOutput[indexes.costIndex].split(" ")[2],
  };
}

run();
