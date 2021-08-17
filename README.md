# Arweave-upload-file v1

## Overview

This action will allow you to upload a directory to the Arweave permaweb in an easy manner during your action workflows, with just a couple inputs.

It uses [Arweave-deploy](https://github.com/ArweaveTeam/arweave-deploy) under the hood, wrapping the CLI into an easy-to-use action for developers or any interested party.

If your use case requires the upload of a single file, please refer to [rgbrota/arweave-upload-file](https://github.com/rgbrota/arweave-upload-file).
## Usage

See [action.yml](action.yml).

### Inputs

The action expects the following inputs:

| Input | Type | Required | Default | Description |
| --- | --- | :---: | :---: | --- |
| `key_file_content` | JSON | ✔️ | - | The content of the Arweave key file JSON used to upload the data. It should be setup as a secret inside the repository. |
| `dir_path` | String | ✔️ | - | Directory to be uploaded. |
| `ignore_index` | Boolean | ❌ | `true` | Ignore index.html as the upload dir top-level file. If set to `true`, the directory needs to have the index.html file, else it will fail. |

### Outputs

The action also has the following outputs:

| Output | Type | Description |
| --- | --- | --- |
| `arweave_url` | String | Arweave URL where the uploaded directory will be available once mined. |
| `cost` | Integer | Total cost of the transaction in the Arweave blockchain currency, AR. |

### Examples

#### Upload a directory - Basic usage

```yaml
steps:
- uses: actions/checkout@v2

- uses: rgbrota/arweave-upload-directory@v1
    with:
        key_file_content: ${{ secrets.xx }}
        dir_path: 'xx'
```

#### Upload a directory - Using index.html as the upload dir top-level file

```yaml
steps:
- uses: actions/checkout@v2

- uses: rgbrota/arweave-upload-directory@v1
    with:
        key_file_content: ${{ secrets.xx }}
        dir_path: 'xx'
        ignore_index: false
```