# <big> X-Sell </big>

## 1\. Aplicação mobile

Inclui:

* Login, com JWT para expiração de sessões;

* Registro, com todas as informações pertinentes do cliente;

* Tela Sobre, explicando o funcionamento do serviço;

* Tela com todas as solicitações, com opções de enviar novas entradas, baixar saídas, e avaliar serviço;

* Tela para usuários administradores, com opções de aprovar/rejeitar entradas enviadas, sinalizar início e conclusão de análise, enviar saída.

## 2\. Servidor

* Autenticação;

* Registro de solicitações;

* Armazenamento dos arquivos;

* Associação de entrada/saída por protocolo;

* Visualização de status da solicitação.

## 3\. Processamento analítico

* GPT de usuário

### Revisão interpretativa

Revisar se as recomendações fazem sentido:

* Produtos sugeridos são realmente complementares?

* Algum cluster está pouco confiável?

* Há concentração excessiva em um único produto? 

* Os bundles são acionáveis para campanha?

* Há grupos pequenos demais para justificar recomendação?

* Existe alguma recomendação óbvia, mas comercialmente fraca?

### Geração dos entregáveis

O analista entrega dois arquivos:

* Planilha de output:

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
 
Fornecer base para chat padronizar, contendo:

* sumário executivo

* leitura da carteira

* maiores clusters

* produtos mais recomendados

* bundles promissores

* como interpretar os arquivos
