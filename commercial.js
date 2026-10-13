// ============================================================
// SISTEMA INTERNO MVT ADVOGADOS - MODULO COMERCIAL & PIPELINE
// Controle Executivo de Clientes e Prontos para Fechar
// Baseado na Planilha do Comercial (Augusto)
// ============================================================

// Clientes Padrao Iniciais Extraidos da Planilha do Comercial
const DEFAULT_COMMERCIAL_CLIENTS = [
    {
        "id":  "comm-0001",
        "name":  "Erik",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Pronto para Fechar",
        "nextStep":  "Acompanhamento comercial",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0002",
        "name":  "Luzia Pinheiro",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Pronto para Fechar",
        "nextStep":  "Acompanhamento comercial",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0003",
        "name":  "Elisangela Guimaraes",
        "phone":  "",
        "area":  "EstatutÃ¡ria",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0004",
        "name":  "Meire",
        "phone":  "",
        "area":  "EstatutÃ¡ria",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0005",
        "name":  "Cristina Kelly",
        "phone":  "",
        "area":  "EstatutÃ¡ria",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0006",
        "name":  "Idiomas",
        "phone":  "",
        "area":  "EstatutÃ¡ria",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0007",
        "name":  "Valquiria",
        "phone":  "",
        "area":  "EstatutÃ¡ria",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0008",
        "name":  "Ellen",
        "phone":  "",
        "area":  "EstatutÃ¡ria",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0009",
        "name":  "Alexandre",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0010",
        "name":  "Iran Duarte",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0011",
        "name":  "Maria Helena (Indicação cliente ana)",
        "phone":  "",
        "area":  "PrevidenciÃ¡rio",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0012",
        "name":  "José edivanildo lima Aragão (Edy)",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0013",
        "name":  "Vagner",
        "phone":  "",
        "area":  "PrevidenciÃ¡rio",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0014",
        "name":  "Jessika",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0015",
        "name":  "Juliana",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Não fechou perdido",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0016",
        "name":  "Veronica",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0017",
        "name":  "Cleonice",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0018",
        "name":  "jeeh",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0019",
        "name":  "Lúcia Aparecida",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0020",
        "name":  "Isabel",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0021",
        "name":  "Ilmara",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0022",
        "name":  "Luzia Pinheiro",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0023",
        "name":  "Alex",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0024",
        "name":  "Denis Daniel",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0025",
        "name":  "Ieda",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0026",
        "name":  "Wirlageremia",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0027",
        "name":  "Francisco",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0028",
        "name":  "José Welli",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Pronto para Fechar",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0029",
        "name":  "Vandesil",
        "phone":  "",
        "area":  "PrevidenciÃ¡rio",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0030",
        "name":  "Eliane",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Pronto para Fechar",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0031",
        "name":  "Luciene Maria",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0032",
        "name":  "Michelle",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0033",
        "name":  "Mery",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0034",
        "name":  "Fátima",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Não Resondeu",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0035",
        "name":  "Marcelo",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0036",
        "name":  "Atais",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Avançou",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0037",
        "name":  "Alessandro Paçoca",
        "phone":  "",
        "area":  "PrevidenciÃ¡rio",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0038",
        "name":  "Meiry",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Avançou",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0039",
        "name":  "Willian Amaral",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0040",
        "name":  "Fernanda",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0041",
        "name":  "ALEXSANDRA CUNHA",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0042",
        "name":  "Andrea Carla 🥰",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Pronto para Fechar",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0043",
        "name":  "Gi 🌻",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0044",
        "name":  "Fernanda",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0045",
        "name":  "Priscylla",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0046",
        "name":  "Valéria",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0047",
        "name":  "julimarcarvalho14",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0048",
        "name":  "Mirian🥰🍀",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0049",
        "name":  "Shirley",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0050",
        "name":  "evanir brizola",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0051",
        "name":  "Rosana",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0052",
        "name":  "Thalia",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0053",
        "name":  "Eliane",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0054",
        "name":  "Adriana",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0055",
        "name":  "ANA",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0056",
        "name":  "lourenço",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0057",
        "name":  "Netto",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0058",
        "name":  "Rosana",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0059",
        "name":  "Ednalva",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0060",
        "name":  "Ramos",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Desqualificado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0061",
        "name":  "Maria Santos",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0062",
        "name":  "Pedro Adão Risse",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Fechado",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0063",
        "name":  "lucianapereiraporto13",
        "phone":  "",
        "area":  "Aux Acidente",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0064",
        "name":  "Rosi",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0065",
        "name":  "Victor",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0066",
        "name":  "Eliane",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0067",
        "name":  "Virgilia",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0068",
        "name":  "Araciane",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0069",
        "name":  "Amandha",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0070",
        "name":  "Valéria - indicação FRAN",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0071",
        "name":  "Vera - indicação FRAN",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0072",
        "name":  "Gilson",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0073",
        "name":  "vanessa CP",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0074",
        "name":  "Márcia",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando Reunião",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0075",
        "name":  "Marciano",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0076",
        "name":  "🩺Alexandra 🩺",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando ReuniÃ£o",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0077",
        "name":  "Erik",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Aguardando DOCS",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0078",
        "name":  "Caroline Coelho Borba",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0079",
        "name":  "Thiago Cardoso",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0080",
        "name":  "Alexandre Brito",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0081",
        "name":  "michelle",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0082",
        "name":  "Roseli Veranieiro",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Acompanhamento",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0083",
        "name":  "Zeneide Alves",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Trabalhista",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0084",
        "name":  "Marcos Evangelista",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Trabalhista",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0085",
        "name":  "luzia Nazaré",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Trabalhista",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    },
    {
        "id":  "comm-0086",
        "name":  "jocimar",
        "phone":  "",
        "area":  "Trabalhista",
        "status":  "Follow-up",
        "nextStep":  "Trabalhista",
        "notes":  "",
        "date":  "2026-10-11",
        "responsible":  "Augusto"
    }
];

// ESTADO DO MODULO COMERCIAL
const COMMERCIAL_STATE = {
  clients: [],
  subtab: 'leads', // 'leads' como padrão para exibir todos os clientes
  search: '',
  area: 'all',
  density: localStorage.getItem('mvt_comm_density') || 'comfortable',
  zoom: parseInt(localStorage.getItem('mvt_comm_zoom') || '100', 10),
  panoramic: localStorage.getItem('mvt_comm_panoramic') === 'true',
  taskModalTab: 'form',
  mindchatConnected: localStorage.getItem('mvt_commercial_mindchat_connected') !== 'false'
};
window.COMMERCIAL_STATE = COMMERCIAL_STATE;

// Função auxiliar para higienizar dados de clientes e garantir histórico de tarefas
function sanitizeCommercialClient(c) {
  if (!c) return c;
  if (!Array.isArray(c.taskHistory)) c.taskHistory = [];

  // Normalização estrita para as 3 Áreas solicitadas: Trabalhista (Amarela), Cível (Azul), Previdenciário (Roxo)
  const aLower = (c.area || '').toLowerCase();
  if (aLower.includes('cív') || aLower.includes('civ')) {
    c.area = 'Cível';
  } else if (aLower.includes('prev') || aLower.includes('aposent') || aLower.includes('aux')) {
    c.area = 'Previdenciário';
  } else {
    c.area = 'Trabalhista';
  }

  // Normalização para os Tipos de Atendimento: Lead Novo, Follow-up, Indicação, Pronto para Fechar
  const sLower = (c.status || '').toLowerCase();
  if (sLower.includes('fechar') || sLower.includes('pronto')) {
    c.status = 'Pronto para Fechar';
  } else if (sLower.includes('novo') || sLower.includes('lead')) {
    c.status = 'Lead Novo';
  } else if (sLower.includes('indica')) {
    c.status = 'Indicação';
  } else {
    c.status = 'Follow-up';
  }

  // Se o cliente possui uma tarefa ativa, assegura que ela esteja registrada no histórico permanente
  if (c.task && c.task.dueDate) {
    const taskId = c.task.id || ('task-' + (c.id || 'client'));
    if (!c.taskHistory.some(h => h.id === taskId)) {
      c.taskHistory.unshift({
        id: taskId,
        action: c.task.action || c.nextStep || 'Compromisso Comercial',
        dueDate: c.task.dueDate,
        dueTime: c.task.dueTime || '10:00',
        endTime: c.task.endTime || calculateEndTime30m(c.task.dueTime || '10:00'),
        duration: 30,
        notes: c.task.notes || '',
        status: c.task.status || 'pending',
        createdAt: c.task.createdAt || new Date().toISOString()
      });
    }
  }

  return c;
}

// Carregar dados salvos no navegador (ou os dados padrao extraidos da planilha)
function loadCommercialData() {
  try {
    const saved = localStorage.getItem('mvt_commercial_clients');
    if (saved) {
      let parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Remove quaisquer leads brutos importados indevidamente do MindChat (mantém apenas clientes qualificados)
        parsed = parsed
          .filter(c => !c.id || !c.id.startsWith('comm-mindchat-'))
          .map(sanitizeCommercialClient);
        if (parsed.length > 0) {
          COMMERCIAL_STATE.clients = parsed;
          saveCommercialData();
          return;
        }
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar clientes comerciais do localStorage:', e);
  }
  // Se nao houver dados salvos ou estiver vazio, usa a base inicial
  COMMERCIAL_STATE.clients = JSON.parse(JSON.stringify(DEFAULT_COMMERCIAL_CLIENTS)).map(sanitizeCommercialClient);
  saveCommercialData();
}

// Salvar dados no localStorage
function saveCommercialData() {
  try {
    localStorage.setItem('mvt_commercial_clients', JSON.stringify(COMMERCIAL_STATE.clients));
  } catch (e) {
    console.warn('Erro ao salvar clientes comerciais:', e);
  }
}

// ========================================================
// CONTROLES DE DISPOSIÇÃO & ZOOM DA TABELA COMERCIAL
// ========================================================
function setCommercialTableDensity(density) {
  COMMERCIAL_STATE.density = density;
  try {
    localStorage.setItem('mvt_comm_density', density);
  } catch (e) {}
  updateCommercialDisplayControlsUi();
  const container = document.getElementById('comm-table-view-container');
  if (container) {
    if (density === 'compact') {
      container.classList.add('density-compact');
    } else {
      container.classList.remove('density-compact');
    }
  }
}
window.setCommercialTableDensity = setCommercialTableDensity;

function changeCommercialTableZoom(delta) {
  let current = COMMERCIAL_STATE.zoom || 100;
  current += delta;
  if (current < 70) current = 70;
  if (current > 130) current = 130;
  COMMERCIAL_STATE.zoom = current;
  try {
    localStorage.setItem('mvt_comm_zoom', String(current));
  } catch (e) {}
  applyCommercialTableZoom();
}
window.changeCommercialTableZoom = changeCommercialTableZoom;

function resetCommercialTableZoom() {
  COMMERCIAL_STATE.zoom = 100;
  try {
    localStorage.setItem('mvt_comm_zoom', '100');
  } catch (e) {}
  applyCommercialTableZoom();
}
window.resetCommercialTableZoom = resetCommercialTableZoom;

function applyCommercialTableZoom() {
  const display = document.getElementById('comm-zoom-display');
  if (display) display.textContent = `${COMMERCIAL_STATE.zoom}%`;
  const container = document.getElementById('comm-table-view-container');
  if (container) {
    container.style.zoom = `${(COMMERCIAL_STATE.zoom || 100) / 100}`;
  }
}
window.applyCommercialTableZoom = applyCommercialTableZoom;

function toggleCommercialPanoramicView() {
  COMMERCIAL_STATE.panoramic = !COMMERCIAL_STATE.panoramic;
  try {
    localStorage.setItem('mvt_comm_panoramic', String(COMMERCIAL_STATE.panoramic));
  } catch (e) {}
  updateCommercialPanoramicUi();
}
window.toggleCommercialPanoramicView = toggleCommercialPanoramicView;

function updateCommercialPanoramicUi() {
  const sec = document.querySelector('.section-commercial') || document.getElementById('tab-comercial');
  const btn = document.getElementById('btn-comm-panoramic-toggle');
  const text = document.getElementById('comm-panoramic-text');
  if (COMMERCIAL_STATE.panoramic) {
    if (sec) sec.classList.add('commercial-panoramic');
    if (btn) btn.classList.add('active');
    if (text) text.textContent = 'Visão Padrão';
  } else {
    if (sec) sec.classList.remove('commercial-panoramic');
    if (btn) btn.classList.remove('active');
    if (text) text.textContent = 'Visão Panorâmica';
  }
}
window.updateCommercialPanoramicUi = updateCommercialPanoramicUi;

function updateCommercialDisplayControlsUi() {
  const btnCompact = document.getElementById('btn-density-compact');
  const btnComfortable = document.getElementById('btn-density-comfortable');
  if (btnCompact && btnComfortable) {
    if (COMMERCIAL_STATE.density === 'compact') {
      btnCompact.classList.add('active');
      btnComfortable.classList.remove('active');
    } else {
      btnComfortable.classList.add('active');
      btnCompact.classList.remove('active');
    }
  }
  applyCommercialTableZoom();
  updateCommercialPanoramicUi();
}
window.updateCommercialDisplayControlsUi = updateCommercialDisplayControlsUi;

// Alternar e fechar o menu popover de configuracoes da tabela
function toggleTableViewConfigDropdown(event) {
  if (event) {
    event.stopPropagation();
  }
  const menu = document.getElementById('comm-table-view-menu');
  const btn = document.getElementById('btn-table-view-config');
  if (!menu) return;
  const isHidden = menu.style.display === 'none' || !menu.style.display;
  if (isHidden) {
    menu.style.display = 'flex';
    if (btn) btn.classList.add('active');
    closeCommercialFilterDropdown();
  } else {
    menu.style.display = 'none';
    if (btn) btn.classList.remove('active');
  }
}
window.toggleTableViewConfigDropdown = toggleTableViewConfigDropdown;

function closeTableViewConfigDropdown() {
  const menu = document.getElementById('comm-table-view-menu');
  const btn = document.getElementById('btn-table-view-config');
  if (menu) menu.style.display = 'none';
  if (btn) btn.classList.remove('active');
}
window.closeTableViewConfigDropdown = closeTableViewConfigDropdown;

// Alternar e fechar o menu popover de filtros do comercial
function toggleCommercialFilterDropdown(event) {
  if (event) {
    event.stopPropagation();
  }
  const menu = document.getElementById('comm-filter-menu');
  const btn = document.getElementById('btn-open-comm-filter');
  if (!menu) return;
  const isHidden = menu.style.display === 'none' || !menu.style.display;
  if (isHidden) {
    menu.style.display = 'flex';
    if (btn) btn.classList.add('active');
    closeTableViewConfigDropdown();
  } else {
    menu.style.display = 'none';
    if (btn) btn.classList.remove('active');
  }
}
window.toggleCommercialFilterDropdown = toggleCommercialFilterDropdown;

function closeCommercialFilterDropdown() {
  const menu = document.getElementById('comm-filter-menu');
  const btn = document.getElementById('btn-open-comm-filter');
  if (menu) menu.style.display = 'none';
  if (btn) btn.classList.remove('active');
}
window.closeCommercialFilterDropdown = closeCommercialFilterDropdown;

function onCommercialAreaFilterChange(val) {
  COMMERCIAL_STATE.area = val;
  renderCommercialApp();
}
window.onCommercialAreaFilterChange = onCommercialAreaFilterChange;

function onCommercialStatusFilterChange(val) {
  COMMERCIAL_STATE.statusFilter = val;
  renderCommercialApp();
}
window.onCommercialStatusFilterChange = onCommercialStatusFilterChange;

function onCommercialTaskFilterChange(val) {
  COMMERCIAL_STATE.taskFilter = val;
  renderCommercialApp();
}
window.onCommercialTaskFilterChange = onCommercialTaskFilterChange;

function clearCommercialFilters() {
  COMMERCIAL_STATE.area = 'all';
  COMMERCIAL_STATE.statusFilter = 'all';
  COMMERCIAL_STATE.taskFilter = 'all';

  const areaSelect = document.getElementById('comm-area-filter');
  const statusSelect = document.getElementById('comm-status-filter');
  const taskSelect = document.getElementById('comm-task-filter');
  if (areaSelect) areaSelect.value = 'all';
  if (statusSelect) statusSelect.value = 'all';
  if (taskSelect) taskSelect.value = 'all';

  renderCommercialApp();
  closeCommercialFilterDropdown();
}
window.clearCommercialFilters = clearCommercialFilters;

// Renderizar chips de filtros ativos do comercial
function renderCommercialFilterChips() {
  const container = document.getElementById('comm-active-filter-chips');
  if (!container) return;
  container.innerHTML = '';

  const chips = [];
  if (COMMERCIAL_STATE.area && COMMERCIAL_STATE.area !== 'all') {
    chips.push({ key: 'area', label: `Área: ${COMMERCIAL_STATE.area}` });
  }
  if (COMMERCIAL_STATE.statusFilter && COMMERCIAL_STATE.statusFilter !== 'all') {
    chips.push({ key: 'status', label: `Status: ${COMMERCIAL_STATE.statusFilter}` });
  }
  if (COMMERCIAL_STATE.taskFilter && COMMERCIAL_STATE.taskFilter !== 'all') {
    const taskLabels = {
      has_task: 'Com Tarefa',
      overdue: 'Tarefa Vencida',
      no_task: 'Sem Tarefa'
    };
    chips.push({ key: 'task', label: taskLabels[COMMERCIAL_STATE.taskFilter] || 'Tarefa' });
  }

  chips.forEach(c => {
    const tag = document.createElement('div');
    tag.className = 'active-filter-tag';
    tag.innerHTML = `<span>${escapeHtml(c.label)}</span><button type="button" class="tag-remove-btn" title="Remover filtro">&times;</button>`;
    tag.querySelector('.tag-remove-btn').addEventListener('click', () => {
      if (c.key === 'area') {
        COMMERCIAL_STATE.area = 'all';
        const el = document.getElementById('comm-area-filter');
        if (el) el.value = 'all';
      }
      if (c.key === 'status') {
        COMMERCIAL_STATE.statusFilter = 'all';
        const el = document.getElementById('comm-status-filter');
        if (el) el.value = 'all';
      }
      if (c.key === 'task') {
        COMMERCIAL_STATE.taskFilter = 'all';
        const el = document.getElementById('comm-task-filter');
        if (el) el.value = 'all';
      }
      renderCommercialApp();
    });
    container.appendChild(tag);
  });
}
window.renderCommercialFilterChips = renderCommercialFilterChips;

// Fechar menus de configuracoes e filtros ao clicar fora
document.addEventListener('click', function(e) {
  const filterWrapper = document.querySelector('.comm-filter-dropdown-wrapper');
  if (filterWrapper && !filterWrapper.contains(e.target)) {
    closeCommercialFilterDropdown();
  }

  const viewWrapper = document.querySelector('.comm-view-settings-dropdown-wrapper');
  if (viewWrapper && !viewWrapper.contains(e.target)) {
    closeTableViewConfigDropdown();
  }
});

// Fechar com tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCommercialFilterDropdown();
    closeTableViewConfigDropdown();
  }
});

