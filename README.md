# <big> X-sell app  </big>


## 1\. App mobile

Inclui:

* login, com sessões guardadas, faltando implementar a geração e checagem de token para autorizar operações, e expiração de sessões;

* tela de instruções, falta providenciar todo o texto explicativo;

* upload de arquivo OK (falta incluir id no filename para garantir unicidade);

* lista/histórico de solicitações, implementada pesquisa de status e avaliação OK;

* download de arquivos finais. falta integrar com tela de status;


## 2\. Backend e storage

Inclui:

* autenticação OK;

* registro de solicitações OK;

* armazenamento dos arquivos OK;

* associação input/output por protocolo OK;

* notificações básicas: faltando;

* API para status: OK, faltando implementar botões de download e envio de avaliação.

* incluir métodos remotos para analistas postarem e obterem dados?

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
