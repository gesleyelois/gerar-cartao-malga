#!/usr/bin/env node

import 'dotenv/config'
import inquirer from 'inquirer'
import { Malga } from 'malga'
import clipboard from 'clipboardy'

if (!process.env.MALGA_API_KEY || !process.env.MALGA_CLIENT_ID) {
  console.error('❌ Erro: arquivo .env não encontrado ou incompleto.')
  console.error('➡️ Defina MALGA_API_KEY e MALGA_CLIENT_ID no arquivo .env')
  process.exit(1)
}

const malga = new Malga({
  apiKey: process.env.MALGA_API_KEY,
  clientId: process.env.MALGA_CLIENT_ID,
  options: { sandbox: true }
})

const brands = ['Mastercard', 'Visa', 'Amex', 'HiperCard', 'DinersClub']
const statuses = [
  'authorized',
  'unauthorized',
  'blocked_card',
  'canceled_card',
  'expired_card',
  'invalid_cvv',
  'timeout',
  'authorized_or_timeout'
]

async function runCLI() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'brand',
      message: 'Selecione a bandeira do cartão:',
      choices: brands
    },
    {
      type: 'list',
      name: 'status',
      message: 'Selecione o status simulado do cartão:',
      choices: statuses
    }
  ])

  try {
    const card = await malga.sandbox.generateCard({
      brand: answers.brand,
      status: answers.status
    })

    console.log('\n🎴 Cartão gerado com sucesso:')
    console.log(card)

    const { copyChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'copyChoice',
        message: 'O que deseja copiar para a área de transferência?',
        choices: [
          { name: '📋 Somente o número do cartão', value: 'number' },
          { name: '📋 Todos os dados (número, CVV, validade)', value: 'full' },
          { name: '🚫 Nada', value: 'none' }
        ]
      }
    ])

    if (copyChoice === 'number') {
      await clipboard.write(card.number)
      console.log('✅ Número do cartão copiado para a área de transferência!')
    } else if (copyChoice === 'full') {
      const cardInfo = `
        Número: ${card.number}
        CVV: ${card.cvv}
        Validade: ${card.expirationDate}`.trim()
      await clipboard.write(cardInfo)
      console.log('✅ Dados completos copiados para a área de transferência!')
    } else {
      console.log('ℹ️ Nada foi copiado.')
    }

  } catch (err) {
    console.error('\n❌ Erro ao gerar o cartão:', err.message)
  }
}

runCLI()