// ========================================================
// CONTROLE DE CONEXÃO E SINCRONIZAÇÃO COM MINDCHAT (WHATSAPP)
// ========================================================

// Atualizar interface visual do botão de status do MindChat no Comercial (Verde / Vermelho)
function updateCommercialMindChatButtonUi() {
  const btn = document.getElementById('btn-mindchat-commercial-toggle');
  const label = document.getElementById('mindchat-commercial-label');
  if (!btn) return;
  const isConnected = COMMERCIAL_STATE.mindchatConnected !== false;

  if (isConnected) {
    btn.className = 'btn-automation-toggle active';
    if (label) label.textContent = 'MindChat Conectado';
    btn.title = 'MindChat ativo e conectado. Clique para pausar a integração.';
  } else {
    btn.className = 'btn-automation-toggle inactive';
    if (label) label.textContent = 'MindChat Desconectado';
    btn.title = 'MindChat desconectado / pausado. Clique para reativar a integração.';
  }
}
window.updateCommercialMindChatButtonUi = updateCommercialMindChatButtonUi;

// Configuração do Modal Popup de Confirmação do MindChat
function setupCommercialMindChatToggle() {
  const toggleBtn = document.getElementById('btn-mindchat-commercial-toggle');
  const modal = document.getElementById('modal-mindchat-commercial-confirm');
  const btnCancel = document.getElementById('btn-cancel-mindchat-modal');
  const btnConfirm = document.getElementById('btn-confirm-mindchat-action');
  const icon = document.getElementById('confirm-mindchat-icon');
  const title = document.getElementById('confirm-mindchat-title');
  const desc = document.getElementById('confirm-mindchat-desc');

  if (!toggleBtn || !modal) return;

  updateCommercialMindChatButtonUi();

  const closeModal = () => modal.classList.remove('active');

  btnCancel?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyConnected = COMMERCIAL_STATE.mindchatConnected !== false;

    if (isCurrentlyConnected) {
      if (icon) icon.textContent = '⚠️';
      if (title) title.textContent = 'Pausar Conexão com o MindChat?';
      if (desc) desc.textContent = 'Ao pausar a conexão, o sistema não sincronizará novos leads e clientes do WhatsApp no MindChat diretamente para o pipeline comercial.';
      if (btnConfirm) {
        btnConfirm.textContent = 'Sim, Pausar Conexão';
        btnConfirm.style.background = '#ef4444';
        btnConfirm.style.borderColor = '#ef4444';
      }
    } else {
      if (icon) icon.textContent = '⚡';
      if (title) title.textContent = 'Reconectar Integração MindChat?';
      if (desc) desc.textContent = 'Ao reconectar, o Sistema Interno retomará a sincronização com a API do MindChat (Instância Mind17) e buscará os leads do WhatsApp.';
      if (btnConfirm) {
        btnConfirm.textContent = 'Sim, Reconectar MindChat';
        btnConfirm.style.background = '#10b981';
        btnConfirm.style.borderColor = '#10b981';
      }
    }

    modal.classList.add('active');
  });

  btnConfirm?.addEventListener('click', () => {
    const isCurrentlyConnected = COMMERCIAL_STATE.mindchatConnected !== false;
    const nextState = !isCurrentlyConnected;
    COMMERCIAL_STATE.mindchatConnected = nextState;
    localStorage.setItem('mvt_commercial_mindchat_connected', nextState ? 'true' : 'false');
    localStorage.setItem('mvt_global_mindchat_connected', nextState ? 'true' : 'false');

    if (typeof STATE !== 'undefined') {
      STATE.mindchatConnected = nextState;
      if (typeof updateGlobalMindChatButtonUi === 'function') {
        updateGlobalMindChatButtonUi();
      }
    }

    updateCommercialMindChatButtonUi();
    closeModal();

    if (nextState) {
      if (typeof showToast === 'function') {
        showToast('⚡ Conexão com o MindChat ativa!', 'success', 3000);
      }
    } else {
      if (typeof showToast === 'function') {
        showToast('⏸️ Conexão com o MindChat pausada no Comercial.', 'warning', 3000);
      }
    }
  });
}

// Status da conexão com MindChat (apenas informativo para a aba Comercial)
function syncMindChatToCommercial() {
  if (COMMERCIAL_STATE.mindchatConnected === false) {
    if (typeof showToast === 'function') {
      showToast('⚠️ O MindChat está pausado no Comercial. Clique no botão de conexão para reativar.', 'warning', 3000);
    }
  } else {
    if (typeof showToast === 'function') {
      showToast('✅ Conexão ativa com o MindChat (Instância Mind17).', 'success', 3000);
    }
  }
}
window.syncMindChatToCommercial = syncMindChatToCommercial;

// Sistema de Histórico de Alterações (Undo / Redo) e Navegação
const COMMERCIAL_ACTION_STACK = {
  undo: [],
  redo: []
};

// Grava snapshot para o botão de desfazer (← Voltar como Histórico)
function recordCommercialUndo(description = 'Alteração na planilha') {
  try {
    if (!COMMERCIAL_STATE.clients) return;
    COMMERCIAL_ACTION_STACK.undo.push({
      description,
      clients: JSON.parse(JSON.stringify(COMMERCIAL_STATE.clients)),
      subtab: COMMERCIAL_STATE.subtab,
      timestamp: Date.now()
    });
    if (COMMERCIAL_ACTION_STACK.undo.length > 50) {
      COMMERCIAL_ACTION_STACK.undo.shift();
    }
    // Uma nova ação limpa a pilha de refazer (redo)
    COMMERCIAL_ACTION_STACK.redo = [];
    updateCommercialNavControls();
  } catch (err) {
    console.warn('Erro ao gravar histórico:', err);
  }
}
window.recordCommercialUndo = recordCommercialUndo;

// Controle de Histórico de Navegação de Abas
const COMMERCIAL_NAV = {
  history: ['leads'],
  index: 0
};

// Alternar sub-aba comercial ('fechar', 'leads', 'kanban', 'tarefas') com histórico
function setCommercialSubtab(subtab, recordHistory = true) {
  if (!subtab) return;
  COMMERCIAL_STATE.subtab = subtab;

  if (recordHistory !== false) {
    if (!COMMERCIAL_NAV.history.length || COMMERCIAL_NAV.history[COMMERCIAL_NAV.index] !== subtab) {
      COMMERCIAL_NAV.history = COMMERCIAL_NAV.history.slice(0, COMMERCIAL_NAV.index + 1);
      COMMERCIAL_NAV.history.push(subtab);
      COMMERCIAL_NAV.index = COMMERCIAL_NAV.history.length - 1;
    }
  }

  // Atualiza botoes internos do Comercial
  document.querySelectorAll('.comm-view-btn').forEach(btn => {
    const target = btn.dataset.subtab || btn.dataset.subtabTarget || btn.dataset.commView || (btn.id || '').replace('btn-comm-view-', '').replace('comm-view-', '');
    btn.classList.toggle('active', target === subtab);
  });

  // Atualiza sub-itens do menu lateral esquerdo
  const sideFechar = document.getElementById('side-item-comercial-fechar');
  const sideLeads = document.getElementById('side-item-comercial-leads');
  const sideTarefas = document.getElementById('side-item-comercial-tarefas');
  if (sideFechar) sideFechar.classList.toggle('active', subtab === 'fechar');
  if (sideLeads) sideLeads.classList.toggle('active', subtab === 'leads');
  if (sideTarefas) sideTarefas.classList.toggle('active', subtab === 'tarefas');

  renderCommercialApp();
}
window.setCommercialSubtab = setCommercialSubtab;

// Seta Voltar (←): Funciona como histórico de alterações (Undo) e navegação
function commercialGoBack() {
  // 1. Se houver alterações no histórico (Undo), desfaz a última alteração
  if (COMMERCIAL_ACTION_STACK.undo.length > 0) {
    const previousSnapshot = COMMERCIAL_ACTION_STACK.undo.pop();
    COMMERCIAL_ACTION_STACK.redo.push({
      description: previousSnapshot.description,
      clients: JSON.parse(JSON.stringify(COMMERCIAL_STATE.clients)),
      subtab: COMMERCIAL_STATE.subtab,
      timestamp: Date.now()
    });

    COMMERCIAL_STATE.clients = previousSnapshot.clients;
    saveCommercialData();

    if (previousSnapshot.subtab && previousSnapshot.subtab !== COMMERCIAL_STATE.subtab) {
      setCommercialSubtab(previousSnapshot.subtab, false);
    } else {
      renderCommercialApp();
    }
    updateCommercialNavControls();

    if (typeof showToast === 'function') {
      showToast(`↩ Desfeito: ${previousSnapshot.description}`, 'info', 2200);
    }
    return;
  }

  // 2. Se não houver alteração para desfazer, volta de visão (sub-aba)
  if (COMMERCIAL_NAV.index > 0) {
    COMMERCIAL_NAV.index--;
    const prevSubtab = COMMERCIAL_NAV.history[COMMERCIAL_NAV.index];
    setCommercialSubtab(prevSubtab, false);
  } else if (COMMERCIAL_STATE.subtab !== 'leads') {
    setCommercialSubtab('leads', false);
  }
  updateCommercialNavControls();
}
window.commercialGoBack = commercialGoBack;

