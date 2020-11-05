import { Command, flags } from '@oclif/command'
import * as inquirer from 'inquirer'
import open from 'open'
import bent from 'bent'
import YAML from 'yaml'
import fs from 'fs'

const configPath = `${process.env.HOME}/.config/datarobot/drconfig.yaml`

// https://api-docs.datarobot.com/docs/guide-to-different-datarobot-endpoints
class Ajcli extends Command {
  static description = "Let's try to auth with DataRobot!"

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
    deployment: flags.string(
      { options: ["cloud", "onprem", "selfservice", "trial"] }),
    endpoint: flags.string(
      {char: 'e', description: 'DR API endpoint, ex. https://app2.datarobot.com/api/v2'}
    )
  }

  static args = [{name: 'file'}]

  async run() {
    const { args, flags } = this.parse(Ajcli)

    let drClientConfig: YAML.Document = readDatarobotConfig()

    let drToken = drClientConfig.get('token')
    let drEndpoint = flags.endpoint ?? drClientConfig.get('endpoint')
    if (drEndpoint && drToken) {
      this.log("You're logged in and already have a token! Happy modeling! 🔥")
      return
    }

    let deployment = flags.deployment
    let deploymentRoot = "https://app2.datarobot.com"
    let drDeveloperToolsUrl = deploymentRoot

    if (!drEndpoint) {
      if (!deployment) {
        let responses: any = await inquirer.prompt([{
          name: "deployment",
          message: "What is your DataRobot deployment?",
          type: "list",
          choices: [
            { name: 'Managed AI Cloud', value: 'cloud' },
            { name: 'On-Premise / VPC', value: 'onprem' },
            { name: 'Self Service', value: 'selfservice' },
            { name: 'AI Platform Trial', value: 'trial' }
          ]
        }])
        deployment = responses.deployment
      }

      let configurableDeployments = new Set()
      configurableDeployments.add('onprem')

      if (deployment == 'cloud') {
        let responses: any = await inquirer.prompt([{
          name: "deploymentRoot",
          message: "Which cloud are you using?",
          type: "list",
          choices: [
            { name: "DataRobot US Managed AI Cloud", value: "https://app.datarobot.com", short: "US" },
            { name: "DataRobot EU Managed AI Cloud", value: "https://app.eu.datarobot.com", short: "EU" }
          ]
        }])

        deploymentRoot = responses.deploymentRoot
      } else if (configurableDeployments.has(deployment)) {
        let responses: any = await inquirer.prompt([{
          name: "deploymentRoot",
          message: "We need more information on your deployment endpoint. What is the root?",
          type: "input",
          default: "https://{datarobot.your-org.com}"
        }])

        deploymentRoot = responses.deploymentRoot
      }

      drEndpoint = deploymentRoot.concat("/api/v2")
      drDeveloperToolsUrl = deploymentRoot.concat("/account/developer-tools")
    }

    // TODO Bypass if token already exists in configuration
    let apiAccessHowTo: string = "https://api-docs.datarobot.com/docs/api-access-guide"
    let loginInstructions: string =
      `Hello! You are authenticating to the DataRobot API at ${drEndpoint}.
You'll need an API token, so let's get you one!

In a moment, I'm going to take you to the DataRobot app at ${deploymentRoot}.
You'll need to sign up or login, and then you'll want to go to Developer Tools
and create a new API key. It's pretty easy, but the how-to can be found at
${apiAccessHowTo}.

Copy that API key, then come back here and paste it in at the next prompt.`

    this.log(loginInstructions)
    let confirmLogonResponse: any = await inquirer.prompt([{
      name: "loginconfirm",
      message: "Ready to login to DataRobot?",
      type: "confirm",
    }])
    if (confirmLogonResponse.loginconfirm) {
      // TODO Sadly DR doesn't have the ability to sticky a particular page
      // TODO node's `open` package requires you to close the whole browser
      await open(drDeveloperToolsUrl)
      await sleep(2000)
    }

    let saveTokenResponse: any = await inquirer.prompt([{
      name: "apiToken",
      message: "What is your API token?",
      type: "password",
    }])

    let apiToken: string = saveTokenResponse.apiToken
    this.log("Let's make sure that token works...")

    try {
      // GET https://app.datarobot.com/api/v2/projects/ HTTP/1.1
      const testApi = bent('GET', 'json', 200, {Authorization: `Bearer ${apiToken}`})
      let testResponse = await testApi(`${drEndpoint}/projects/`)

      // console.log(testResponse)
    } catch (error) {
      this.debug(error)
      if (error.statusCode == 401) {
        this.log('Hmm, the API token you gave was not valid. Try `` again.')
        return 1
      } else {
        this.log("Hmm, the request didn't work. Please try your call again later.")
        return 1
      }
    }

    writeTokenToDatarobotConfig(apiToken)
    this.log(`... and you're in. 🔥 We've saved the token to ${configPath}`)
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readDatarobotConfig(): YAML.Document {
  try {
    const doc = YAML.parseDocument(fs.readFileSync(configPath, 'utf8'))
    return doc
  } catch (e) {
      console.log(e)
      return new YAML.Document
  }
}

// Assumes that token does not already exist
function writeTokenToDatarobotConfig(token: string) {
  try {
    fs.appendFileSync(configPath, `token: ${token}`, 'utf8')
  } catch (e) {
    throw e
  }
}

export = Ajcli
