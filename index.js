import inquirer from "inquirer"
import chalk from "chalk"
import fs from 'fs'

function operation() {
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
                consultAccount()
                break
            case 'Depositar':
                deposit()
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

function createAccount(text) {
    header(text)
    console.log(chalk.green('Configure sua conta a seguir'))
    buildAccount()
}

function buildAccount () {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta: '

    },]).then((answer) => {

        const accountName = answer['accountName']

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }
        
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.red('Erro!! \nEssa conta ja existe, escolha outro nome.'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`,
            '{"balance": 0}',
            (err) => console.log(err))
        
        console.log(chalk.green('Conta criada com sucesso!'))
        operation()

    }).catch(err => { console.log(err) })
}

// verificar se a conta existe

const checkAccount = (accountName)=>{
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.red('Essa conta nao existe! informe uma conta valida.'))
        return false
    }

    return true
}

// depositar

function deposit() {
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta?'
    }])
    .then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(answer['accountName'])) {
            return deposit()
        }

        
        inquirer.prompt([
            {
                name:'amount',
                message:'Quanto voce deseja depositar?',
            }
        ]).then((answer) => {
            
            const amount = answer['amount']
            addAmount(accountName, amount)
            operation()

        }).catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const addAmount = (accountName, amount)=> {
    const account = getAccount(accountName)

    if(!amount) {
        console.log(chalk.red('Ocorreu um erro! Tente novamente.'))   
        return deposit()  
    }

    account.balance += parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account, null, 2))

    console.log(chalk.green(
        `Foi adicionado R$${amount} na conta ${accountName}`
    ))
}

const getAccount = (accountName)=> {
    const data = fs.readFileSync(`accounts/${accountName}.json`)
    return JSON.parse(data)
}

// consultar conta

function consultAccount() {
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta?'
    }])
    .then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)) {
            return consultAccount()
        }

        const account = getAccount(accountName)

        console.log(chalk.green(`A conta [${accountName}] tem R$${account.balance}`))
        operation()
    })
    .catch(err => console.log(err))
}