// Seta Avançar (→): Funciona como refazer histórico (Redo) e avançar visão
function commercialGoForward() {
  // 1. Se houver ação desfeita no histórico (Redo), reaplica a alteração
  if (COMMERCIAL_ACTION_STACK.redo.length > 0) {
    const nextSnapshot = COMMERCIAL_ACTION_STACK.redo.pop();
    COMMERCIAL_ACTION_STACK.undo.push({
      description: nextSnapshot.description,
      clients: JSON.parse(JSON.stringify(COMMERCIAL_STATE.clients)),
      subtab: COMMERCIAL_STATE.subtab,
      timestamp: Date.now()
    });

    COMMERCIAL_STATE.clients = nextSnapshot.clients;
    saveCommercialData();

    if (nextSnapshot.subtab && nextSnapshot.subtab !== COMMERCIAL_STATE.subtab) {
      setCommercialSubtab(nextSnapshot.subtab, false);
    } else {
      renderCommercialApp();
    }
    updateCommercialNavControls();

    if (typeof showToast === 'function') {
      showToast(`↪ Refeito: ${nextSnapshot.description}`, 'info', 2200);
    }
    return;
  }

  // 2. Se não houver redo, avança na navegação de abas
  if (COMMERCIAL_NAV.index < COMMERCIAL_NAV.history.length - 1) {
    COMMERCIAL_NAV.index++;
    const nextSubtab = COMMERCIAL_NAV.history[COMMERCIAL_NAV.index];
    setCommercialSubtab(nextSubtab, false);
  }
  updateCommercialNavControls();
}
window.commercialGoForward = commercialGoForward;

// Atualiza o estado visual dos controles de navegação e botões de seta minimalistas
function updateCommercialNavControls() {
  const isLeads = (COMMERCIAL_STATE.subtab || 'leads') === 'leads';
  const btnBack = document.getElementById('btn-comm-nav-back');
  const btnForward = document.getElementById('btn-comm-nav-forward');

  const hasUndo = COMMERCIAL_ACTION_STACK.undo.length > 0;
  const canNavBack = COMMERCIAL_NAV.index > 0 || !isLeads;
  const backEnabled = hasUndo || canNavBack;

  if (btnBack) {
    btnBack.disabled = !backEnabled;
    btnBack.classList.toggle('disabled', !backEnabled);
    if (hasUndo) {
      const lastAction = COMMERCIAL_ACTION_STACK.undo[COMMERCIAL_ACTION_STACK.undo.length - 1];
      btnBack.title = `Desfazer: ${lastAction.description} (Ctrl+Z)`;
    } else {
      btnBack.title = 'Voltar para Clientes';
    }
  }

  const hasRedo = COMMERCIAL_ACTION_STACK.redo.length > 0;
  const canNavForward = COMMERCIAL_NAV.index < COMMERCIAL_NAV.history.length - 1;
  const forwardEnabled = hasRedo || canNavForward;

  if (btnForward) {
    btnForward.disabled = !forwardEnabled;
    btnForward.classList.toggle('disabled', !forwardEnabled);
    if (hasRedo) {
      const nextAction = COMMERCIAL_ACTION_STACK.redo[COMMERCIAL_ACTION_STACK.redo.length - 1];
      btnForward.title = `Refazer: ${nextAction.description} (Ctrl+Y)`;
    } else {
      btnForward.title = 'Avançar visão (→)';
    }
  }
}
window.updateCommercialNavControls = updateCommercialNavControls;

// Gerenciamento da Duração Padrão de Tarefas (15m, 30m, 45m, 60m)
if (!COMMERCIAL_STATE.defaultDuration) {
  COMMERCIAL_STATE.defaultDuration = parseInt(localStorage.getItem('mvt_comm_default_duration') || '30', 10);
}

function updateCommercialDurationUI() {
  const lbl = document.getElementById('comm-default-duration-label');
  if (lbl) {
    lbl.textContent = `${COMMERCIAL_STATE.defaultDuration}m`;
  }
}
window.updateCommercialDurationUI = updateCommercialDurationUI;

function cycleCommercialDefaultDuration() {
  const durations = [15, 30, 45, 60];
  const cur = COMMERCIAL_STATE.defaultDuration || 30;
  const idx = durations.indexOf(cur);
  const next = durations[(idx + 1) % durations.length];
  COMMERCIAL_STATE.defaultDuration = next;
  localStorage.setItem('mvt_comm_default_duration', String(next));
  updateCommercialDurationUI();
  if (typeof showToast === 'function') {
    showToast(`⏱️ Duração da pauta ajustada para ${next} minutos`, 'info', 2000);
  }
  renderCommercialApp();
}
window.cycleCommercialDefaultDuration = cycleCommercialDefaultDuration;

// Utilitário de data hoje YYYY-MM-DD
function getTodayYmd() {
  return new Date().toISOString().split('T')[0];
}
window.getTodayYmd = getTodayYmd;

// Renderizacao geral do modulo comercial
function renderCommercialApp() {
  const clients = COMMERCIAL_STATE.clients;

  // 1. Atualizar KPIs no banner superior
  const totalCount = clients.length;
  const fecharCount = clients.filter(c => c.status === 'Pronto para Fechar' || c.status === 'Prontos para Fechar').length;
  const docsCount = clients.filter(c => c.status === 'Aguardando DOCS').length;
  const followupCount = clients.filter(c => c.status === 'Follow-up' || c.status === 'Aguardando Reunião' || c.status === 'Lead Novo').length;
  const fechadosCount = clients.filter(c => c.status === 'Fechado').length;

  const kpiTotal = document.getElementById('comm-kpi-total');
  const kpiFechar = document.getElementById('comm-kpi-fechar');
  const kpiDocs = document.getElementById('comm-kpi-docs');
  const kpiFollowup = document.getElementById('comm-kpi-followup');
  const kpiFechados = document.getElementById('comm-kpi-fechados') || document.getElementById('comm-kpi-fechado');

  if (kpiTotal) kpiTotal.textContent = totalCount;
  if (kpiFechar) kpiFechar.textContent = fecharCount;
  if (kpiDocs) kpiDocs.textContent = docsCount;
  if (kpiFollowup) kpiFollowup.textContent = followupCount;
  if (kpiFechados) kpiFechados.textContent = fechadosCount;

  // Atualiza título do topo dinamicamente conforme a sub-aba
  const titleEl = document.getElementById('comm-page-title');
  const subtitleEl = document.getElementById('comm-page-subtitle');
  if (titleEl && subtitleEl) {
    if (COMMERCIAL_STATE.subtab === 'fechar') {
      titleEl.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e5b966" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:7px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><span>Prontos para Fechar</span>`;
      subtitleEl.textContent = 'Clientes qualificados em fase decisiva e prontos para fechamento de contrato';
    } else if (COMMERCIAL_STATE.subtab === 'tarefas') {
      titleEl.innerHTML = 'Tarefas';
      subtitleEl.textContent = 'Pauta executiva de reuniões e compromissos agendados';
    } else if (COMMERCIAL_STATE.subtab === 'kanban') {
      titleEl.innerHTML = 'Funil Comercial';
      subtitleEl.textContent = 'Visualização em quadro Kanban das etapas de atendimento e prospecção';
    } else {
      titleEl.innerHTML = 'Clientes';
      subtitleEl.textContent = 'Gestão de contatos, próximos passos e agendamento de tarefas comerciais';
    }
  }

  // Atualiza indicador de duração da pauta
  updateCommercialDurationUI();

  // 2. Atualizar controles de navegação e retorno (Voltar / Ir)
  updateCommercialNavControls();

  // 3. Controlar visibilidade de Containers (Tabela vs Kanban vs Tarefas)
  const isKanban = COMMERCIAL_STATE.subtab === 'kanban';
  const isTarefas = COMMERCIAL_STATE.subtab === 'tarefas';
  const tableContainer = document.getElementById('comm-table-view-container');
  const kanbanContainer = document.getElementById('comm-kanban-view-container');
  const tasksContainer = document.getElementById('comm-tasks-view-container');
  const quickAddWrapper = document.getElementById('comm-quick-add-wrapper');

  if (tableContainer) tableContainer.style.display = (!isKanban && !isTarefas) ? 'block' : 'none';
  if (kanbanContainer) kanbanContainer.style.display = isKanban ? 'block' : 'none';
  if (tasksContainer) tasksContainer.style.display = isTarefas ? 'block' : 'none';
  // O bloco de Adicionar Novo Cliente é exibido SOMENTE na aba principal de Clientes (leads)
  if (quickAddWrapper) quickAddWrapper.style.display = (COMMERCIAL_STATE.subtab === 'leads') ? 'block' : 'none';

  if (isTarefas) {
    renderCommercialTasksView();
    return;
  }

  // 3. Filtrar clientes para a visao de lista/tabela
  let filtered = [...clients];

  // Se sub-aba for "fechar", filtra apenas quem esta pronto para fechar
  if (COMMERCIAL_STATE.subtab === 'fechar') {
    filtered = filtered.filter(c => c.prontoParaFechar || c.status === 'Pronto para Fechar' || c.status === 'Prontos para Fechar');
  }

  // Filtro de Area
  if (COMMERCIAL_STATE.area && COMMERCIAL_STATE.area !== 'all') {
    const fAreaLower = COMMERCIAL_STATE.area.toLowerCase();
    filtered = filtered.filter(c => {
      const cArea = (c.area || '').toLowerCase();
      if (fAreaLower.includes('trab/prev') || fAreaLower.includes('trab')) {
        return cArea.includes('trab');
      }
      if (fAreaLower.includes('prev')) return cArea.includes('prev');
      if (fAreaLower.includes('estatut')) return cArea.includes('estatut');
      if (fAreaLower.includes('aux')) return cArea.includes('aux');
      return cArea.includes(fAreaLower);
    });
  }

  // Filtro de Status Comercial
  if (COMMERCIAL_STATE.statusFilter && COMMERCIAL_STATE.statusFilter !== 'all') {
    filtered = filtered.filter(c => c.status === COMMERCIAL_STATE.statusFilter);
  }

  // Filtro de Tarefas de 30m
  if (COMMERCIAL_STATE.taskFilter && COMMERCIAL_STATE.taskFilter !== 'all') {
    const todayStr = getTodayYmd();
    if (COMMERCIAL_STATE.taskFilter === 'has_task') {
      filtered = filtered.filter(c => c.task && c.task.dueDate && c.task.status !== 'done');
    } else if (COMMERCIAL_STATE.taskFilter === 'overdue') {
      filtered = filtered.filter(c => c.task && c.task.dueDate && c.task.dueDate < todayStr && c.task.status !== 'done');
    } else if (COMMERCIAL_STATE.taskFilter === 'no_task') {
      filtered = filtered.filter(c => !c.task || !c.task.dueDate || c.task.status === 'done');
    }
  }

  // Filtro de Busca textual (nome, telefone, notas, proximo passo)
  const q = (COMMERCIAL_STATE.search || '').trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(c => 
      (c.name || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q) ||
      (c.notes || '').toLowerCase().includes(q) ||
      (c.nextStep || '').toLowerCase().includes(q)
    );
  }

  // 4. Atualizar contador de resultados na barra de ferramentas (com destaque bold igual a pauta)
  const counterPillText = document.getElementById('comm-counter-text');
  const counterPill = document.getElementById('comm-counter-pill');
  const countBadge = document.getElementById('comm-count-badge');
  const filterBadge = document.getElementById('comm-filter-counter-badge');

  let activeFiltersCount = 0;
  if (COMMERCIAL_STATE.area && COMMERCIAL_STATE.area !== 'all') activeFiltersCount++;
  if (COMMERCIAL_STATE.statusFilter && COMMERCIAL_STATE.statusFilter !== 'all') activeFiltersCount++;
  if (COMMERCIAL_STATE.taskFilter && COMMERCIAL_STATE.taskFilter !== 'all') activeFiltersCount++;

  if (filterBadge) {
    if (activeFiltersCount > 0) {
      filterBadge.textContent = String(activeFiltersCount);
      filterBadge.style.display = 'inline-flex';
    } else {
      filterBadge.style.display = 'none';
    }
  }

  if (counterPill) {
    counterPill.classList.toggle('is-filtered', activeFiltersCount > 0 || Boolean(q));
  }

  const textLabel = COMMERCIAL_STATE.subtab === 'fechar'
    ? `<strong>${filtered.length}</strong> pronto${filtered.length === 1 ? '' : 's'} para fechar`
    : `<strong>${filtered.length}</strong> cliente${filtered.length === 1 ? '' : 's'}`;
  if (counterPillText) counterPillText.innerHTML = textLabel;
  if (countBadge) countBadge.textContent = `${filtered.length} clientes`;

  renderCommercialFilterChips();

  // 5. Renderizar view correspondente
  if (isKanban) {
    renderCommercialKanban(clients);
  } else {
    renderCommercialTable(filtered);
  }
}
window.renderCommercialApp = renderCommercialApp;

// Funções Auxiliares de Formatação e Badges do Módulo Comercial
function formatDateDisplay(dateStr) {
  if (!dateStr) return '<span style="color: var(--text-muted); font-size: 0.76rem;">-</span>';
  const parts = String(dateStr).split('T')[0].split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return escapeHtml(dateStr);
}
window.formatDateDisplay = formatDateDisplay;

function getStatusBadge(status) {
  switch(status) {
    case 'Lead Novo':
      return '<span class="comm-status-badge status-novo">Lead Novo</span>';
    case 'Pronto para Fechar':
      return '<span class="comm-status-badge status-fechar">Pronto p/ Fechar</span>';
    case 'Aguardando DOCS':
      return '<span class="comm-status-badge status-docs">Aguardando DOCS</span>';
    case 'Fechado':
      return '<span class="comm-status-badge status-fechado">Contrato Fechado</span>';
    case 'Desqualificado':
      return '<span class="comm-status-badge status-desqualificado">Desqualificado</span>';
    case 'Aguardando Reunião':
      return '<span class="comm-status-badge status-reuniao">Aguardando Reunião</span>';
    default:
      return '<span class="comm-status-badge status-followup">Follow-up</span>';
  }
}
window.getStatusBadge = getStatusBadge;

