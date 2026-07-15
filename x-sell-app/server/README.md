# APP servidor do X-sell

## Como rodar localmente

```
    cd (caminho local) 
    npm install
    npm start
```

## O que contém

*  login e registro
*  repositórios de input e output
*  database com solicitações em curso

##  O que deve conter também

*  geração de token e checagem quando pede download e faz upload

## Sugestões, mudanças

* --

## ORIGINAL: Backend e storage

Inclui:

* autenticação OK

* registro de solicitações OK

* armazenamento dos arquivos OK

* associação input/output por protocolo OK

* notificações básicas

* API para status OK 

## E-mails automáticos

O servidor envia dois e-mails transacionais:

1. confirmação de conta após um cadastro bem-sucedido em `POST /register`;
2. aviso de conclusão quando `POST /admin/status` muda um processo para o status `3`.

O cadastro deve enviar o campo `email`. Os templates HTML e texto ficam em
`methods/mailTemplates.js`, enquanto a configuração do Nodemailer fica em
`methods/mailService.js`.

Configure as variáveis abaixo no ambiente do servidor:

```env
EMAIL_LOGIN=conta-do-gmail@gmail.com
EMAIL_KEY=senha-de-app-do-google
EMAIL_FROM=conta-do-gmail@gmail.com
APP_URL=https://endereco-do-x-sell.com
```

O formulário de cadastro precisa enviar:
  "nome": "usuario",
  "senha": "senha",
  "email": "cliente@empresa.com",
  "nomeContato": "Nome do cliente"


Para Gmail, `EMAIL_KEY` deve ser uma senha de app, não a senha normal da conta.
O aviso de conclusão é enviado apenas na primeira transição para o status `3`.
