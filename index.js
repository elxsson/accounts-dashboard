import inquirer from "inquirer"
import chalk from "chalk"
import fs from 'fs'

const operation = ()=> {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que voce deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer) => {
        
        const action = answer['action']

        switch (action) {
            case 'Criar conta':
                createAccount(action)
                break
            case 'Consultar saldo':
                break
            case 'Depositar':
                break
            case 'Sacar':
                break
            case 'Sair':
                break
            default:
                break
        }

    }).catch(err => console.log(err))
}

operation()

const header = (text)=>{
    console.log(chalk.green('====================>', chalk.cyanBright(text), '<===================='))
}

// criar uma conta


const createAccount = (text)=> {
    header(text)
    console.log(chalk.green('Configure sua conta a seguir'))
    buildAccount()
}

const buildAccount = ()=> {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta: '

    }]).then((answer) => {

        const accountName = answer['accountName']

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }
        
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.red('Erro!! \nEssa conta ja existe, escolha outro nome.'))
            buildAccount()
            return
        }

        fs.writeFileSync('accounts/${accountName}.json',
            '{"balance": 0}',
            (err) => console.log(err))
        
        console.log(chalk.green('Conta criada com sucesso!'))
        operation()

    }).catch(err => { console.log(err) })
}