// 10 Opções Oficiais de Próximo Passo
const NEXT_STEP_OPTIONS = [
  "Fazer ligação",
  "Retornar cliente",
  "Retorno para fechamento",
  "Solicitar documentos",
  "Cobrar documentos",
  "Analisar documentos",
  "Enviar contrato",
  "Cobrar assinatura",
  "Agendar reunião com advogado",
  "Confirmar reunião"
];
window.NEXT_STEP_OPTIONS = NEXT_STEP_OPTIONS;

// Badge Interativo com Select Embutido: Tipo de Atendimento (Exclusivamente: Lead Novo, Follow-up, Indicação)
function getCommercialStatusSelect(client) {
  let status = client.tipoAtendimento || client.status || 'Follow-up';
  if (status === 'Pronto para Fechar' || status === 'Prontos para Fechar') {
    status = client.originalStatus || client.tipoAtendimento || 'Lead Novo';
  }

  let statusClass = 'status-followup';
  if (status === 'Lead Novo') {
    statusClass = 'status-novo';
  } else if (status === 'Indicação' || status === 'Indicacao') {
    status = 'Indicação';
    statusClass = 'status-indicacao';
  } else {
    status = 'Follow-up';
    statusClass = 'status-followup';
  }

  return `
    <div class="comm-status-badge-container">
      <select class="comm-status-pill-select ${statusClass}" onchange="changeCommercialStatus('${client.id}', this.value)" title="Tipo de Atendimento: Lead Novo, Follow-up ou Indicação">
        <option value="Lead Novo" ${status === 'Lead Novo' ? 'selected' : ''}>Lead Novo</option>
        <option value="Follow-up" ${status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
        <option value="Indicação" ${status === 'Indicação' ? 'selected' : ''}>Indicação</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getCommercialStatusSelect = getCommercialStatusSelect;

// Badge Interativo com Select Embutido: Área (Trabalhista [Amarela], Cível [Azul], Previdenciário [Roxo])
function getCommercialAreaSelect(client) {
  const rawArea = (client.area || '').toLowerCase();
  let area = 'Trabalhista';
  let areaClass = 'trabalhista';

  if (rawArea.includes('cív') || rawArea.includes('civ')) {
    area = 'Cível';
    areaClass = 'civel';
  } else if (rawArea.includes('prev') || rawArea.includes('aposent') || rawArea.includes('aux')) {
    area = 'Previdenciário';
    areaClass = 'previdenciario';
  } else {
    area = 'Trabalhista';
    areaClass = 'trabalhista';
  }

  return `
    <div class="comm-area-badge-container">
      <select class="comm-area-pill-select area-${areaClass}" onchange="changeCommercialArea('${client.id}', this.value)" title="Clique para alterar a área">
        <option value="Trabalhista" ${area === 'Trabalhista' ? 'selected' : ''}>Trabalhista</option>
        <option value="Cível" ${area === 'Cível' ? 'selected' : ''}>Cível</option>
        <option value="Previdenciário" ${area === 'Previdenciário' ? 'selected' : ''}>Previdenciário</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getCommercialAreaSelect = getCommercialAreaSelect;

function changeCommercialArea(clientId, newArea) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;
  recordCommercialUndo(`Área de ${client.name} para "${newArea}"`);
  client.area = newArea;
  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Área de ${client.name} alterada para "${newArea}".`, 'success', 2200);
  }
}
window.changeCommercialArea = changeCommercialArea;

// Badge Interativo com Select Embutido: Próximo Passo (10 Opções Rápidas)
function getCommercialNextStepSelect(client) {
  const currentStep = (client.nextStep || (client.task ? client.task.action : '') || 'Fazer ligação').trim();
  const isPredefined = NEXT_STEP_OPTIONS.includes(currentStep);

  const optionsHtml = NEXT_STEP_OPTIONS.map(opt => `
    <option value="${escapeHtml(opt)}" ${opt === currentStep ? 'selected' : ''}>${escapeHtml(opt)}</option>
  `).join('');

  return `
    <div class="comm-nextstep-badge-container">
      <select class="comm-nextstep-pill-select" onchange="changeCommercialNextStep('${client.id}', this.value)" title="Clique para alterar o próximo passo">
        ${optionsHtml}
        ${!isPredefined && currentStep ? `<option value="${escapeHtml(currentStep)}" selected>${escapeHtml(currentStep)}</option>` : ''}
        <option value="__custom__">Outro (digitar)...</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getCommercialNextStepSelect = getCommercialNextStepSelect;

function changeCommercialNextStep(clientId, newStep) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  if (newStep === '__custom__') {
    openCommercialTaskModal(clientId, 'form', false);
    return;
  }

  recordCommercialUndo(`Próximo passo de ${client.name} para "${newStep}"`);
  client.nextStep = newStep;
  if (client.task) {
    client.task.action = newStep;
  }
  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Próximo passo de ${client.name} definido para "${newStep}".`, 'success', 2200);
  }
}
window.changeCommercialNextStep = changeCommercialNextStep;

function getAreaBadge(area) {
  const areaLower = (area || '').toLowerCase();
  let cls = 'badge-area-trabalhista';
  let label = 'Trabalhista';
  if (areaLower.includes('cív') || areaLower.includes('civ')) {
    cls = 'badge-area-civel';
    label = 'Cível';
  } else if (areaLower.includes('prev') || areaLower.includes('aposent') || areaLower.includes('aux')) {
    cls = 'badge-area-previdenciario';
    label = 'Previdenciário';
  } else {
    cls = 'badge-area-trabalhista';
    label = 'Trabalhista';
  }
  return `<span class="area-badge ${cls}">${escapeHtml(label)}</span>`;
}
window.getAreaBadge = getAreaBadge;

function cleanPhoneForWa(phone) {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.length === 10 || digits.length === 11) digits = '55' + digits;
  return digits;
}
window.cleanPhoneForWa = cleanPhoneForWa;

function formatPhoneDisplay(phone) {
  if (!phone) return '<span style="color: var(--text-muted); font-size: 0.74rem; font-style: italic;">Sem contato</span>';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('55')) {
    return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return escapeHtml(phone);
}
window.formatPhoneDisplay = formatPhoneDisplay;

// Renderizacao da lista executiva / tabela de clientes
function renderCommercialTable(clients) {
  const container = document.getElementById('comm-leads-list');
  const tableContainer = document.getElementById('comm-table-view-container');
  if (!container) return;

  // Aplica classe de densidade e zoom na tabela
  if (tableContainer) {
    if (COMMERCIAL_STATE.density === 'compact') {
      tableContainer.classList.add('density-compact');
    } else {
      tableContainer.classList.remove('density-compact');
    }
    tableContainer.style.zoom = `${(COMMERCIAL_STATE.zoom || 100) / 100}`;

    // Aplica Tema Dourado especial quando estiver na aba 'Prontos para Fechar'
    if (COMMERCIAL_STATE.subtab === 'fechar') {
      tableContainer.classList.add('theme-fechar-gold');
    } else {
      tableContainer.classList.remove('theme-fechar-gold');
    }
  }
  updateCommercialDisplayControlsUi();

  const todayStr = new Date().toISOString().split('T')[0];

  if (clients.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3rem 1rem;">
        <div class="empty-state-icon" style="display: flex; justify-content: center; align-items: center; margin-bottom: 0.75rem;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.45;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div class="empty-state-title">Nenhum cliente comercial encontrado</div>
        <p class="empty-state-text" style="margin-top: 0.5rem; color: var(--text-muted);">
          ${COMMERCIAL_STATE.subtab === 'fechar' 
            ? 'Não há nenhum cliente marcado como "Pronto para Fechar" no filtro atual. Clique em "Todos os Leads & Clientes" ou cadastre um novo.' 
            : 'Tente alterar os termos da busca ou filtre por outra área.'}
        </p>
        <button class="btn-primary" onclick="openCommercialModal()" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.45rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Cadastrar Novo Cliente Agora</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = clients.map(client => {
    const waDigits = cleanPhoneForWa(client.phone);
    const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Tudo bem? Augusto da MVT Advogados por aqui.`)}` : '';
    const hasTask = Boolean(client.task && client.task.dueDate);
    const isOverdue = hasTask && client.task.dueDate < todayStr && client.task.status !== 'done';
    const historyCount = Array.isArray(client.taskHistory) ? client.taskHistory.length : 0;

    return `
      <div class="comm-lead-row" id="comm-row-${client.id}">
        <!-- Coluna 1: Data -->
        <div class="comm-col-date">
          <span class="comm-date-badge">${formatDateDisplay(client.date)}</span>
        </div>

        <!-- Coluna 2: Cliente -->
        <div class="comm-col-client">
          <span class="comm-client-name" title="${escapeHtml(client.name)}">${escapeHtml(client.name)}</span>
        </div>

        <!-- Coluna 3: Área (Select Interativo: Trabalhista [Amarela], Cível [Azul], Previdenciário [Roxo]) -->
        <div class="comm-col-area">
          ${getCommercialAreaSelect(client)}
        </div>

        <!-- Coluna 4: Tipo de Atendimento (Select Interativo: Lead Novo, Follow-up, Indicação) -->
        <div class="comm-col-type">
          ${getCommercialStatusSelect(client)}
        </div>

        <!-- Coluna 5: Próximo Passo (Select Interativo com 10 Opções) -->
        <div class="comm-col-nextstep">
          ${getCommercialNextStepSelect(client)}
        </div>

        <!-- Coluna 6: Agendamento de Tarefa (Horário & Data) -->
        <div class="comm-col-schedule">
          ${hasTask ? `
            <span class="comm-task-due-pill ${isOverdue ? 'overdue' : ''}" onclick="openCommercialTaskModal('${client.id}')" title="Reunião/Tarefa agendada para ${formatDateDisplay(client.task.dueDate)}${client.task.dueTime ? ' das ' + client.task.dueTime + ' às ' + (client.task.endTime || calculateEndTime30m(client.task.dueTime)) + ' (30m)' : ''}. Clique para gerenciar.">
              📅 ${formatDateDisplay(client.task.dueDate)}${client.task.dueTime ? ' às ' + client.task.dueTime : ''}${isOverdue ? ' • Vencida' : ''}
            </span>
          ` : (historyCount > 0 ? `
            <span class="comm-task-done-pill" onclick="openCommercialTaskModal('${client.id}', 'history')" title="Clique para ver o histórico de tarefas">
              ✓ ${historyCount} tarefa${historyCount > 1 ? 's' : ''} no histórico
            </span>
          ` : `
            <button type="button" class="btn-schedule-shortcut" onclick="openCommercialTaskModal('${client.id}', 'form', true)" title="Clique para agendar data e horário para este próximo passo">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>+ Agendar data</span>
            </button>
          `)}
        </div>

        <!-- Coluna 7: Tarefa & Ações Rápidas (com Mini Divisória à Esquerda) -->
        <div class="comm-col-actions">
          ${hasTask ? `
            <button class="btn-task-action has-task ${isOverdue ? 'overdue' : ''}" onclick="openCommercialTaskModal('${client.id}')" title="${isOverdue ? `Atenção: Tarefa de 30m vencida em ${formatDateDisplay(client.task.dueDate)}. Clique para gerenciar.` : `Tarefa de 30m agendada para ${formatDateDisplay(client.task.dueDate)} às ${client.task.dueTime || '10:00'}. Clique para gerenciar.`}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Marcar Tarefa
            </button>
            ${historyCount > 0 ? `
              <button type="button" class="btn-task-history-pill" onclick="openCommercialTaskModal('${client.id}', 'history')" title="Ver histórico de ${historyCount} tarefas anteriores deste cliente">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:3px;"><path d="M12 8v4l3 3"></path><path d="M3.05 11a9 9 0 1 1 .5 4"></path><path d="M3 16h4v-4"></path></svg>${historyCount}
              </button>
            ` : ''}
            <button type="button" class="btn-icon-clean btn-add-next-step" onclick="openCommercialTaskModal('${client.id}', 'form', true)" title="Agendar outro próximo passo / nova tarefa">
              +
            </button>
          ` : `
            <button class="btn-task-action" onclick="openCommercialTaskModal('${client.id}')" title="Marcar tarefa de 30 minutos na pauta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Marcar Tarefa
            </button>
            ${historyCount > 0 ? `
              <button type="button" class="btn-task-history-pill done-count" onclick="openCommercialTaskModal('${client.id}', 'history')" title="Ver histórico de ${historyCount} tarefas agendadas deste cliente">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:3px;"><path d="M12 8v4l3 3"></path><path d="M3.05 11a9 9 0 1 1 .5 4"></path><path d="M3 16h4v-4"></path></svg>${historyCount}
              </button>
            ` : ''}
          `}

          <button class="btn-icon-clean" onclick="openCommercialModal('${client.id}')" title="Editar dados do cliente">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          
          <button class="btn-icon-clean danger" onclick="deleteCommercialClient('${client.id}')" title="Excluir cliente">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>

        <!-- Coluna 8: Pronto para Fechar (Ação Rápida com Envio Direto para a Aba) -->
        <div class="comm-col-fechar">
          ${getCommercialFecharButton(client)}
        </div>
      </div>
    `;
  }).join('');
}

// Botão de ação rápida na tabela: Pronto para Fechar (proporcional, clean e integrado)
function getCommercialFecharButton(client) {
  const isFechar = Boolean(client.prontoParaFechar || client.status === 'Pronto para Fechar' || client.status === 'Prontos para Fechar');
  if (isFechar) {
    return `
      <button type="button" class="btn-table-fechar active" onclick="handleTableFecharClick('${client.id}')" title="Cliente marcado como Pronto para Fechar! Clique para ver na aba Prontos para Fechar">
        <svg class="fechar-star-icon" width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span class="fechar-btn-text">Pronto p/ Fechar</span>
      </button>
    `;
  }
  return `
    <button type="button" class="btn-table-fechar" onclick="handleTableFecharClick('${client.id}')" title="Clique para marcar como Pronto para Fechar">
      <svg class="fechar-star-icon" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span class="fechar-btn-text">Pronto p/ Fechar</span>
    </button>
  `;
}
window.getCommercialFecharButton = getCommercialFecharButton;

// Handler do clique em Pronto para Fechar na tabela
function handleTableFecharClick(clientId) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  const isAlreadyFechar = Boolean(client.prontoParaFechar || client.status === 'Pronto para Fechar' || client.status === 'Prontos para Fechar');

  if (isAlreadyFechar) {
    if (COMMERCIAL_STATE.subtab === 'fechar') {
      if (confirm(`Deseja remover "${client.name}" de "Pronto para Fechar"?`)) {
        recordCommercialUndo(`Remover "${client.name}" de Pronto para Fechar`);
        client.prontoParaFechar = false;
        client.status = client.originalStatus || client.tipoAtendimento || 'Follow-up';
        saveCommercialData();
        renderCommercialApp();
        if (typeof showToast === 'function') {
          showToast(`Cliente "${client.name}" removido de Prontos para Fechar.`, 'info', 2500);
        }
      }
    } else {
      // Se clicou na tabela mãe e já está pronto para fechar: navega para a aba 'fechar'
      setCommercialSubtab('fechar');
      if (typeof showToast === 'function') {
        showToast(`Exibindo "${client.name}" na aba de Prontos para Fechar!`, 'success', 2500);
      }
    }
  } else {
    recordCommercialUndo(`Marcar "${client.name}" como Pronto para Fechar`);
    client.prontoParaFechar = true;
    if (client.status !== 'Pronto para Fechar' && client.status !== 'Prontos para Fechar') {
      client.originalStatus = client.tipoAtendimento || client.status;
    }
    client.status = 'Pronto para Fechar';
    saveCommercialData();
    setCommercialSubtab('fechar');
    if (typeof showToast === 'function') {
      showToast(`⭐ "${client.name}" marcado como Pronto para Fechar e aberto na aba de fechamento!`, 'success', 3200);
    }
  }
}
window.handleTableFecharClick = handleTableFecharClick;

// ========================================================
// FUNIL KANBAN BASEADO EM ETAPAS DE PRÓXIMO PASSO
// ========================================================
const KANBAN_PIPELINE_STAGES = [
  {
    id: 'contato',
    title: 'Ligação & Contato',
    color: '#a855f7',
    icon: '📞',
    steps: ['Fazer ligação', 'Retornar cliente']
  },
  {
    id: 'documentos',
    title: 'Documentação',
    color: '#38bdf8',
    icon: '📄',
    steps: ['Solicitar documentos', 'Cobrar documentos', 'Analisar documentos']
  },
  {
    id: 'reuniao',
    title: 'Reunião c/ Advogado',
    color: '#f59e0b',
    icon: '⚖️',
    steps: ['Agendar reunião com advogado', 'Confirmar reunião']
  },
  {
    id: 'contrato',
    title: 'Minuta & Assinatura',
    color: '#818cf8',
    icon: '✍️',
    steps: ['Enviar contrato', 'Cobrar assinatura']
  },
  {
    id: 'fechamento',
    title: 'Retorno p/ Fechamento',
    color: '#10b981',
    icon: '🎯',
    steps: ['Retorno para fechamento']
  }
];

if (!COMMERCIAL_STATE.kanbanMode) {
  COMMERCIAL_STATE.kanbanMode = localStorage.getItem('mvt_comm_kanban_mode') || 'pipeline';
}

function setKanbanMode(mode) {
  COMMERCIAL_STATE.kanbanMode = mode;
  localStorage.setItem('mvt_comm_kanban_mode', mode);

  const btnPipe = document.getElementById('btn-kanban-mode-pipeline');
  const btnDet = document.getElementById('btn-kanban-mode-detailed');
  if (btnPipe) btnPipe.classList.toggle('active', mode === 'pipeline');
  if (btnDet) btnDet.classList.toggle('active', mode === 'detailed');

  renderCommercialKanban(COMMERCIAL_STATE.clients);
}
window.setKanbanMode = setKanbanMode;

function advanceKanbanClientStep(clientId, delta = 1) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  const currentStep = (client.nextStep || 'Fazer ligação').trim();
  let currentIndex = NEXT_STEP_OPTIONS.indexOf(currentStep);
  if (currentIndex === -1) currentIndex = 0;

  let newIndex = currentIndex + delta;
  if (newIndex < 0) newIndex = 0;
  if (newIndex >= NEXT_STEP_OPTIONS.length) newIndex = NEXT_STEP_OPTIONS.length - 1;

  const newStep = NEXT_STEP_OPTIONS[newIndex];
  if (newStep === currentStep) return;

  recordCommercialUndo(`Avançou ${client.name} de "${currentStep}" para "${newStep}"`);
  client.nextStep = newStep;
  if (client.task) client.task.action = newStep;

  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Etapa de ${client.name} alterada para "${newStep}".`, 'success', 2200);
  }
}
window.advanceKanbanClientStep = advanceKanbanClientStep;

