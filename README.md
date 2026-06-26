# <big> X-sell app  </big>


## 1\. App mobile

Inclui:

* login simples 

* tela de instruções

* upload de arquivo

* lista/histórico de solicitações

* tela de status

* download de arquivos finais

## 2\. Backend e storage

Inclui:

* autenticação

* registro de solicitações

* armazenamento dos arquivos

* associação input/output por protocolo

* notificações básicas

* API para status

## 3\. Processamento analítico

GPT de usuário

## 4\. Revisão interpretativa

revisar se as recomendações fazem sentido:

produtos sugeridos são realmente complementares?

algum cluster está pouco confiável?

há concentração excessiva em um único produto? 

os bundles são acionáveis para campanha?

há grupos pequenos demais para justificar recomendação?

existe alguma recomendação óbvia, mas comercialmente fraca? (preço? não temos acesso)


## 6\. Geração dos entregáveis

O analista entrega dois arquivos:

### Planilha de output:

* base original

* cluster

    - recomendação 1

    - recomendação 2

    - recomendação 3

* score/confiança, se disponível

* abas complementares: 
    - resumo de
        + clusters
        + oportunidades
        + bundles

### Relatório analítico:
 
fornecer base para chat padronizar, contendo:

* sumário executivo

* leitura da carteira

* maiores clusters

* produtos mais recomendados

* bundles promissores

* como interpretar os arquivos
