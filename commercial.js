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
  subtab: 'fechar', // 'fechar', 'leads', 'kanban'
  search: '',
  area: 'all'
};

// Carregar dados salvos no navegador (ou os dados padrao extraidos da planilha)
function loadCommercialData() {
  try {
    const saved = localStorage.getItem('mvt_commercial_clients');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        COMMERCIAL_STATE.clients = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar clientes comerciais do localStorage:', e);
  }
  // Se nao houver dados salvos, usa a base da planilha
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

// Alternar sub-aba comercial ('fechar', 'leads', 'kanban')
function setCommercialSubtab(subtab) {
  if (!subtab) return;
  COMMERCIAL_STATE.subtab = subtab;

  // Atualiza botoes internos do Comercial
  document.querySelectorAll('.comm-view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.commView === subtab);
  });

  // Atualiza sub-itens do menu lateral esquerdo
  document.querySelectorAll('#side-item-comercial-fechar, #side-item-comercial-leads').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.subtab === subtab);
  });

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
  if (COMMERCIAL_STATE.area !== 'all') {
    filtered = filtered.filter(c => c.area === COMMERCIAL_STATE.area);
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

  // 4. Atualizar badge de contagem
  const countBadge = document.getElementById('comm-count-badge');
  if (countBadge) {
    if (COMMERCIAL_STATE.subtab === 'fechar') {
      countBadge.textContent = `🎯 Exibindo ${filtered.length} prontos para fechar (Total: ${fecharCount})`;
    } else if (COMMERCIAL_STATE.subtab === 'kanban') {
      countBadge.textContent = `📊 Quadro do Funil Comercial (${totalCount} clientes)`;
    } else {
      countBadge.textContent = `Exibindo ${filtered.length} de ${totalCount} clientes`;
    }
  }

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

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pronto para Fechar':
        return '<span class="comm-status-badge status-fechar">🎯 Pronto p/ Fechar</span>';
      case 'Aguardando DOCS':
        return '<span class="comm-status-badge status-docs">📄 Aguardando DOCS</span>';
      case 'Fechado':
        return '<span class="comm-status-badge status-fechado">✅ Contrato Fechado</span>';
      case 'Desqualificado':
        return '<span class="comm-status-badge status-desqualificado">❌ Desqualificado</span>';
      case 'Aguardando Reunião':
        return '<span class="comm-status-badge status-reuniao">🗓️ Aguardando Reunião</span>';
      default:
        return '<span class="comm-status-badge status-followup">⏳ Follow-up</span>';
    }
  };

  const getAreaBadge = (area) => {
    const areaLower = (area || '').toLowerCase();
    let cls = 'badge-area-trabalhista';
    if (areaLower.includes('prev') || areaLower.includes('aposentadoria')) cls = 'badge-area-previdenciario';
    else if (areaLower.includes('aux')) cls = 'badge-area-auxacidente';
    else if (areaLower.includes('estatut')) cls = 'badge-area-estatutaria';
    else if (areaLower.includes('cível') || areaLower.includes('civil')) cls = 'badge-area-civel';
    return `<span class="area-badge ${cls}">${area || 'Geral'}</span>`;
  };

  const cleanPhoneForWa = (phone) => {
    if (!phone) return '';
    let digits = phone.replace(/\\D/g, '');
    if (digits.length === 10 || digits.length === 11) digits = '55' + digits;
    return digits;
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '<span style="color: var(--text-muted); font-size: 0.8rem; font-style: italic;">Sem telefone</span>';
    const digits = phone.replace(/\\D/g, '');
    if (digits.length === 13 && digits.startsWith('55')) {
      return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
    }
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    return phone;
  };

  container.innerHTML = clients.map(client => {
    const waDigits = cleanPhoneForWa(client.phone);
    const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Tudo bem? Augusto da MVT Advogados por aqui.`)}` : '';
    const initial = (client.name || 'C').trim().charAt(0).toUpperCase();

    return `
      <div class="comm-lead-row" id="comm-row-${client.id}">
        <!-- Coluna 1: Avatar e Identificacao -->
        <div class="comm-col-client">
          <div class="comm-avatar">${initial}</div>
          <div class="comm-client-info">
            <span class="comm-client-name" title="${escapeHtml(client.name)}">${escapeHtml(client.name)}</span>
            <div class="comm-client-subline">
              ${getAreaBadge(client.area)}
              ${client.responsible ? `<span class="comm-responsible-tag">👤 ${escapeHtml(client.responsible)}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Coluna 2: Status Comercial com Seletor Rapido -->
        <div class="comm-col-status">
          ${getStatusBadge(client.status)}
          <select class="comm-quick-status-select" onchange="changeCommercialStatus('${client.id}', this.value)" title="Alterar fase comercial">
            <option value="Pronto para Fechar" ${client.status === 'Pronto para Fechar' ? 'selected' : ''}>🎯 Pronto para Fechar</option>
            <option value="Aguardando DOCS" ${client.status === 'Aguardando DOCS' ? 'selected' : ''}>📄 Aguardando DOCS</option>
            <option value="Follow-up" ${client.status === 'Follow-up' ? 'selected' : ''}>⏳ Follow-up</option>
            <option value="Aguardando Reunião" ${client.status === 'Aguardando Reunião' ? 'selected' : ''}>🗓️ Aguardando Reunião</option>
            <option value="Fechado" ${client.status === 'Fechado' ? 'selected' : ''}>✅ Contrato Fechado</option>
            <option value="Desqualificado" ${client.status === 'Desqualificado' ? 'selected' : ''}>❌ Desqualificado</option>
          </select>
        </div>

        <!-- Coluna 3: WhatsApp e Contato -->
        <div class="comm-col-contact">
          <span class="comm-phone-text">${formatPhoneDisplay(client.phone)}</span>
          ${waDigits ? `
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-sm" title="Conversar no WhatsApp">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893 0-3.177-1.237-6.164-3.488-8.417"/>
              </svg>
              WhatsApp
            </a>
          ` : ''}
        </div>

        <!-- Coluna 4: Proximo Passo & Tarefa -->
        <div class="comm-col-nextstep">
          <span class="comm-nextstep-label">🎯 Próximo Passo:</span>
          <span class="comm-nextstep-value" title="${escapeHtml(client.nextStep || 'Acompanhamento')}">${escapeHtml(client.nextStep || 'Acompanhamento')}</span>
        </div>

        <!-- Coluna 5: Observacoes / Anotacoes -->
        <div class="comm-col-notes">
          <span class="comm-notes-preview" title="${escapeHtml(client.notes || '')}">
            ${client.notes ? escapeHtml(client.notes) : '<span style="color: var(--text-muted); font-style: italic;">Sem anotações</span>'}
          </span>
        </div>

        <!-- Coluna 6: Acoes Rapidas -->
        <div class="comm-col-actions">
          <button class="btn-icon-clean" onclick="openCommercialModal('${client.id}')" title="Editar cliente">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button class="btn-icon-clean danger" onclick="deleteCommercialClient('${client.id}')" title="Excluir cliente">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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
              ${waDigits ? `
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-mini" title="WhatsApp">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893 0-3.177-1.237-6.164-3.488-8.417"/>
                  </svg>
                  Zap
                </a>
              ` : ''}
              <button class="btn-kanban-edit" onclick="openCommercialModal('${client.id}')" title="Editar">✏️</button>
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
  const inputName = document.getElementById('comm-client-name');
  const inputPhone = document.getElementById('comm-client-phone');
  const inputArea = document.getElementById('comm-client-area');
  const inputStatus = document.getElementById('comm-client-status');
  const inputNextStep = document.getElementById('comm-client-next-step');
  const inputNotes = document.getElementById('comm-client-notes');

  if (clientId) {
    const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
    if (client) {
      if (title) title.textContent = '✏️ Editar Cliente Comercial';
      if (inputId) inputId.value = client.id;
      if (inputName) inputName.value = client.name || '';
      if (inputPhone) inputPhone.value = client.phone || '';
      if (inputArea) inputArea.value = client.area || 'Trabalhista';
      if (inputStatus) inputStatus.value = client.status || 'Pronto para Fechar';
      if (inputNextStep) inputNextStep.value = client.nextStep || '';
      if (inputNotes) inputNotes.value = client.notes || '';
    }
  } else {
    if (title) title.textContent = '➕ Novo Cliente Comercial';
    if (form) form.reset();
    if (inputId) inputId.value = '';
    // Status padrao inteligente: se estiver na aba "fechar", ja vem "Pronto para Fechar"
    if (inputStatus) {
      inputStatus.value = COMMERCIAL_STATE.subtab === 'fechar' ? 'Pronto para Fechar' : 'Follow-up';
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

  const id = inputId?.value;
  const isEditing = Boolean(id);

  if (isEditing) {
    const client = COMMERCIAL_STATE.clients.find(c => c.id === id);
    if (client) {
      client.name = name;
      client.phone = (inputPhone?.value || '').trim();
      client.area = inputArea?.value || 'Trabalhista';
      client.status = inputStatus?.value || 'Pronto para Fechar';
      client.nextStep = (inputNextStep?.value || '').trim();
      client.notes = (inputNotes?.value || '').trim();
    }
  } else {
    const newClient = {
      id: `comm-user-${Date.now()}`,
      name: name,
      phone: (inputPhone?.value || '').trim(),
      area: inputArea?.value || 'Trabalhista',
      status: inputStatus?.value || 'Pronto para Fechar',
      nextStep: (inputNextStep?.value || '').trim() || 'Acompanhamento comercial',
      notes: (inputNotes?.value || '').trim(),
      date: new Date().toISOString().split('T')[0],
      responsible: 'Augusto'
    };
    // Adiciona no topo da lista para ficar visivel na hora
    COMMERCIAL_STATE.clients.unshift(newClient);
  }

  saveCommercialData();
  closeCommercialModal();
  renderCommercialApp();

  if (typeof showToast === 'function') {
    showToast(isEditing ? `Cliente "${name}" atualizado!` : `🎉 Novo cliente "${name}" adicionado com sucesso!`, 'success');
  }
}

// Configurar todos os eventos do Comercial
function setupCommercialEvents() {
  // Botao "+ Novo Cliente Comercial"
  document.getElementById('btn-open-commercial-modal')?.addEventListener('click', () => openCommercialModal());

  // Fechar modal
  document.getElementById('modal-commercial-close')?.addEventListener('click', closeCommercialModal);
  document.getElementById('btn-cancel-commercial-modal')?.addEventListener('click', closeCommercialModal);
  
  // Clique fora do modal fecha
  const modal = document.getElementById('modal-commercial-client');
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeCommercialModal();
  });

  // Submit do formulario de cliente
  document.getElementById('form-commercial-client')?.addEventListener('submit', handleCommercialSubmit);

  // Botoes de alternancia das sub-abas internas
  document.getElementById('btn-comm-view-fechar')?.addEventListener('click', () => setCommercialSubtab('fechar'));
  document.getElementById('btn-comm-view-leads')?.addEventListener('click', () => setCommercialSubtab('leads'));
  document.getElementById('btn-comm-view-kanban')?.addEventListener('click', () => setCommercialSubtab('kanban'));

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

  // Filtro de Area
  document.getElementById('comm-filter-area')?.addEventListener('change', (e) => {
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
  renderCommercialApp();
});