// Renderização do Quadro Kanban por Próximo Passo
function renderCommercialKanban(clients) {
  const boardGrid = document.getElementById('kanban-board-grid');
  if (!boardGrid) return;

  const isDetailed = COMMERCIAL_STATE.kanbanMode === 'detailed';

  // Define as colunas conforme o modo selecionado
  const columns = isDetailed
    ? NEXT_STEP_OPTIONS.map((step, idx) => ({
        id: `step-${idx}`,
        title: step,
        color: idx < 2 ? '#a855f7' : (idx < 5 ? '#38bdf8' : (idx < 7 ? '#f59e0b' : (idx < 9 ? '#818cf8' : '#10b981'))),
        steps: [step]
      }))
    : KANBAN_PIPELINE_STAGES;

  const cleanPhoneForWa = (phone) => {
    if (!phone) return '';
    let digits = phone.replace(/\D/g, '');
    if (digits.length === 10 || digits.length === 11) digits = '55' + digits;
    return digits;
  };

  boardGrid.innerHTML = columns.map(col => {
    const colClients = clients.filter(c => {
      const step = (c.nextStep || 'Fazer ligação').trim();
      return col.steps.includes(step);
    });

    const cardsHtml = colClients.length === 0
      ? '<div class="kanban-empty">Nenhum cliente nesta etapa</div>'
      : colClients.map(client => {
          const waDigits = cleanPhoneForWa(client.phone);
          const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Augusto da MVT Advogados.`)}` : '';
          const currentStep = (client.nextStep || 'Fazer ligação').trim();
          const stepIndex = NEXT_STEP_OPTIONS.indexOf(currentStep);
          const canGoPrev = stepIndex > 0;
          const canGoNext = stepIndex < NEXT_STEP_OPTIONS.length - 1;

          const optionsHtml = NEXT_STEP_OPTIONS.map(opt => `
            <option value="${escapeHtml(opt)}" ${opt === currentStep ? 'selected' : ''}>${escapeHtml(opt)}</option>
          `).join('');

          return `
            <div class="kanban-card" id="kanban-card-${client.id}">
              <div class="kanban-card-top">
                <span class="kanban-card-name" onclick="openCommercialModal('${client.id}')" title="Clique para editar">${escapeHtml(client.name)}</span>
                ${getAreaBadge(client.area)}
              </div>

              <!-- Seletor Rápido de Próximo Passo no Próprio Card -->
              <div style="margin: 0.15rem 0;">
                <select class="kanban-step-select" onchange="changeCommercialNextStep('${client.id}', this.value)" title="Alterar etapa do próximo passo">
                  ${optionsHtml}
                </select>
              </div>

              ${client.task ? `
                <div style="font-size: 0.68rem; color: #38bdf8; background: rgba(56, 189, 248, 0.08); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 3px;">
                  📅 <strong>${formatDateDisplay(client.task.dueDate)}</strong> às ${client.task.dueTime || '10:00'}
                </div>
              ` : ''}

              ${client.notes ? `
                <div class="kanban-notes-text" title="${escapeHtml(client.notes)}">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span>${escapeHtml(client.notes)}</span>
                </div>
              ` : ''}

              <div class="kanban-card-footer">
                <div style="display: flex; align-items: center; gap: 0.3rem;">
                  ${waLink ? `
                    <a href="${waLink}" target="_blank" rel="noopener" class="btn-whatsapp-sm" title="WhatsApp" style="padding: 0.12rem 0.35rem; font-size: 0.65rem;">
                      💬
                    </a>
                  ` : ''}
                  <button type="button" class="btn-task-action" style="padding: 0.15rem 0.4rem; font-size: 0.68rem;" onclick="openCommercialTaskModal('${client.id}', 'form', true)" title="Marcar compromisso na pauta">
                    + Tarefa
                  </button>
                </div>

                <!-- Botões de Avanço / Retorno das Etapas de Próximo Passo -->
                <div style="display: flex; gap: 0.25rem;">
                  <button type="button" class="btn-stage-move" ${canGoPrev ? '' : 'disabled style="opacity: 0.3;"'} onclick="advanceKanbanClientStep('${client.id}', -1)" title="Voltar etapa anterior">◀</button>
                  <button type="button" class="btn-stage-move highlight" ${canGoNext ? '' : 'disabled style="opacity: 0.3;"'} onclick="advanceKanbanClientStep('${client.id}', 1)" title="Avançar próxima etapa">▶</button>
                </div>
              </div>
            </div>
          `;
        }).join('');

    return `
      <div class="kanban-column" id="kanban-col-${col.id}">
        <div class="kanban-column-header">
          <span class="kanban-col-dot" style="background: ${col.color};"></span>
          <span class="kanban-col-title">${escapeHtml(col.title)}</span>
          <span class="kanban-col-badge">${colClients.length}</span>
        </div>
        <div class="kanban-cards-wrapper">
          ${cardsHtml}
        </div>
      </div>
    `;
  }).join('');
}
window.renderCommercialKanban = renderCommercialKanban;

