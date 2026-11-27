// Configuração da edição — é o único ficheiro a alterar de um ano para o outro
// (além de fundo.jpg e data.json).
window.CAO = {
  edicao: "XXII",
  evento: "Conferências Abertas de Optometria",
  mote: "Visão de Futuro",
  datasExtenso: "3 e 4 de outubro de 2026",
  datasCurto: "3–4 de outubro de 2026",
  local: "Eurostars Oasis Plaza, Figueira da Foz",
  entidade:
    "A Associação de Profissionais Licenciados de Optometria (APLO), entidade de utilidade pública, certifica que",
  fecho:
    "A sua participação contribuiu de forma relevante para a promoção científica, técnica e ética da Optometria em Portugal.",
  // Assinaturas no certificado ([] para não mostrar); "imagem" = rubrica PNG branca com fundo transparente
  assinaturas: [
    { nome: "João Caetano", cargo: "Presidente da APLO", imagem: "assinatura_joao.png" },
    { nome: "Rute Araújo", cargo: "Presidente da XXII Edição", imagem: "assinatura_rute.png" },
  ],
  // Contacto mostrado em caso de erro (deixar "" para mostrar apenas "contacte a APLO")
  contacto: "",
  prefixoFicheiro: "Certificado_CAO_XXII",
};
