import inquirer from "inquirer"
import chalk from "chalk"
import fs from 'fs'

const operation = ()=> {
    inquirer.prompt([{
        type: 'list',
        name: 'actions',
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
        console.log(action)

    }).catch(err => console.log(err))
}

operation()