// Alteração rápida de status comercial
function changeCommercialStatus(id, newStatus) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === id);
  if (!client) return;
  recordCommercialUndo(`Tipo de atendimento de ${client.name} para "${newStatus}"`);
  client.tipoAtendimento = newStatus;
  if (client.prontoParaFechar || client.status === 'Pronto para Fechar' || client.status === 'Prontos para Fechar') {
    client.originalStatus = newStatus;
  } else {
    client.status = newStatus;
  }
  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Tipo de atendimento de ${client.name} alterado para "${newStatus}".`, 'success', 2200);
  }
}
window.changeCommercialStatus = changeCommercialStatus;

// Modal Popup de Confirmação para Exclusão de Cliente
let CLIENT_PENDING_DELETE = null;

function deleteCommercialClient(id) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === id);
  if (!client) return;

  CLIENT_PENDING_DELETE = client;

  const modal = document.getElementById('modal-delete-client-confirm');
  const nameEl = document.getElementById('confirm-delete-client-name');
  if (nameEl) nameEl.textContent = `"${client.name}"`;

  if (modal) {
    modal.classList.add('active');
  } else {
    if (confirm(`Deseja realmente excluir o cliente "${client.name}"?`)) {
      confirmExecuteDeleteClient();
    }
  }
}
window.deleteCommercialClient = deleteCommercialClient;

function closeDeleteClientModal() {
  CLIENT_PENDING_DELETE = null;
  const modal = document.getElementById('modal-delete-client-confirm');
  if (modal) modal.classList.remove('active');
}
window.closeDeleteClientModal = closeDeleteClientModal;

function confirmExecuteDeleteClient() {
  if (!CLIENT_PENDING_DELETE) return;
  const client = CLIENT_PENDING_DELETE;

  recordCommercialUndo(`Exclusão do cliente "${client.name}"`);
  COMMERCIAL_STATE.clients = COMMERCIAL_STATE.clients.filter(c => c.id !== client.id);
  saveCommercialData();
  closeDeleteClientModal();
  renderCommercialApp();

  if (typeof showToast === 'function') {
    showToast(`Cliente "${client.name}" excluído com sucesso. Use a seta (←) para desfazer se necessário.`, 'info', 3200);
  }
}
window.confirmExecuteDeleteClient = confirmExecuteDeleteClient;

// Abertura do Modal de Cadastro / Edicao
function openCommercialModal(clientId = null) {
  const modal = document.getElementById('modal-commercial-client');
  if (!modal) return;

  const form = document.getElementById('form-commercial-client');
  const title = document.getElementById('modal-commercial-title');
  const inputId = document.getElementById('comm-client-id');
  const inputDate = document.getElementById('comm-client-date');
  const inputName = document.getElementById('comm-client-name');
  const inputPhone = document.getElementById('comm-client-phone');
  const inputArea = document.getElementById('comm-client-area');
  const inputStatus = document.getElementById('comm-client-status');
  const inputNextStep = document.getElementById('comm-client-next-step');
  const inputNotes = document.getElementById('comm-client-notes');

  const todayIso = new Date().toISOString().split('T')[0];

  if (clientId) {
    const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
    if (client) {
      if (title) title.textContent = 'Editar Cliente Comercial';
      if (inputId) inputId.value = client.id;
      if (inputDate) inputDate.value = client.date || todayIso;
      if (inputName) inputName.value = client.name || '';
      if (inputPhone) inputPhone.value = client.phone || '';
      if (inputArea) inputArea.value = client.area || 'Trabalhista';
      if (inputStatus) inputStatus.value = client.status || 'Follow-up';
      if (inputNextStep) inputNextStep.value = client.nextStep || 'Fazer ligação';
      if (inputNotes) inputNotes.value = client.notes || '';
    }
  } else {
    if (title) title.textContent = 'Novo Cliente Comercial';
    if (form) form.reset();
    if (inputId) inputId.value = '';
    if (inputDate) inputDate.value = todayIso;
    if (inputArea) inputArea.value = 'Trabalhista';
    if (inputStatus) inputStatus.value = 'Lead Novo';
    if (inputNextStep) inputNextStep.value = 'Fazer ligação';
  }

  modal.classList.add('active');
  setTimeout(() => inputName?.focus(), 100);
}
window.openCommercialModal = openCommercialModal;

function closeCommercialModal() {
  const modal = document.getElementById('modal-commercial-client');
  if (modal) modal.classList.remove('active');
}
window.closeCommercialModal = closeCommercialModal;

// Salvar Cliente (Submit do Modal)
function handleCommercialSubmit(e) {
  e.preventDefault();
  const inputId = document.getElementById('comm-client-id');
  const inputDate = document.getElementById('comm-client-date');
  const inputName = document.getElementById('comm-client-name');
  const inputPhone = document.getElementById('comm-client-phone');
  const inputArea = document.getElementById('comm-client-area');
  const inputStatus = document.getElementById('comm-client-status');
  const inputNextStep = document.getElementById('comm-client-next-step');
  const inputNotes = document.getElementById('comm-client-notes');

  const name = (inputName?.value || '').trim();
  if (!name) {
    if (typeof showToast === 'function') showToast('Por favor, informe o nome do cliente.', 'warning');
    return;
  }

  const dateVal = inputDate?.value || new Date().toISOString().split('T')[0];
  const id = inputId?.value;
  const isEditing = Boolean(id);

  if (isEditing) {
    const client = COMMERCIAL_STATE.clients.find(c => c.id === id);
    if (client) {
      client.date = dateVal;
      client.name = name;
      client.phone = (inputPhone?.value || '').trim();
      client.area = inputArea?.value || 'Trabalhista';
      client.status = inputStatus?.value || 'Follow-up';
      client.nextStep = (inputNextStep?.value || '').trim();
      client.notes = (inputNotes?.value || '').trim();
    }
  } else {
    const newClient = {
      id: `comm-user-${Date.now()}`,
      date: dateVal,
      name: name,
      phone: (inputPhone?.value || '').trim(),
      area: inputArea?.value || 'Trabalhista',
      status: inputStatus?.value || 'Lead Novo',
      nextStep: (inputNextStep?.value || '').trim() || 'Fazer ligação',
      notes: (inputNotes?.value || '').trim(),
      responsible: 'Augusto',
      task: null
    };
    // Adiciona no topo da lista para ficar visivel imediatamente
    COMMERCIAL_STATE.clients.unshift(newClient);
  }

  saveCommercialData();
  closeCommercialModal();
  renderCommercialApp();

  if (typeof showToast === 'function') {
    showToast(isEditing ? `Cliente "${name}" atualizado!` : `Novo cliente "${name}" adicionado com sucesso!`, 'success');
  }
}
window.handleCommercialSubmit = handleCommercialSubmit;

// Cadastro Rápido de Cliente (Barra Inline entre busca e tabela mãe)
function handleQuickAddCommercialClient(e) {
  if (e && e.preventDefault) e.preventDefault();

  const inputName = document.getElementById('comm-quick-name');
  const inputArea = document.getElementById('comm-quick-area');
  const inputType = document.getElementById('comm-quick-type');
  const inputNextStep = document.getElementById('comm-quick-nextstep');

  const nameVal = (inputName?.value || '').trim();
  if (!nameVal) {
    if (typeof showToast === 'function') {
      showToast('⚠️ Digite o nome do cliente para adicionar.', 'warning', 2500);
    }
    inputName?.focus();
    return;
  }

  // A data é sempre definida automaticamente como a data de hoje
  const dateVal = new Date().toISOString().split('T')[0];
  const areaVal = inputArea?.value || 'Trabalhista';
  const statusVal = inputType?.value || 'Lead Novo';
  const nextStepVal = inputNextStep?.value || 'Fazer ligação';

  const newClient = {
    id: `comm-user-${Date.now()}`,
    date: dateVal,
    name: nameVal,
    phone: '',
    area: areaVal,
    status: statusVal,
    nextStep: nextStepVal,
    notes: '',
    responsible: 'Augusto',
    task: null,
    taskHistory: []
  };

  if (!Array.isArray(COMMERCIAL_STATE.clients)) {
    COMMERCIAL_STATE.clients = [];
  }
  COMMERCIAL_STATE.clients.unshift(newClient);

  saveCommercialData();
  renderCommercialApp();

  // Limpa o campo do nome e mantém foco para permitir cadastro rápido em lote
  if (inputName) {
    inputName.value = '';
    inputName.focus();
  }

  if (typeof showToast === 'function') {
    if (statusVal === 'Pronto para Fechar') {
      showToast(`✅ Cliente "${nameVal}" adicionado à tabela mãe e visível em "Prontos para Fechar"!`, 'success', 3200);
    } else {
      showToast(`✅ Cliente "${nameVal}" adicionado à tabela mãe com sucesso!`, 'success', 2500);
    }
  }
}
window.handleQuickAddCommercialClient = handleQuickAddCommercialClient;

// ========================================================
// FUNÇÕES AUXILIARES DE TAREFAS DE 30 MINUTOS
// ========================================================
function calculateEndTime30m(startTime) {
  if (!startTime) return '10:30';
  const parts = startTime.split(':').map(Number);
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return '10:30';
  let h = parts[0];
  let m = parts[1] + 30;
  if (m >= 60) {
    m -= 60;
    h = (h + 1) % 24;
  }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
window.calculateEndTime30m = calculateEndTime30m;

function setTaskTimeShortcut(timeStr) {
  const inputTime = document.getElementById('comm-task-time');
  if (inputTime) {
    inputTime.value = timeStr;
    const rangeSpan = document.getElementById('comm-task-time-range');
    if (rangeSpan) {
      const end = calculateEndTime30m(timeStr);
      rangeSpan.textContent = `${timeStr} às ${end} (30 min)`;
    }
  }
}
window.setTaskTimeShortcut = setTaskTimeShortcut;

function toggleCommercialTaskStatus(clientId) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !client.task) return;

  const currentStatus = client.task.status || 'pending';
  const newStatus = currentStatus === 'done' ? 'pending' : 'done';
  client.task.status = newStatus;
  client.task.updatedAt = new Date().toISOString();

  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const taskId = client.task.id || ('task-' + Date.now());
  const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
  const updatedHist = {
    ...client.task,
    id: taskId,
    status: newStatus,
    completedAt: newStatus === 'done' ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    client.taskHistory[existingIndex] = updatedHist;
  } else {
    client.taskHistory.unshift(updatedHist);
  }

  saveCommercialData();
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  if (typeof showToast === 'function') {
    if (newStatus === 'done') {
      showToast(`Tarefa de "${client.name}" marcada como concluída! 🎉 Histórico atualizado.`, 'success', 3500);
    } else {
      showToast(`Tarefa de "${client.name}" reaberta como pendente.`, 'info');
    }
  }
}
window.toggleCommercialTaskStatus = toggleCommercialTaskStatus;

function deleteCommercialTask(clientId) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  // Não perde o registro histórico: grava como desmarcada para manter auditoria
  if (client.task) {
    if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
    const taskId = client.task.id || ('task-' + Date.now());
    const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
    const cancelledRecord = {
      ...client.task,
      id: taskId,
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (existingIndex >= 0) {
      client.taskHistory[existingIndex] = cancelledRecord;
    } else {
      client.taskHistory.unshift(cancelledRecord);
    }
    client.task = null;
  }

  saveCommercialData();
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  if (typeof showToast === 'function') {
    showToast(`Tarefa de "${client.name}" desmarcada da pauta ativa (registro mantido no histórico).`, 'info', 3500);
  }
}
window.deleteCommercialTask = deleteCommercialTask;

// ========================================================
// RENDERIZAÇÃO DA PAUTA / AGENDA DE TAREFAS DE 30 MIN
// ========================================================
function renderCommercialTasksView() {
  const container = document.getElementById('comm-tasks-list');
  if (!container) return;

  const clients = COMMERCIAL_STATE.clients;
  const clientsWithTask = clients.filter(c => c.task && c.task.action);

  const todayStr = new Date().toISOString().split('T')[0];
  const totalTasks = clientsWithTask.length;
  const todayTasks = clientsWithTask.filter(c => c.task.dueDate === todayStr).length;
  const pendingTasks = clientsWithTask.filter(c => c.task.status !== 'done').length;
  const doneTasks = clientsWithTask.filter(c => c.task.status === 'done').length;

  const kpiTotal = document.getElementById('comm-tasks-kpi-total');
  const kpiToday = document.getElementById('comm-tasks-kpi-today');
  const kpiPending = document.getElementById('comm-tasks-kpi-pending');
  const kpiDone = document.getElementById('comm-tasks-kpi-done');

  if (kpiTotal) kpiTotal.textContent = totalTasks;
  if (kpiToday) kpiToday.textContent = todayTasks;
  if (kpiPending) kpiPending.textContent = pendingTasks;
  if (kpiDone) kpiDone.textContent = doneTasks;

  // Filtragem por área e busca textual
  let tasksList = [...clientsWithTask];
  if (COMMERCIAL_STATE.area && COMMERCIAL_STATE.area !== 'all') {
    const fAreaLower = COMMERCIAL_STATE.area.toLowerCase();
    tasksList = tasksList.filter(c => (c.area || '').toLowerCase().includes(fAreaLower));
  }
  const q = (COMMERCIAL_STATE.search || '').trim().toLowerCase();
  if (q) {
    tasksList = tasksList.filter(c => 
      (c.name || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q) ||
      (c.task.action || '').toLowerCase().includes(q) ||
      (c.task.notes || '').toLowerCase().includes(q)
    );
  }

  // Ordenar cronologicamente: Data e Horário
  tasksList.sort((a, b) => {
    const dateA = a.task.dueDate || '9999';
    const dateB = b.task.dueDate || '9999';
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    const timeA = a.task.dueTime || '99:99';
    const timeB = b.task.dueTime || '99:99';
    return timeA.localeCompare(timeB);
  });

  if (tasksList.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3.5rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px dashed var(--border-subtle); text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⏱️</div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #ffffff;">Nenhuma tarefa de 30 minutos agendada</div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.4rem auto 1.4rem auto; max-width: 480px; line-height: 1.4;">
          Ao clicar no botão <strong>"Marcar Tarefa"</strong> ao lado de qualquer cliente, o sistema agenda automaticamente um compromisso de 30 minutos nesta pauta de acompanhamento.
        </p>
        <button type="button" class="btn-primary" onclick="setCommercialSubtab('leads')" style="font-size: 0.8rem; padding: 0.45rem 1.1rem;">
          👥 Ver Todos os Clientes
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = tasksList.map(client => {
    const task = client.task;
    const isDone = task.status === 'done';
    const isToday = task.dueDate === todayStr;
    const startTime = task.dueTime || '10:00';
    const endTime = task.endTime || calculateEndTime30m(startTime);
    const dateBadge = isToday ? 'Hoje' : formatDateDisplay(task.dueDate);
    const waDigits = cleanPhoneForWa(client.phone);
    const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Tudo bem? Augusto da MVT Advogados por aqui.`)}` : '';

    return `
      <div class="comm-task-row ${isDone ? 'status-done' : ''}" id="comm-task-row-${client.id}">
        <!-- Coluna 1: Horário com alteração de tempo rápida ao clicar -->
        <div class="col-task-time-box" onclick="openCommercialTaskModal('${client.id}', 'form', true)" style="cursor: pointer;" title="Clique para alterar data, horário ou duração deste compromisso">
          <span class="task-date-pill" style="${isToday ? 'color: #38bdf8;' : ''}">📅 ${dateBadge}</span>
          <span class="task-time-span">
            ${startTime} - ${endTime}
            <span class="task-duration-tag">${task.duration || COMMERCIAL_STATE.defaultDuration || 30}m</span>
          </span>
        </div>

        <!-- Coluna 2: Cliente & Contato -->
        <div class="comm-col-client">
          <span class="comm-client-name" title="${escapeHtml(client.name)}">${escapeHtml(client.name)}</span>
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span class="comm-client-phone">${formatPhoneDisplay(client.phone)}</span>
            ${waLink ? `
              <a href="${waLink}" target="_blank" rel="noopener" class="btn-whatsapp-sm" title="Conversar no WhatsApp com ${escapeHtml(client.name)}" style="padding: 0.15rem 0.35rem; font-size: 0.65rem;">
                💬
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Coluna 3: Comercial -->
        <div class="comm-col-comm">
          <span class="badge" style="background: rgba(255, 255, 255, 0.06); color: var(--text-main); font-size: 0.73rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px; opacity:0.7;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${escapeHtml(client.responsible || 'Augusto')}
          </span>
        </div>

        <!-- Coluna 4: Área -->
        <div class="comm-col-area">
          ${getAreaBadge(client.area)}
        </div>

        <!-- Coluna 5: O que Fazer (Próximo Passo) -->
        <div class="col-task-action-box">
          <span class="task-action-main" style="${isDone ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:3px; opacity:0.85;"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg> ${escapeHtml(task.action)}
          </span>
          ${task.notes ? `
            <span class="task-notes-sub" title="${escapeHtml(task.notes)}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px; opacity:0.7;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> ${escapeHtml(task.notes)}
            </span>
          ` : ''}
        </div>

        <!-- Coluna 6: Status & Ações Rápidas -->
        <div class="comm-col-actions" style="justify-content: flex-end; gap: 0.35rem;">
          ${!isDone ? `
            <button type="button" class="btn-task-done" onclick="toggleCommercialTaskStatus('${client.id}')" title="Marcar tarefa como concluída">
              ✓ Concluir
            </button>
          ` : `
            <button type="button" class="btn-task-reopen" onclick="toggleCommercialTaskStatus('${client.id}')" title="Reabrir tarefa como pendente">
              ↩ Reabrir
            </button>
            <button type="button" class="btn-action-conclude-next" style="padding: 0.22rem 0.5rem; font-size: 0.72rem;" onclick="openCommercialTaskModal('${client.id}', 'form', true)" title="Agendar novo próximo passo para este cliente">
              + Próximo Passo
            </button>
          `}
          ${Array.isArray(client.taskHistory) && client.taskHistory.length > 0 ? `
            <button type="button" class="btn-task-history-pill" onclick="openCommercialTaskModal('${client.id}', 'history')" title="Ver histórico de ${client.taskHistory.length} tarefas deste cliente">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:3px;"><path d="M12 8v4l3 3"></path><path d="M3.05 11a9 9 0 1 1 .5 4"></path><path d="M3 16h4v-4"></path></svg>${client.taskHistory.length}
            </button>
          ` : ''}
          <button type="button" class="btn-icon-clean" onclick="jumpToCalendarTask('${task.dueDate}', '${startTime}')" title="Ver esta tarefa de 30m na Grade da Agenda Oficial">
            <span style="font-size: 0.85rem;">📅</span>
          </button>
          <button type="button" class="btn-icon-clean" onclick="openCommercialTaskModal('${client.id}')" title="Editar horário de 30m ou detalhes da tarefa">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}
window.renderCommercialTasksView = renderCommercialTasksView;

// Abrir e destacar o compromisso de 30m diretamente na Grade da Agenda
function jumpToCalendarTask(dueDate, startTime) {
  if (typeof switchTab === 'function') {
    switchTab('tab-calendar');
  }
  if (dueDate && window.STATE) {
    window.STATE.calendarDate = new Date(dueDate + 'T12:00:00');
    if (typeof renderCalendarGrid === 'function') {
      renderCalendarGrid();
    }
    if (typeof showToast === 'function') {
      const parts = dueDate.split('-');
      const dBr = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dueDate;
      showToast(`📅 Exibindo na Agenda: ${dBr} às ${startTime || '10:00'} (30m)`, 'info', 3000);
    }
  }
}
window.jumpToCalendarTask = jumpToCalendarTask;

// ========================================================
// MODAL DE MARCAR TAREFA COMERCIAL & HISTÓRICO DE PASSOS
// ========================================================
function openCommercialTaskModal(clientId, initialTab = 'form', forceNew = false) {
  const modal = document.getElementById('modal-commercial-task');
  if (!modal) return;

  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  // Garante que o array de histórico existe
  if (!Array.isArray(client.taskHistory)) {
    client.taskHistory = [];
  }

  const inputClientId = document.getElementById('comm-task-client-id');
  const previewName = document.getElementById('comm-task-client-name');
  const previewSub = document.getElementById('comm-task-client-sub');
  const inputAction = document.getElementById('comm-task-action');
  const inputDate = document.getElementById('comm-task-date');
  const inputTime = document.getElementById('comm-task-time');
  const inputNotes = document.getElementById('comm-task-notes');
  const formElement = document.getElementById('form-commercial-task');
  const activeCard = document.getElementById('comm-task-active-card');
  const activeAction = document.getElementById('comm-task-active-action');
  const activeMeta = document.getElementById('comm-task-active-meta');
  const activeNotes = document.getElementById('comm-task-active-notes');
  const overdueTag = document.getElementById('comm-task-overdue-tag');
  const formTitle = document.getElementById('comm-task-form-section-title');
  const modeInput = document.getElementById('comm-task-edit-mode');

  if (inputClientId) inputClientId.value = client.id;
  if (previewName) previewName.textContent = client.name || 'Cliente';
  if (previewSub) previewSub.textContent = `Área: ${client.area || 'Geral'}  •  Fase: ${client.status || 'Follow-up'}`;

  // Atualiza timeline de histórico e contador
  renderCommercialTaskHistory(client);

  const todayStr = new Date().toISOString().split('T')[0];
  const hasActiveTask = Boolean(client.task && client.task.dueDate);

  if (hasActiveTask && !forceNew) {
    // ESTADO A: CLIENTE TEM TAREFA AGENDADA -> EXIBE APENAS O CARD ATIVO (FORMULÁRIO OCULTO)
    if (activeCard) {
      activeCard.style.display = 'block';
      const isOverdue = client.task.dueDate < todayStr && client.task.status !== 'done';
      if (isOverdue) {
        activeCard.classList.add('overdue-box');
        if (overdueTag) overdueTag.style.display = 'inline-block';
      } else {
        activeCard.classList.remove('overdue-box');
        if (overdueTag) overdueTag.style.display = 'none';
      }
    }

    // Formulário fica totalmente oculto para evitar poluição visual
    if (formElement) formElement.style.display = 'none';

    if (activeAction) activeAction.textContent = client.task.action || 'Compromisso Comercial';
    if (activeMeta) {
      const startTime = client.task.dueTime || '10:00';
      const endTime = client.task.endTime || calculateEndTime30m(startTime);
      activeMeta.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${formatDateDisplay(client.task.dueDate)} às ${startTime} - ${endTime} (30 min)`;
    }
    if (activeNotes) {
      if (client.task.notes) {
        activeNotes.textContent = `Observação: ${client.task.notes}`;
        activeNotes.style.display = 'block';
      } else {
        activeNotes.style.display = 'none';
      }
    }

    // Preenche preventivamente os dados no form caso o usuário clique em Editar
    if (modeInput) modeInput.value = 'edit';
    if (formTitle) formTitle.textContent = 'Editar Dados da Tarefa (30m):';
    if (inputAction) inputAction.value = client.task.action || client.nextStep || '';
    if (inputDate) inputDate.value = client.task.dueDate || todayStr;
    const tVal = client.task.dueTime || '10:00';
    if (inputTime) inputTime.value = tVal;
    if (inputNotes) inputNotes.value = client.task.notes || '';
  } else {
    // ESTADO B: NÃO TEM TAREFA OU FORÇOU NOVO PASSO -> EXIBE FORMULÁRIO LIMPO (CARD OCULTO)
    if (activeCard) activeCard.style.display = 'none';
    if (formElement) formElement.style.display = 'block';
    if (modeInput) modeInput.value = 'new';
    if (formTitle) {
      formTitle.textContent = forceNew 
        ? 'Agendar Novo Próximo Passo (30m):' 
        : 'Definir Tarefa / Próximo Passo (30m):';
    }

    if (inputAction) inputAction.value = forceNew ? '' : (client.nextStep || '');
    if (inputDate) inputDate.value = todayStr;
    const defTime = '10:00';
    if (inputTime) inputTime.value = defTime;
    if (inputNotes) inputNotes.value = '';
    setTimeout(() => inputAction?.focus(), 120);
  }

  // Alterna para a aba solicitada (form ou history)
  switchTaskModalTab(initialTab);

  modal.classList.add('active');
}
window.openCommercialTaskModal = openCommercialTaskModal;

