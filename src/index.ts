import { Command, flags } from '@oclif/command'
import * as inquirer from 'inquirer'

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
    deployment: flags.string({ options: ["cloud", "vpc", "onprem", "selfservice", "trial"] }),
  }

  static args = [{name: 'file'}]

  async run() {
    const { args, flags } = this.parse(Ajcli)
    let deployment = flags.deployment

    if (!deployment) {
      let responses: any = await inquirer.prompt([{
        name: "deployment",
        message: "select a deployment",
        type: "list",
        choices: [
          { name: 'cloud' },
          { name: 'vpc' },
          { name: 'production'}
        ]
      }])
      deployment = responses.deployment
    }

    this.log(`you are authenticating to a ${deployment} deployment of DataRobot`)
  }
}

export = Ajcli
