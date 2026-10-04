# Preferências do proprietário

## Apresentação pessoal

A apresentação de Thiago deve dar destaque à eletrônica, ao diagnóstico e ao reparo na Cia. do Circuito, junto à sua competência em infraestrutura física e nuvem. Não apresentá-lo como desenvolvedor e não usar o termo “vibe coder” na copy, nos metadados ou nas imagens. Não inventar credenciais, histórico profissional ou motivações pessoais.

## Histórico Git

Por solicitação explícita do proprietário, a branch `main` deve conter somente um commit raiz com o estado completo e atual do site. Quando houver um envio autorizado, substituir o histórico por um novo commit inicial, sem pais, e enviar com `--force-with-lease` usando o SHA remoto conferido. Verificar alterações remotas antes de reescrever; não sobrescrever trabalho desconhecido. Não criar commits incrementais nem tags para conservar o histórico antigo neste repositório.

## Cache e publicação

Antes de cada envio, executar `python3 scripts/version_assets.py` e conferir com `python3 scripts/version_assets.py --check`. O script atualiza as URLs de CSS, JavaScript, favicon e imagem social a partir do conteúdo. O cache do HTML do GitHub Pages continua sujeito ao cabeçalho enviado pela hospedagem.