function closeCommercialTaskModal() {
  const modal = document.getElementById('modal-commercial-task');
  if (modal) modal.classList.remove('active');
}
window.closeCommercialTaskModal = closeCommercialTaskModal;

// Alternador de Abas do Modal: Form vs Histórico
function switchTaskModalTab(tab) {
  COMMERCIAL_STATE.taskModalTab = tab;
  const btnForm = document.getElementById('tab-btn-task-form');
  const btnHistory = document.getElementById('tab-btn-task-history');
  const contentForm = document.getElementById('task-modal-tab-content-form');
  const contentHistory = document.getElementById('task-modal-tab-content-history');

  if (tab === 'history') {
    if (btnHistory) btnHistory.classList.add('active');
    if (btnForm) btnForm.classList.remove('active');
    if (contentHistory) contentHistory.style.display = 'block';
    if (contentForm) contentForm.style.display = 'none';
  } else {
    if (btnForm) btnForm.classList.add('active');
    if (btnHistory) btnHistory.classList.remove('active');
    if (contentForm) contentForm.style.display = 'block';
    if (contentHistory) contentHistory.style.display = 'none';
  }
}
window.switchTaskModalTab = switchTaskModalTab;

// Renderização da Linha do Tempo de Tarefas Anteriores (SEM OPÇÃO DE EXCLUIR)
function renderCommercialTaskHistory(client) {
  const countBadge = document.getElementById('comm-task-history-count');
  const timeline = document.getElementById('comm-task-history-timeline');
  if (!client) return;

  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const list = client.taskHistory;

  if (countBadge) countBadge.textContent = list.length;
  if (!timeline) return;

  if (list.length === 0) {
    timeline.innerHTML = `
      <div class="history-empty-state">
        <div style="margin-bottom: 0.5rem; opacity: 0.5;">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">Nenhuma tarefa arquivada ainda</div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.4;">
          Todas as tarefas agendadas, concluídas ou desmarcadas para <strong>${escapeHtml(client.name)}</strong> ficarão gravadas permanentemente neste histórico como registro auditável.
        </p>
      </div>
    `;
    return;
  }

  timeline.innerHTML = list.map((item, idx) => {
    const itemKey = item.id || `idx-${idx}`;
    const startTime = item.dueTime || '10:00';
    const duration = item.duration || COMMERCIAL_STATE.defaultDuration || 30;
    const dateFormatted = item.dueDate ? formatDateDisplay(item.dueDate) : (item.completedAt ? formatDateDisplay(item.completedAt) : '');

    const isCancelled = item.status === 'cancelled';
    const isActiveNow = Boolean(client.task && client.task.id === item.id);

    let dotColor = '#10b981';
    let statusText = 'Concluída';
    if (isCancelled) {
      dotColor = '#94a3b8';
      statusText = 'Desmarcada';
    } else if (item.status === 'pending') {
      dotColor = '#38bdf8';
      statusText = 'Agendada';
    }

    return `
      <div class="history-item-row ${isActiveNow ? 'is-active' : ''}" id="hist-card-${itemKey}">
        <div class="history-item-left">
          <span class="history-status-indicator" style="background: ${dotColor};" title="${statusText}"></span>
          <div class="history-item-content">
            <div class="history-item-title-line">
              <strong class="history-item-action-title">${escapeHtml(item.action || 'Compromisso')}</strong>
              <span class="history-item-meta">${dateFormatted ? `${dateFormatted} às ${startTime}` : startTime} • ${duration}m</span>
              ${isActiveNow ? `<span class="history-tag-active">Na Pauta Ativa</span>` : `<span class="history-tag-status" style="color: ${dotColor};">${statusText}</span>`}
            </div>
            ${item.notes ? `<div class="history-item-notes-line">${escapeHtml(item.notes)}</div>` : ''}
          </div>
        </div>
        <div class="history-item-actions">
          ${!isActiveNow ? `
            <button type="button" class="btn-history-reactivate" onclick="reopenCommercialTaskFromHistory('${client.id}', '${itemKey}')" title="Restaurar esta tarefa como ativa na pauta">
              ↩ Reativar
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}
window.renderCommercialTaskHistory = renderCommercialTaskHistory;

// Concluir a tarefa atual e abrir formulário para o novo próximo passo
function concludeCurrentAndOpenNext() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !client.task) return;

  // Move / atualiza a tarefa no histórico como 'done'
  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const taskId = client.task.id || ('task-done-' + Date.now());
  const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
  const archivedTask = {
    ...client.task,
    id: taskId,
    status: 'done',
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    client.taskHistory[existingIndex] = archivedTask;
  } else {
    client.taskHistory.unshift(archivedTask);
  }
  client.task = null;

  saveCommercialData();
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  // Prepara o formulário para o novo próximo passo
  const activeCard = document.getElementById('comm-task-active-card');
  const formElement = document.getElementById('form-commercial-task');
  const inputAction = document.getElementById('comm-task-action');
  const inputDate = document.getElementById('comm-task-date');
  const inputNotes = document.getElementById('comm-task-notes');
  const formTitle = document.getElementById('comm-task-form-section-title');
  const modeInput = document.getElementById('comm-task-edit-mode');

  if (activeCard) activeCard.style.display = 'none';
  if (formElement) formElement.style.display = 'block';
  if (modeInput) modeInput.value = 'new';
  if (formTitle) formTitle.textContent = '✅ Tarefa salva no histórico! Agende o Novo Próximo Passo:';
  if (inputAction) {
    inputAction.value = '';
    setTimeout(() => inputAction.focus(), 80);
  }
  if (inputDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    inputDate.value = tomorrow.toISOString().split('T')[0];
  }
  if (inputNotes) inputNotes.value = '';

  renderCommercialTaskHistory(client);
  switchTaskModalTab('form');

  if (typeof showToast === 'function') {
    showToast(`✅ Tarefa anterior de "${client.name}" arquivada com sucesso no histórico!`, 'success', 3500);
  }
}
window.concludeCurrentAndOpenNext = concludeCurrentAndOpenNext;

// Agendar outra tarefa mantendo a anterior no histórico
function scheduleAnotherTaskDirectly() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  if (client.task) {
    if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
    const taskId = client.task.id || ('task-archived-' + Date.now());
    const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
    const archived = {
      ...client.task,
      id: taskId,
      status: client.task.status === 'pending' ? 'done' : client.task.status,
      completedAt: client.task.completedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (existingIndex >= 0) {
      client.taskHistory[existingIndex] = archived;
    } else {
      client.taskHistory.unshift(archived);
    }
    client.task = null;
    saveCommercialData();
    renderCommercialApp();
  }

  prepareScheduleNewTask(false);
  if (typeof showToast === 'function') {
    showToast('Tarefa anterior preservada no histórico! Defina o novo próximo passo.', 'info', 2800);
  }
}
window.scheduleAnotherTaskDirectly = scheduleAnotherTaskDirectly;

// Prepara os campos para agendar nova tarefa limpa
function prepareScheduleNewTask(forceNew) {
  const activeCard = document.getElementById('comm-task-active-card');
  const formElement = document.getElementById('form-commercial-task');
  const inputAction = document.getElementById('comm-task-action');
  const inputDate = document.getElementById('comm-task-date');
  const inputNotes = document.getElementById('comm-task-notes');
  const formTitle = document.getElementById('comm-task-form-section-title');
  const modeInput = document.getElementById('comm-task-edit-mode');

  if (activeCard) activeCard.style.display = 'none';
  if (formElement) formElement.style.display = 'block';
  if (modeInput) modeInput.value = 'new';
  if (formTitle) formTitle.textContent = 'Definir Nova Tarefa / Próximo Passo:';
  if (inputAction) {
    inputAction.value = '';
    setTimeout(() => inputAction.focus(), 80);
  }
  if (inputDate) {
    inputDate.value = new Date().toISOString().split('T')[0];
  }
  if (inputNotes) inputNotes.value = '';

  switchTaskModalTab('form');
}
window.prepareScheduleNewTask = prepareScheduleNewTask;

// Focar nos campos para editar a tarefa ativa
function editCurrentActiveTaskFields() {
  const activeCard = document.getElementById('comm-task-active-card');
  const formElement = document.getElementById('form-commercial-task');
  const inputAction = document.getElementById('comm-task-action');
  const formTitle = document.getElementById('comm-task-form-section-title');
  const modeInput = document.getElementById('comm-task-edit-mode');

  if (activeCard) activeCard.style.display = 'none';
  if (formElement) formElement.style.display = 'block';
  if (modeInput) modeInput.value = 'edit';
  if (formTitle) formTitle.textContent = 'Editar Dados da Tarefa Atual (30m):';
  if (inputAction) {
    inputAction.focus();
    inputAction.select();
  }
}
window.editCurrentActiveTaskFields = editCurrentActiveTaskFields;

