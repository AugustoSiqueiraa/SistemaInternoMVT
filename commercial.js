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
  mindchatConnected: localStorage.getItem('mvt_commercial_mindchat_connected') !== 'false'
};

// Carregar dados salvos no navegador (ou os dados padrao extraidos da planilha)
function loadCommercialData() {
  try {
    const saved = localStorage.getItem('mvt_commercial_clients');
    if (saved) {
      let parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Remove quaisquer leads brutos importados indevidamente do MindChat (mantém apenas clientes qualificados)
        parsed = parsed.filter(c => !c.id || !c.id.startsWith('comm-mindchat-'));
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
  COMMERCIAL_STATE.clients = JSON.parse(JSON.stringify(DEFAULT_COMMERCIAL_CLIENTS));
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

// Alternar sub-aba comercial ('fechar', 'leads', 'kanban')
function setCommercialSubtab(subtab) {
  if (!subtab) return;
  COMMERCIAL_STATE.subtab = subtab;

  // Atualiza botoes internos do Comercial
  document.querySelectorAll('.comm-view-btn').forEach(btn => {
    const target = btn.dataset.subtab || btn.dataset.subtabTarget || btn.dataset.commView || (btn.id || '').replace('btn-comm-view-', '').replace('comm-view-', '');
    btn.classList.toggle('active', target === subtab);
  });

  // Atualiza sub-itens do menu lateral esquerdo
  const sideFechar = document.getElementById('side-item-comercial-fechar');
  const sideLeads = document.getElementById('side-item-comercial-leads');
  if (sideFechar) sideFechar.classList.toggle('active', subtab === 'fechar');
  if (sideLeads) sideLeads.classList.toggle('active', subtab === 'leads');

  renderCommercialApp();
}
window.setCommercialSubtab = setCommercialSubtab;

// Renderizacao geral do modulo comercial
function renderCommercialApp() {
  const clients = COMMERCIAL_STATE.clients;

  // 1. Atualizar KPIs no banner superior
  const totalCount = clients.length;
  const fecharCount = clients.filter(c => c.status === 'Pronto para Fechar').length;
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

  // 2. Controlar visibilidade de Container (Tabela vs Kanban)
  const isKanban = COMMERCIAL_STATE.subtab === 'kanban';
  const tableContainer = document.getElementById('comm-table-view-container');
  const kanbanContainer = document.getElementById('comm-kanban-view-container');

  if (tableContainer) tableContainer.style.display = isKanban ? 'none' : 'block';
  if (kanbanContainer) kanbanContainer.style.display = isKanban ? 'block' : 'none';

  // 3. Filtrar clientes para a visao de lista/tabela
  let filtered = [...clients];

  // Se sub-aba for "fechar", filtra apenas quem esta pronto para fechar
  if (COMMERCIAL_STATE.subtab === 'fechar') {
    filtered = filtered.filter(c => c.status === 'Pronto para Fechar');
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

  // 4. Atualizar contador de resultados na barra de ferramentas
  const counterPillText = document.getElementById('comm-counter-text');
  const countBadge = document.getElementById('comm-count-badge');
  const textLabel = `${filtered.length} cliente${filtered.length === 1 ? '' : 's'}`;
  
  if (counterPillText) counterPillText.textContent = textLabel;
  if (countBadge) countBadge.textContent = textLabel;

  // 5. Renderizar view correspondente
  if (isKanban) {
    renderCommercialKanban(clients);
  } else {
    renderCommercialTable(filtered);
  }
}
window.renderCommercialApp = renderCommercialApp;

// Renderizacao da lista executiva / tabela de clientes
function renderCommercialTable(clients) {
  const container = document.getElementById('comm-leads-list');
  if (!container) return;

  if (clients.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3rem 1rem;">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">Nenhum cliente comercial encontrado</div>
        <p class="empty-state-text" style="margin-top: 0.5rem; color: var(--text-muted);">
          ${COMMERCIAL_STATE.subtab === 'fechar' 
            ? 'Não há nenhum cliente marcado como "Pronto para Fechar" no filtro atual. Clique em "Todos os Leads & Clientes" ou cadastre um novo.' 
            : 'Tente alterar os termos da busca ou filtre por outra área.'}
        </p>
        <button class="btn-primary" onclick="openCommercialModal()" style="margin-top: 1rem;">
          ➕ Cadastrar Novo Cliente Agora
        </button>
      </div>
    `;
    return;
  }

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '<span style="color: var(--text-muted); font-size: 0.76rem;">-</span>';
    const parts = String(dateStr).split('T')[0].split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return escapeHtml(dateStr);
  };

  const getStatusBadge = (status) => {
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
  };

  const getAreaBadge = (area) => {
    const areaLower = (area || '').toLowerCase();
    let cls = 'badge-area-trabalhista';
    if (areaLower.includes('trab/prev') || (areaLower.includes('trab') && areaLower.includes('prev'))) cls = 'badge-area-trabprev';
    else if (areaLower.includes('prev') || areaLower.includes('aposentadoria')) cls = 'badge-area-previdenciario';
    else if (areaLower.includes('aux')) cls = 'badge-area-auxacidente';
    else if (areaLower.includes('estatut')) cls = 'badge-area-estatutaria';
    else if (areaLower.includes('cível') || areaLower.includes('civil')) cls = 'badge-area-civel';
    return `<span class="area-badge ${cls}">${escapeHtml(area || 'Geral')}</span>`;
  };

  const cleanPhoneForWa = (phone) => {
    if (!phone) return '';
    let digits = phone.replace(/\D/g, '');
    if (digits.length === 10 || digits.length === 11) digits = '55' + digits;
    return digits;
  };

  const formatPhoneDisplay = (phone) => {
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
  };

  container.innerHTML = clients.map(client => {
    const waDigits = cleanPhoneForWa(client.phone);
    const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Tudo bem? Augusto da MVT Advogados por aqui.`)}` : '';
    const hasTask = Boolean(client.task && client.task.dueDate);

    return `
      <div class="comm-lead-row" id="comm-row-${client.id}">
        <!-- Coluna 1: Data -->
        <div class="comm-col-date">
          <span class="comm-date-badge">${formatDateDisplay(client.date)}</span>
        </div>

        <!-- Coluna 2: Cliente -->
        <div class="comm-col-client">
          <span class="comm-client-name" title="${escapeHtml(client.name)}">${escapeHtml(client.name)}</span>
          <span class="comm-client-phone">${formatPhoneDisplay(client.phone)}</span>
        </div>

        <!-- Coluna 3: Área -->
        <div class="comm-col-area">
          ${getAreaBadge(client.area)}
        </div>

        <!-- Coluna 4: Tipo de Atendimento -->
        <div class="comm-col-type">
          ${getStatusBadge(client.status)}
          <select class="comm-quick-status-select" onchange="changeCommercialStatus('${client.id}', this.value)" title="Alterar tipo de atendimento">
            <option value="Lead Novo" ${client.status === 'Lead Novo' ? 'selected' : ''}>Lead Novo</option>
            <option value="Follow-up" ${client.status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
            <option value="Aguardando DOCS" ${client.status === 'Aguardando DOCS' ? 'selected' : ''}>Aguardando DOCS</option>
            <option value="Pronto para Fechar" ${client.status === 'Pronto para Fechar' ? 'selected' : ''}>Pronto para Fechar</option>
            <option value="Fechado" ${client.status === 'Fechado' ? 'selected' : ''}>Contrato Fechado</option>
            <option value="Desqualificado" ${client.status === 'Desqualificado' ? 'selected' : ''}>Desqualificado</option>
          </select>
        </div>

        <!-- Coluna 5: Próximo Passo -->
        <div class="comm-col-nextstep">
          <span class="comm-nextstep-text" title="${escapeHtml(client.nextStep || 'Acompanhamento do direito')}">${escapeHtml(client.nextStep || 'Acompanhamento do direito')}</span>
          ${hasTask ? `
            <span class="comm-task-due-pill">
              📅 Prazo: ${formatDateDisplay(client.task.dueDate)}${client.task.dueTime ? ' às ' + client.task.dueTime : ''}
            </span>
          ` : ''}
        </div>

        <!-- Coluna 6: Tarefa & Ações Rápidas -->
        <div class="comm-col-actions">
          <button class="btn-task-action ${hasTask ? 'has-task' : ''}" onclick="openCommercialTaskModal('${client.id}')" title="Marcar ou editar tarefa para não perder o direito do cliente">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${hasTask ? 'Tarefa Agendada' : 'Marcar Tarefa'}
          </button>

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
      </div>
    `;
  }).join('');
}

// Renderizacao do Quadro Kanban
function renderCommercialKanban(clients) {
  const colFollowup = document.getElementById('kanban-cards-followup');
  const colDocs = document.getElementById('kanban-cards-docs');
  const colFechar = document.getElementById('kanban-cards-fechar');
  const colFechado = document.getElementById('kanban-cards-fechado');

  if (!colFollowup || !colDocs || !colFechar || !colFechado) return;

  const followupList = clients.filter(c => c.status === 'Follow-up' || c.status === 'Aguardando Reunião' || c.status === 'Lead Novo' || c.status === 'Desqualificado');
  const docsList = clients.filter(c => c.status === 'Aguardando DOCS');
  const fecharList = clients.filter(c => c.status === 'Pronto para Fechar');
  const fechadoList = clients.filter(c => c.status === 'Fechado');

  // Atualizar contadores do topo das colunas
  const countFollowup = document.getElementById('kanban-count-followup');
  const countDocs = document.getElementById('kanban-count-docs');
  const countFechar = document.getElementById('kanban-count-fechar');
  const countFechado = document.getElementById('kanban-count-fechado');

  if (countFollowup) countFollowup.textContent = followupList.length;
  if (countDocs) countDocs.textContent = docsList.length;
  if (countFechar) countFechar.textContent = fecharList.length;
  if (countFechado) countFechado.textContent = fechadoList.length;

  const cleanPhoneForWa = (phone) => {
    if (!phone) return '';
    let digits = phone.replace(/\\D/g, '');
    if (digits.length === 10 || digits.length === 11) digits = '55' + digits;
    return digits;
  };

  const renderCards = (list, currentColumn) => {
    if (list.length === 0) {
      return '<div class="kanban-empty">Nenhum cliente nesta fase</div>';
    }
    return list.map(client => {
      const waDigits = cleanPhoneForWa(client.phone);
      const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Augusto da MVT Advogados.`)}` : '';

      return `
        <div class="kanban-card" id="kanban-card-${client.id}">
          <div class="kanban-card-header">
            <span class="kanban-client-name" title="${escapeHtml(client.name)}">${escapeHtml(client.name)}</span>
            <span class="kanban-area-tag">${escapeHtml(client.area || 'Geral')}</span>
          </div>

          ${client.nextStep ? `
            <div class="kanban-step-text">
              <span>🎯</span> ${escapeHtml(client.nextStep)}
            </div>
          ` : ''}

          ${client.notes ? `
            <div class="kanban-notes-text" title="${escapeHtml(client.notes)}">
              💬 ${escapeHtml(client.notes)}
            </div>
          ` : ''}

          <div class="kanban-card-footer">
            <div class="kanban-card-actions-left">
              <button class="btn-icon-clean" onclick="openCommercialModal('${client.id}')" title="Editar dados do cliente">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
            
            <div class="kanban-card-stage-buttons">
              ${currentColumn !== 'followup' ? `
                <button class="btn-stage-move" onclick="changeCommercialStatus('${client.id}', 'Follow-up')" title="Voltar para Follow-up">◀</button>
              ` : ''}
              ${currentColumn === 'followup' ? `
                <button class="btn-stage-move" onclick="changeCommercialStatus('${client.id}', 'Aguardando DOCS')" title="Mover para DOCS">DOCS ▶</button>
              ` : ''}
              ${currentColumn === 'docs' ? `
                <button class="btn-stage-move highlight" onclick="changeCommercialStatus('${client.id}', 'Pronto para Fechar')" title="Mover para Pronto para Fechar">Fechar 🎯</button>
              ` : ''}
              ${currentColumn === 'fechar' ? `
                <button class="btn-stage-move success" onclick="changeCommercialStatus('${client.id}', 'Fechado')" title="Fechar Contrato!">Fechado ✅</button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  colFollowup.innerHTML = renderCards(followupList, 'followup');
  colDocs.innerHTML = renderCards(docsList, 'docs');
  colFechar.innerHTML = renderCards(fecharList, 'fechar');
  colFechado.innerHTML = renderCards(fechadoList, 'fechado');
}

// Alteracao rapida de status comercial
function changeCommercialStatus(id, newStatus) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === id);
  if (!client) return;
  const oldStatus = client.status;
  client.status = newStatus;
  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Status de ${client.name} alterado para "${newStatus}".`, 'success', 2200);
  }
}
window.changeCommercialStatus = changeCommercialStatus;

// Exclusao de cliente
function deleteCommercialClient(id) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === id);
  if (!client) return;
  if (!confirm(`Deseja realmente remover o cliente "${client.name}" do sistema comercial?`)) return;

  COMMERCIAL_STATE.clients = COMMERCIAL_STATE.clients.filter(c => c.id !== id);
  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Cliente "${client.name}" removido com sucesso.`, 'info', 2200);
  }
}
window.deleteCommercialClient = deleteCommercialClient;

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
      if (inputArea) inputArea.value = client.area || 'Trab/Prev';
      if (inputStatus) inputStatus.value = client.status || 'Follow-up';
      if (inputNextStep) inputNextStep.value = client.nextStep || '';
      if (inputNotes) inputNotes.value = client.notes || '';
    }
  } else {
    if (title) title.textContent = 'Novo Cliente Comercial';
    if (form) form.reset();
    if (inputId) inputId.value = '';
    if (inputDate) inputDate.value = todayIso;
    // Status padrao inteligente: se estiver na aba "fechar", ja vem "Pronto para Fechar"
    if (inputStatus) {
      inputStatus.value = COMMERCIAL_STATE.subtab === 'fechar' ? 'Pronto para Fechar' : 'Lead Novo';
    }
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
      client.area = inputArea?.value || 'Trab/Prev';
      client.status = inputStatus?.value || 'Pronto para Fechar';
      client.nextStep = (inputNextStep?.value || '').trim();
      client.notes = (inputNotes?.value || '').trim();
    }
  } else {
    const newClient = {
      id: `comm-user-${Date.now()}`,
      date: dateVal,
      name: name,
      phone: (inputPhone?.value || '').trim(),
      area: inputArea?.value || 'Trab/Prev',
      status: inputStatus?.value || 'Lead Novo',
      nextStep: (inputNextStep?.value || '').trim() || 'Acompanhamento do direito',
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

// ========================================================
// MODAL DE MARCAR TAREFA COMERCIAL (PROXIMO PASSO)
// ========================================================
function openCommercialTaskModal(clientId) {
  const modal = document.getElementById('modal-commercial-task');
  if (!modal) return;

  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  const inputClientId = document.getElementById('comm-task-client-id');
  const previewName = document.getElementById('comm-task-client-name');
  const previewSub = document.getElementById('comm-task-client-sub');
  const inputAction = document.getElementById('comm-task-action');
  const inputDate = document.getElementById('comm-task-date');
  const inputTime = document.getElementById('comm-task-time');
  const inputNotes = document.getElementById('comm-task-notes');

  if (inputClientId) inputClientId.value = client.id;
  if (previewName) previewName.textContent = client.name || 'Cliente';
  if (previewSub) previewSub.textContent = `Área: ${client.area || 'Geral'}  •  Fase: ${client.status || 'Follow-up'}`;

  // Se o cliente ja tiver uma tarefa registrada
  if (client.task) {
    if (inputAction) inputAction.value = client.task.action || client.nextStep || '';
    if (inputDate) inputDate.value = client.task.dueDate || new Date().toISOString().split('T')[0];
    if (inputTime) inputTime.value = client.task.dueTime || '';
    if (inputNotes) inputNotes.value = client.task.notes || '';
  } else {
    // Padrão amigável: próximo passo atual ou sugestão
    if (inputAction) inputAction.value = client.nextStep || '';
    if (inputDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      inputDate.value = tomorrow.toISOString().split('T')[0];
    }
    if (inputTime) inputTime.value = '10:00';
    if (inputNotes) inputNotes.value = '';
  }

  modal.classList.add('active');
  setTimeout(() => inputAction?.focus(), 100);
}
window.openCommercialTaskModal = openCommercialTaskModal;

function closeCommercialTaskModal() {
  const modal = document.getElementById('modal-commercial-task');
  if (modal) modal.classList.remove('active');
}
window.closeCommercialTaskModal = closeCommercialTaskModal;

// Salvar Tarefa do Cliente
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
  const dueTime = (inputTime?.value || '').trim();
  const notes = (inputNotes?.value || '').trim();

  // Atualiza proximo passo e tarefa estruturada
  client.nextStep = action;
  client.task = {
    action: action,
    dueDate: dueDate,
    dueTime: dueTime,
    notes: notes,
    updatedAt: new Date().toISOString()
  };

  saveCommercialData();
  closeCommercialTaskModal();
  renderCommercialApp();

  if (typeof showToast === 'function') {
    showToast(`Tarefa marcada para "${client.name}" com sucesso!`, 'success');
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

// Atalho para definir data relativa no modal de tarefa
function setTaskDateShortcut(daysToAdd) {
  const inputDate = document.getElementById('comm-task-date');
  if (!inputDate) return;
  const target = new Date();
  target.setDate(target.getDate() + daysToAdd);
  inputDate.value = target.toISOString().split('T')[0];
}
window.setTaskDateShortcut = setTaskDateShortcut;

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

  // Eventos do Modal de Marcar Tarefa
  document.getElementById('modal-commercial-task-close')?.addEventListener('click', closeCommercialTaskModal);
  document.getElementById('btn-cancel-commercial-task')?.addEventListener('click', closeCommercialTaskModal);

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
  document.getElementById('btn-comm-view-kanban')?.addEventListener('click', () => setCommercialSubtab('kanban'));
  document.getElementById('comm-view-kanban')?.addEventListener('click', () => setCommercialSubtab('kanban'));

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
