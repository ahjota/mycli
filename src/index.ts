import { Command, flags } from '@oclif/command'
import * as inquirer from 'inquirer'

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

    let deployment = flags.deployment
    let endpoint = flags.endpoint
    let deploymentRoot = "https://app2.datarobot.com"

    if (!endpoint) {
      if (!deployment) {
        let responses: any = await inquirer.prompt([{
          name: "deployment",
          message: "select a deployment",
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

      endpoint = deploymentRoot.concat("/api/v2")
    }

    this.log(`You are authenticating to the DataRobot API at ${endpoint}`)
  }
}

export = Ajcli