// Cancelar a edição e voltar ao card ativo se houver
function cancelCommercialTaskEdit() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  const activeCard = document.getElementById('comm-task-active-card');
  const formElement = document.getElementById('form-commercial-task');

  if (client && client.task && client.task.dueDate) {
    // Volta a exibir apenas o card de tarefa ativa
    if (formElement) formElement.style.display = 'none';
    if (activeCard) activeCard.style.display = 'block';
  } else {
    // Não tem tarefa ativa agendada, fecha o modal
    closeCommercialTaskModal();
  }
}
window.cancelCommercialTaskEdit = cancelCommercialTaskEdit;

// Desmarcar tarefa ativa atual (registro PERMANECE no histórico como desmarcada)
function removeCurrentActiveTask() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !client.task) return;

  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const taskId = client.task.id || ('task-canc-' + Date.now());
  const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
  const cancelledRecord = {
    ...client.task,
    id: taskId,
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    client.taskHistory[existingIndex] = cancelledRecord;
  } else {
    client.taskHistory.unshift(cancelledRecord);
  }

  client.task = null;
  saveCommercialData();
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  closeCommercialTaskModal();
  if (typeof showToast === 'function') {
    showToast(`Tarefa ativa de "${client.name}" desmarcada (registro preservado no histórico).`, 'info', 3500);
  }
}
window.removeCurrentActiveTask = removeCurrentActiveTask;

// Reabrir tarefa do histórico como a tarefa ativa na pauta (SEM excluir do histórico)
function reopenCommercialTaskFromHistory(clientId, taskKey) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !Array.isArray(client.taskHistory)) return;

  const itemIndex = client.taskHistory.findIndex((item, idx) => {
    return item.id === taskKey || `idx-${idx}` === taskKey || String(idx) === taskKey;
  });

  if (itemIndex === -1) return;

  const item = client.taskHistory[itemIndex];

  // Se já havia outra tarefa ativa, garante que ela está salva no histórico
  if (client.task && client.task.id !== item.id) {
    const activeIndex = client.taskHistory.findIndex(h => h.id === client.task.id);
    const activeTaskSnap = {
      ...client.task,
      id: client.task.id || ('task-' + Date.now()),
      status: client.task.status || 'pending',
      updatedAt: new Date().toISOString()
    };
    if (activeIndex >= 0) {
      client.taskHistory[activeIndex] = activeTaskSnap;
    } else {
      client.taskHistory.unshift(activeTaskSnap);
    }
  }

  // Atualiza status no histórico e define como ativa na pauta (NUNCA deleta!)
  item.status = 'pending';
  item.updatedAt = new Date().toISOString();

  client.task = {
    ...item,
    status: 'pending',
    updatedAt: new Date().toISOString()
  };
  client.nextStep = item.action || client.nextStep;

  saveCommercialData();
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  // Reabre o modal mostrando o card da tarefa ativa
  openCommercialTaskModal(client.id, 'form');

  if (typeof showToast === 'function') {
    showToast(`Tarefa restaurada como ativa na pauta de "${client.name}"!`, 'success');
  }
}
window.reopenCommercialTaskFromHistory = reopenCommercialTaskFromHistory;

// Histórico de tarefas é permanente e auditável (não permite exclusão)
function deleteCommercialTaskHistoryItem(clientId, taskKey) {
  if (typeof showToast === 'function') {
    showToast('O histórico de tarefas é um registro permanente e não pode ser excluído.', 'warning');
  }
}
window.deleteCommercialTaskHistoryItem = deleteCommercialTaskHistoryItem;

// Salvar Tarefa do Cliente (Compromisso de 30 minutos)
function handleCommercialTaskSubmit(e) {
  e.preventDefault();
  const inputClientId = document.getElementById('comm-task-client-id');
  const inputAction = document.getElementById('comm-task-action');
  const inputDate = document.getElementById('comm-task-date');
  const inputTime = document.getElementById('comm-task-time');
  const inputNotes = document.getElementById('comm-task-notes');

  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  const action = (inputAction?.value || '').trim();
  if (!action) {
    if (typeof showToast === 'function') showToast('Por favor, informe o que precisa ser feito.', 'warning');
    return;
  }

  const dueDate = inputDate?.value || new Date().toISOString().split('T')[0];
  const dueTime = (inputTime?.value || '').trim() || '10:00';
  const endTime = calculateEndTime30m(dueTime);
  const notes = (inputNotes?.value || '').trim();

  // Garante histórico inicializado
  if (!Array.isArray(client.taskHistory)) {
    client.taskHistory = [];
  }
  const modeInput = document.getElementById('comm-task-edit-mode');
  const isEditing = modeInput?.value === 'edit';

  if (isEditing && client.task && client.task.id) {
    // ========================================================
    // CASO 1: EDIÇÃO DA TAREFA ATUAL (mantém mesmo ID)
    // ========================================================
    const taskId = client.task.id;
    client.task.action = action;
    client.task.dueDate = dueDate;
    client.task.dueTime = dueTime;
    client.task.endTime = endTime;
    client.task.notes = notes;
    client.task.updatedAt = new Date().toISOString();
    client.nextStep = action;

    const historyIndex = client.taskHistory.findIndex(h => h.id === taskId);
    if (historyIndex >= 0) {
      client.taskHistory[historyIndex] = {
        ...client.taskHistory[historyIndex],
        action: action,
        dueDate: dueDate,
        dueTime: dueTime,
        endTime: endTime,
        notes: notes,
        updatedAt: new Date().toISOString()
      };
    } else {
      client.taskHistory.unshift({
        ...client.task,
        createdAt: new Date().toISOString()
      });
    }

    if (typeof showToast === 'function') {
      showToast(`Tarefa de 30min atualizada para "${client.name}"!`, 'success', 3000);
    }
  } else {
    // ========================================================
    // CASO 2: NOVA TAREFA (NUNCA SOBRESCREVE A ANTERIOR!)
    // ========================================================
    // Se já havia uma tarefa ativa anterior, garante que ela permanece arquivada no histórico
    if (client.task && client.task.dueDate) {
      const prevTaskId = client.task.id || ('task-' + Date.now() + '-prev');
      const prevHistIndex = client.taskHistory.findIndex(h => h.id === prevTaskId);
      const prevCompleted = {
        ...client.task,
        id: prevTaskId,
        status: client.task.status === 'pending' ? 'done' : client.task.status,
        completedAt: client.task.completedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      if (prevHistIndex >= 0) {
        client.taskHistory[prevHistIndex] = prevCompleted;
      } else {
        client.taskHistory.unshift(prevCompleted);
      }
    }

    // Gera um ID totalmente NOVO para a nova tarefa
    const newTaskId = 'task-' + Date.now();
    const newTask = {
      id: newTaskId,
      action: action,
      dueDate: dueDate,
      dueTime: dueTime,
      endTime: endTime,
      duration: 30, // 30 minutos fixos na pauta
      notes: notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    client.nextStep = action;
    client.task = newTask;

    // Adiciona a nova tarefa no topo do histórico permanente
    client.taskHistory.unshift(newTask);

    if (typeof showToast === 'function') {
      showToast(`⏱️ Nova tarefa #${client.taskHistory.length} agendada para "${client.name}" e registrada no histórico!`, 'success', 4000);
    }
  }

  saveCommercialData();
  closeCommercialTaskModal();
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  if (typeof showToast === 'function') {
    showToast(`⏱️ Tarefa de 30min agendada para "${client.name}" e registrada no histórico!`, 'success', 4000);
  }
}

// Atalho para preencher sugestao rapida no modal de tarefa
function setTaskActionSuggestion(text) {
  const inputAction = document.getElementById('comm-task-action');
  if (inputAction) {
    inputAction.value = text;
    inputAction.focus();
  }
}
window.setTaskActionSuggestion = setTaskActionSuggestion;

// Atalhos de 1 clique para data
function setTaskDateQuick(preset) {
  const d = new Date();
  if (preset === 'amanha') {
    d.setDate(d.getDate() + 1);
  } else if (preset === 'segunda') {
    const day = d.getDay();
    const daysUntilMonday = ((1 - day + 7) % 7) || 7;
    d.setDate(d.getDate() + daysUntilMonday);
  } else if (preset === '2dias') {
    d.setDate(d.getDate() + 2);
  }
  const ymd = d.toISOString().split('T')[0];
  const input = document.getElementById('comm-task-date');
  if (input) input.value = ymd;
}
window.setTaskDateQuick = setTaskDateQuick;

// Atalhos de 1 clique para horário
function setTaskTimeQuick(timeStr) {
  const input = document.getElementById('comm-task-time');
  if (input) input.value = timeStr;
}
window.setTaskTimeQuick = setTaskTimeQuick;

// Configurar todos os eventos do Comercial
function setupCommercialEvents() {
  // Botao "+ Novo Cliente Comercial"
  document.getElementById('btn-open-commercial-modal')?.addEventListener('click', () => openCommercialModal());

  // Inicializar botao e modal de conexao MindChat (Verde = Conectado / Vermelho = Desconectado)
  setupCommercialMindChatToggle();

  // Fechar modal de cliente
  document.getElementById('modal-commercial-close')?.addEventListener('click', closeCommercialModal);
  document.getElementById('btn-cancel-commercial-modal')?.addEventListener('click', closeCommercialModal);
  
  // Clique fora do modal de cliente fecha
  const modal = document.getElementById('modal-commercial-client');
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeCommercialModal();
  });

  // Submit do formulario de cliente
  document.getElementById('form-commercial-client')?.addEventListener('submit', handleCommercialSubmit);

  // Form de cadastro rápido de cliente na tabela mãe
  document.getElementById('form-comm-quick-add')?.addEventListener('submit', handleQuickAddCommercialClient);

  // Alternador do acordeão de cadastro rápido
  function toggleCommercialQuickAddAccordion() {
    const collapse = document.getElementById('comm-quick-add-collapse');
    const btn = document.getElementById('btn-toggle-comm-quick-add');
    if (!collapse) return;
    const isHidden = collapse.style.display === 'none';
    if (isHidden) {
      collapse.style.display = 'block';
      btn?.classList.add('open');
      setTimeout(() => {
        document.getElementById('comm-quick-name')?.focus();
      }, 50);
    } else {
      collapse.style.display = 'none';
      btn?.classList.remove('open');
    }
  }
  window.toggleCommercialQuickAddAccordion = toggleCommercialQuickAddAccordion;

  // Eventos do Modal de Marcar Tarefa
  document.getElementById('modal-commercial-task-close')?.addEventListener('click', closeCommercialTaskModal);
  document.getElementById('btn-cancel-commercial-task')?.addEventListener('click', cancelCommercialTaskEdit);

  const taskModal = document.getElementById('modal-commercial-task');
  taskModal?.addEventListener('click', (e) => {
    if (e.target === taskModal) closeCommercialTaskModal();
  });

  document.getElementById('form-commercial-task')?.addEventListener('submit', handleCommercialTaskSubmit);

  // Botoes de alternancia das sub-abas internas (por classe generica e por IDs)
  document.querySelectorAll('.comm-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.subtab || btn.dataset.subtabTarget || btn.dataset.commView || (btn.id || '').replace('btn-comm-view-', '').replace('comm-view-', '');
      if (target) setCommercialSubtab(target);
    });
  });

  document.getElementById('btn-comm-view-leads')?.addEventListener('click', () => setCommercialSubtab('leads'));
  document.getElementById('comm-view-leads')?.addEventListener('click', () => setCommercialSubtab('leads'));
  document.getElementById('btn-comm-view-fechar')?.addEventListener('click', () => setCommercialSubtab('fechar'));
  document.getElementById('comm-view-fechar')?.addEventListener('click', () => setCommercialSubtab('fechar'));
  document.getElementById('btn-comm-view-tarefas')?.addEventListener('click', () => setCommercialSubtab('tarefas'));
  document.getElementById('comm-view-tarefas')?.addEventListener('click', () => setCommercialSubtab('tarefas'));
  document.getElementById('btn-comm-view-kanban')?.addEventListener('click', () => setCommercialSubtab('kanban'));
  document.getElementById('comm-view-kanban')?.addEventListener('click', () => setCommercialSubtab('kanban'));

  // Subitem de Tarefas na Sidebar
  document.getElementById('side-item-comercial-tarefas')?.addEventListener('click', () => setCommercialSubtab('tarefas'));

  // Input de horário dinâmico no modal de tarefa (bloco de 30 minutos)
  const taskTimeInput = document.getElementById('comm-task-time');
  taskTimeInput?.addEventListener('input', () => {
    const val = taskTimeInput.value || '10:00';
    const rangeSpan = document.getElementById('comm-task-time-range');
    if (rangeSpan) {
      const end = calculateEndTime30m(val);
      rangeSpan.textContent = `${val} às ${end} (30 min)`;
    }
  });

  // Campo de Busca Rapida (com debounce)
  const searchInput = document.getElementById('comm-search-input');
  let searchTimeout = null;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      COMMERCIAL_STATE.search = e.target.value;
      renderCommercialApp();
    }, 180);
  });

  // Filtro de Area (suporta tanto comm-area-filter quanto comm-filter-area)
  const areaFilter = document.getElementById('comm-area-filter') || document.getElementById('comm-filter-area');
  areaFilter?.addEventListener('change', (e) => {
    COMMERCIAL_STATE.area = e.target.value;
    renderCommercialApp();
  });

  // Campo de Busca Rápida na Agenda de Tarefas
  const agendaSearchInput = document.getElementById('agenda-tarefas-search-input');
  let agendaSearchTimeout = null;
  agendaSearchInput?.addEventListener('input', (e) => {
    clearTimeout(agendaSearchTimeout);
    agendaSearchTimeout = setTimeout(() => {
      AGENDA_TAREFAS_STATE.search = e.target.value;
      renderAgendaTarefasView();
    }, 180);
  });

  // Atalhos Globais: Ctrl+Z (Desfazer) e Ctrl+Y (Refazer) para histórico de alterações
  document.addEventListener('keydown', (e) => {
    const targetTag = e.target?.tagName?.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select' || e.target?.isContentEditable) {
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
      if (e.shiftKey) {
        e.preventDefault();
        commercialGoForward();
      } else {
        e.preventDefault();
        commercialGoBack();
      }
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
      e.preventDefault();
      commercialGoForward();
    }
  });
}

// Utilitario simples para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Inicializacao automatica ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  loadCommercialData();
  setupCommercialEvents();
  updateCommercialMindChatButtonUi();
  renderCommercialApp();
});
