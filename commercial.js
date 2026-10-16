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
  subtab: sessionStorage.getItem('mvt_comm_active_subtab') || 'leads', // Lembra sub-aba ativa após recarregar
  search: '',
  area: 'all',
  density: localStorage.getItem('mvt_comm_density') || 'comfortable',
  zoom: parseInt(localStorage.getItem('mvt_comm_zoom') || '100', 10),
  panoramic: localStorage.getItem('mvt_comm_panoramic') === 'true',
  taskModalTab: 'form',
  taskStatusFilter: 'all', // 'all', 'pending' (em aberto), 'today', 'done' (concluídas)
  taskAreaFilter: 'all',
  mindchatConnected: localStorage.getItem('mvt_commercial_mindchat_connected') !== 'false'
};
window.COMMERCIAL_STATE = COMMERCIAL_STATE;

// ========================================================
// GESTÃO DE OPÇÕES PERSONALIZADAS (NOME E COR)
// Para: Área, Tipo de Atendimento e Próximo Passo
// ========================================================

// 1. OBTENÇÃO DE CORES DINÂMICAS PARA CATEGORIAS (PADRÃO OU PERSONALIZADA)
function getCommercialAreaColor(areaName) {
  if (!areaName) return '#f59e0b';
  const clean = String(areaName).trim().toLowerCase();
  const customList = getCommercialCustomAreas();
  const matched = customList.find(c => {
    const n = (c && c.name ? String(c.name) : (typeof c === 'string' ? c : '')).trim().toLowerCase();
    return n === clean;
  });
  if (matched && matched.color) return matched.color;
  if (clean.includes('cív') || clean.includes('civ')) return '#38bdf8';
  if (clean.includes('prev') || clean.includes('aposent') || clean.includes('aux')) return '#a855f7';
  if (clean.includes('trab')) return '#f59e0b';
  return '#38bdf8';
}
window.getCommercialAreaColor = getCommercialAreaColor;

function getCommercialStatusColor(statusName) {
  if (!statusName) return '#38bdf8';
  const clean = String(statusName).trim().toLowerCase();
  const customList = getCommercialCustomTypes();
  const matched = customList.find(c => {
    const n = (c && c.name ? String(c.name) : (typeof c === 'string' ? c : '')).trim().toLowerCase();
    return n === clean;
  });
  if (matched && matched.color) return matched.color;
  if (clean.includes('novo')) return '#38bdf8';
  if (clean.includes('follow')) return '#a855f7';
  if (clean.includes('indica') || clean.includes('indicaç')) return '#10b981';
  if (clean.includes('fechar')) return '#f59e0b';
  if (clean.includes('assinado')) return '#059669';
  return '#38bdf8';
}
window.getCommercialStatusColor = getCommercialStatusColor;

function getCommercialNextStepColor(stepName) {
  if (!stepName) return '';
  const clean = String(stepName).trim().toLowerCase();
  const customList = getCommercialCustomNextSteps();
  const matched = customList.find(c => {
    const n = (c && c.name ? String(c.name) : (typeof c === 'string' ? c : '')).trim().toLowerCase();
    return n === clean;
  });
  if (matched && matched.color) return matched.color;
  return '';
}
window.getCommercialNextStepColor = getCommercialNextStepColor;

// 2. ÁREAS PERSONALIZADAS E CORES DE ÁREAS PADRÃO
function getCommercialCustomAreas() {
  try {
    const raw = localStorage.getItem('mvt_commercial_custom_areas');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          if (typeof item === 'string') {
            const clean = item.trim();
            return (clean && !clean.startsWith('__') && !clean.toUpperCase().includes('CREATE_')) ? { name: clean, color: '#38bdf8' } : null;
          }
          if (item && item.name) {
            const clean = String(item.name).trim();
            return (clean && !clean.startsWith('__') && !clean.toUpperCase().includes('CREATE_')) ? { name: clean, color: item.color || '#38bdf8' } : null;
          }
          return null;
        }).filter(Boolean);
      }
    }
  } catch (e) {}
  return [];
}
window.getCommercialCustomAreas = getCommercialCustomAreas;

function saveCommercialCustomArea(areaName, color = '#38bdf8') {
  if (!areaName || typeof areaName !== 'string') return;
  const clean = areaName.trim();
  if (!clean || clean.startsWith('__') || clean.toUpperCase().includes('CREATE_')) return;

  const list = getCommercialCustomAreas();
  const idx = list.findIndex(a => a && a.name && a.name.toLowerCase() === clean.toLowerCase());
  if (idx >= 0) {
    list[idx].color = color;
  } else {
    list.push({ name: clean, color: color || '#38bdf8' });
  }
  localStorage.setItem('mvt_commercial_custom_areas', JSON.stringify(list));
  syncCommercialAreaDropdowns();
}
window.saveCommercialCustomArea = saveCommercialCustomArea;

// 3. TIPOS DE ATENDIMENTO PERSONALIZADOS E CORES DE STATUS PADRÃO
function getCommercialCustomTypes() {
  try {
    const raw = localStorage.getItem('mvt_commercial_custom_types');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          if (typeof item === 'string') {
            const clean = item.trim();
            return (clean && !clean.startsWith('__') && !clean.toUpperCase().includes('CREATE_')) ? { name: clean, color: '#38bdf8' } : null;
          }
          if (item && item.name) {
            const clean = String(item.name).trim();
            return (clean && !clean.startsWith('__') && !clean.toUpperCase().includes('CREATE_')) ? { name: clean, color: item.color || '#38bdf8' } : null;
          }
          return null;
        }).filter(Boolean);
      }
    }
  } catch (e) {}
  return [];
}
window.getCommercialCustomTypes = getCommercialCustomTypes;

function saveCommercialCustomType(typeName, color = '#38bdf8') {
  if (!typeName || typeof typeName !== 'string') return;
  const clean = typeName.trim();
  if (!clean || clean.startsWith('__') || clean.toUpperCase().includes('CREATE_')) return;

  const list = getCommercialCustomTypes();
  const idx = list.findIndex(t => t && t.name && t.name.toLowerCase() === clean.toLowerCase());
  if (idx >= 0) {
    list[idx].color = color;
  } else {
    list.push({ name: clean, color: color || '#38bdf8' });
  }
  localStorage.setItem('mvt_commercial_custom_types', JSON.stringify(list));
  syncCommercialStatusDropdowns();
}
window.saveCommercialCustomType = saveCommercialCustomType;

// 4. PRÓXIMOS PASSOS PERSONALIZADOS E CORES DE PASSOS PADRÃO
function getCommercialCustomNextSteps() {
  try {
    const raw = localStorage.getItem('mvt_commercial_custom_nextsteps');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          if (typeof item === 'string') {
            const clean = item.trim();
            return (clean && !clean.startsWith('__') && !clean.toUpperCase().includes('CREATE_')) ? { name: clean, color: '#38bdf8' } : null;
          }
          if (item && item.name) {
            const clean = String(item.name).trim();
            return (clean && !clean.startsWith('__') && !clean.toUpperCase().includes('CREATE_')) ? { name: clean, color: item.color || '#38bdf8' } : null;
          }
          return null;
        }).filter(Boolean);
      }
    }
  } catch (e) {}
  return [];
}
window.getCommercialCustomNextSteps = getCommercialCustomNextSteps;

function saveCommercialCustomNextStep(stepName, color = '#38bdf8') {
  if (!stepName || typeof stepName !== 'string') return;
  const clean = stepName.trim();
  if (!clean || clean.startsWith('__') || clean.toUpperCase().includes('CREATE_')) return;

  const list = getCommercialCustomNextSteps();
  const idx = list.findIndex(s => s && s.name && s.name.toLowerCase() === clean.toLowerCase());
  if (idx >= 0) {
    list[idx].color = color;
  } else {
    list.push({ name: clean, color: color || '#38bdf8' });
  }
  localStorage.setItem('mvt_commercial_custom_nextsteps', JSON.stringify(list));
  syncCommercialNextStepDropdowns();
}
window.saveCommercialCustomNextStep = saveCommercialCustomNextStep;

// Excluir opção personalizada do usuário (ou reverter cor personalizada para o padrão)
function deleteCommercialCustomOption(type, name) {
  if (!name) return;
  const clean = name.trim().toLowerCase();

  if (type === 'area') {
    let list = getCommercialCustomAreas();
    list = list.filter(a => a && a.name && a.name.toLowerCase() !== clean);
    localStorage.setItem('mvt_commercial_custom_areas', JSON.stringify(list));
    syncCommercialAreaDropdowns();
  } else if (type === 'type') {
    let list = getCommercialCustomTypes();
    list = list.filter(t => t && t.name && t.name.toLowerCase() !== clean);
    localStorage.setItem('mvt_commercial_custom_types', JSON.stringify(list));
    syncCommercialStatusDropdowns();
  } else if (type === 'nextstep') {
    let list = getCommercialCustomNextSteps();
    list = list.filter(s => s && s.name && s.name.toLowerCase() !== clean);
    localStorage.setItem('mvt_commercial_custom_nextsteps', JSON.stringify(list));
    syncCommercialNextStepDropdowns();
  }

  renderExistingCustomOptions(type);
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Opção "${name}" atualizada com sucesso.`, 'info', 2200);
  }
}
window.deleteCommercialCustomOption = deleteCommercialCustomOption;

// Sincronização dos dropdowns de Status
function syncCommercialStatusDropdowns() {
  const defaultTypes = ['Lead Novo', 'Follow-up', 'Indicação'];
  const customTypes = getCommercialCustomTypes();
  const allTypes = [...defaultTypes];
  customTypes.forEach(ct => {
    const tName = ct.name || ct;
    if (tName && !allTypes.some(t => t.toLowerCase() === tName.toLowerCase())) {
      allTypes.push(tName);
    }
  });

  const quickType = document.getElementById('comm-quick-type');
  if (quickType) {
    const currentVal = quickType.value || 'Lead Novo';
    quickType.innerHTML = allTypes.map(t => `<option value="${escapeHtml(t)}" ${t === currentVal ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('') + '<option value="__CREATE_TYPE__">➕ Criar Tipo de Atendimento...</option>';
  }

  const modalStatus = document.getElementById('comm-client-status');
  if (modalStatus) {
    const currentVal = modalStatus.value || 'Lead Novo';
    modalStatus.innerHTML = allTypes.map(t => `<option value="${escapeHtml(t)}" ${t === currentVal ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('') + '<option value="__CREATE_TYPE__">➕ Criar Tipo de Atendimento...</option>';
  }
}
window.syncCommercialStatusDropdowns = syncCommercialStatusDropdowns;

// Sincronização dos dropdowns de Próximo Passo
function syncCommercialNextStepDropdowns() {
  const defaultSteps = [
    'Fazer ligação', 'Retornar cliente', 'Retorno para fechamento',
    'Solicitar documentos', 'Cobrar documentos', 'Analisar documentos',
    'Enviar contrato', 'Cobrar assinatura', 'Agendar reunião com advogado',
    'Confirmar reunião'
  ];
  const customSteps = getCommercialCustomNextSteps();
  const allSteps = [...defaultSteps];
  customSteps.forEach(cs => {
    const sName = cs.name || cs;
    if (sName && !allSteps.some(s => s.toLowerCase() === sName.toLowerCase())) {
      allSteps.push(sName);
    }
  });

  const quickStep = document.getElementById('comm-quick-nextstep');
  if (quickStep) {
    const currentVal = quickStep.value || 'Fazer ligação';
    quickStep.innerHTML = allSteps.map(s => `<option value="${escapeHtml(s)}" ${s === currentVal ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('') + '<option value="__CREATE_NEXTSTEP__">➕ Criar Próximo Passo...</option>';
  }

  const modalStep = document.getElementById('comm-client-next-step');
  if (modalStep) {
    const currentVal = modalStep.value || 'Fazer ligação';
    modalStep.innerHTML = allSteps.map(s => `<option value="${escapeHtml(s)}" ${s === currentVal ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('') + '<option value="__CREATE_NEXTSTEP__">➕ Criar Próximo Passo...</option>';
  }
}
window.syncCommercialNextStepDropdowns = syncCommercialNextStepDropdowns;

// Renderizar lista interativa de opções no modal com visualização de padrões e personalizadas
function renderExistingCustomOptions(type) {
  const container = document.getElementById('custom-option-existing-chips');
  if (!container) return;

  try {
    let defaults = [];
    let getColorFn = null;
    let customList = [];

    if (type === 'area') {
      defaults = ['Trabalhista', 'Cível', 'Previdenciário'];
      getColorFn = getCommercialAreaColor;
      customList = getCommercialCustomAreas();
    } else if (type === 'type') {
      defaults = ['Lead Novo', 'Follow-up', 'Indicação', 'Pronto para Fechar', 'Contrato Assinado'];
      getColorFn = getCommercialStatusColor;
      customList = getCommercialCustomTypes();
    } else if (type === 'nextstep') {
      defaults = [
        'Fazer ligação', 'Retornar cliente', 'Retorno para fechamento',
        'Solicitar documentos', 'Cobrar documentos', 'Analisar documentos',
        'Enviar contrato', 'Cobrar assinatura', 'Agendar reunião com advogado',
        'Confirmar reunião'
      ];
      getColorFn = getCommercialNextStepColor;
      customList = getCommercialCustomNextSteps();
    }

    // Identifica quais opções criadas são novas (não estão entre os nomes padrão)
    const pureCustom = (Array.isArray(customList) ? customList : []).filter(c => {
      const n = (c && c.name ? String(c.name) : (typeof c === 'string' ? c : '')).trim();
      return n && !defaults.some(d => d.toLowerCase() === n.toLowerCase());
    });

    let html = `
      <div style="margin-bottom: 0.65rem;">
        <div style="font-size: 0.69rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem; text-transform: uppercase; letter-spacing: 0.5px;">
          Opções Padrão (Clique para alterar o nome ou a cor):
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${defaults.map(defName => {
            const col = (getColorFn ? getColorFn(defName) : '') || '#38bdf8';
            return `
              <span class="custom-option-chip" style="color: ${col}; border-color: ${col}55; background: ${col}18; cursor: pointer;" 
                    onclick="editCustomOptionFromChip('${escapeHtml(defName)}', '${col}')" 
                    title="Clique para escolher uma nova cor para '${escapeHtml(defName)}'">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${col};"></span>
                <span>${escapeHtml(defName)}</span>
                <span style="font-size: 0.62rem; opacity: 0.65; margin-left: 2px;">(Padrão)</span>
              </span>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (pureCustom.length > 0) {
      html += `
        <div style="margin-top: 0.65rem; padding-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.08);">
          <div style="font-size: 0.69rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem; text-transform: uppercase; letter-spacing: 0.5px;">
            Opções Adicionadas por Você:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${pureCustom.map(item => {
              const iName = (item && item.name ? String(item.name) : (typeof item === 'string' ? item : '')).trim();
              const col = (item && item.color) ? item.color : '#38bdf8';
              if (!iName) return '';
              return `
                <span class="custom-option-chip" style="color: ${col}; border-color: ${col}55; background: ${col}18; cursor: pointer;" 
                      onclick="editCustomOptionFromChip('${escapeHtml(iName)}', '${col}')" 
                      title="Clique para editar a cor de '${escapeHtml(iName)}'">
                  <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${col};"></span>
                  <span>${escapeHtml(iName)}</span>
                  <span class="custom-option-chip-del" onclick="event.stopPropagation(); deleteCommercialCustomOption('${type}', '${escapeHtml(iName)}')" title="Excluir esta opção">✕</span>
                </span>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  } catch (err) {
    console.warn('Erro ao renderizar opções existentes no modal:', err);
  }
}
window.renderExistingCustomOptions = renderExistingCustomOptions;

// Ao clicar em uma opção existente, carrega no formulário para mudar a cor
function editCustomOptionFromChip(name, color) {
  const nameInput = document.getElementById('custom-option-name');
  if (nameInput) {
    nameInput.value = name;
  }
  selectCustomOptionColor(color);
  updateCustomOptionPreview();
  if (typeof showToast === 'function') {
    showToast(`Editando "${name}". Escolha a nova cor e clique em "Salvar Opção".`, 'info', 2500);
  }
}
window.editCustomOptionFromChip = editCustomOptionFromChip;

// 4. MODAL POPUP PARA CRIAR / EDITAR OPÇÃO COM NOME E COR
function openCreateCustomOptionModal(type = 'area', clientId = '') {
  const modal = document.getElementById('modal-create-custom-option');
  if (!modal) {
    console.error('Modal #modal-create-custom-option não encontrado!');
    return;
  }

  // Abre de forma imediata e assegura visibilidade prioritária no topo
  modal.classList.add('active');
  modal.style.display = 'flex';
  modal.style.zIndex = '10005';
  modal.style.opacity = '1';
  modal.style.pointerEvents = 'auto';

  try {
    const typeInput = document.getElementById('custom-option-type');
    const clientInput = document.getElementById('custom-option-client-id');
    const title = document.getElementById('custom-option-modal-title');
    const subtitle = document.getElementById('custom-option-modal-subtitle');
    const nameInput = document.getElementById('custom-option-name');
    const nameLabel = document.getElementById('custom-option-name-label');

    if (typeInput) typeInput.value = type;
    if (clientInput) clientInput.value = clientId || '';
    if (nameInput) {
      nameInput.value = '';
    }

    if (type === 'area') {
      if (title) title.textContent = 'Personalizar Área de Atuação';
      if (subtitle) subtitle.textContent = 'Crie uma nova área ou clique em uma existente para alterar sua cor ou nome';
      if (nameLabel) nameLabel.textContent = 'Nome da Área *';
      if (nameInput) nameInput.placeholder = 'Ex: Tributário, Família, Imobiliário...';
    } else if (type === 'type') {
      if (title) title.textContent = 'Personalizar Tipo de Atendimento';
      if (subtitle) subtitle.textContent = 'Crie um novo tipo de atendimento ou clique em um existente para alterar sua cor';
      if (nameLabel) nameLabel.textContent = 'Nome do Tipo de Atendimento *';
      if (nameInput) nameInput.placeholder = 'Ex: Parceria, Retorno Urgente, Assessoria...';
    } else if (type === 'nextstep') {
      if (title) title.textContent = 'Personalizar Próximo Passo';
      if (subtitle) subtitle.textContent = 'Crie um novo próximo passo com cor ou altere a cor dos passos existentes';
      if (nameLabel) nameLabel.textContent = 'Nome do Próximo Passo *';
      if (nameInput) nameInput.placeholder = 'Ex: Apresentar proposta, Enviar procuração...';
    }

    selectCustomOptionColor('#38bdf8');
    updateCustomOptionPreview();
    renderExistingCustomOptions(type);

    setTimeout(() => nameInput?.focus(), 150);
  } catch (err) {
    console.warn('Erro ao configurar campos do modal de opção:', err);
  }
}
window.openCreateCustomOptionModal = openCreateCustomOptionModal;

function closeCreateCustomOptionModal() {
  const modal = document.getElementById('modal-create-custom-option');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}
window.closeCreateCustomOptionModal = closeCreateCustomOptionModal;

function selectCustomOptionColor(color, btnElement) {
  const hiddenInput = document.getElementById('custom-option-color-val');
  const colorInput = document.getElementById('custom-option-color-input');
  if (hiddenInput) hiddenInput.value = color;
  if (colorInput) colorInput.value = color;

  document.querySelectorAll('#custom-option-swatches .color-swatch-circle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === color || btn === btnElement);
  });

  updateCustomOptionPreview();
}
window.selectCustomOptionColor = selectCustomOptionColor;

function updateCustomOptionPreview() {
  const nameInput = document.getElementById('custom-option-name');
  const hiddenInput = document.getElementById('custom-option-color-val');
  const previewBadge = document.getElementById('custom-option-preview-badge');
  if (!previewBadge) return;

  const name = (nameInput?.value || '').trim() || 'Nome da Opção';
  const color = hiddenInput?.value || '#38bdf8';

  previewBadge.textContent = name;
  previewBadge.style.color = color;
  previewBadge.style.borderColor = color + '55';
  previewBadge.style.background = color + '1a';
}
window.updateCustomOptionPreview = updateCustomOptionPreview;

function handleSaveCustomOption(event) {
  if (event) event.preventDefault();

  const type = document.getElementById('custom-option-type')?.value || 'area';
  const clientId = document.getElementById('custom-option-client-id')?.value || '';
  const nameInput = document.getElementById('custom-option-name');
  const colorVal = document.getElementById('custom-option-color-val')?.value || '#38bdf8';

  const name = (nameInput?.value || '').trim();
  if (!name) {
    if (nameInput) nameInput.focus();
    return;
  }

  if (name.startsWith('__') || name.toUpperCase().includes('CREATE_')) {
    if (typeof showToast === 'function') {
      showToast('Por favor, informe um nome válido para a opção.', 'warning');
    }
    return;
  }

  const client = clientId ? COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId)) : null;

  if (type === 'area') {
    saveCommercialCustomArea(name, colorVal);
    if (client) {
      recordCommercialUndo(`Área de ${client.name} para "${name}"`);
      const cNameLower = (client.name || '').trim().toLowerCase();
      COMMERCIAL_STATE.clients.forEach(c => {
        if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
          c.area = name;
        }
      });
      saveCommercialData();
    }
    if (typeof showToast === 'function') {
      showToast(`Área "${name}" salva com cor personalizada!`, 'success', 2500);
    }
  } else if (type === 'type') {
    saveCommercialCustomType(name, colorVal);
    if (client) {
      recordCommercialUndo(`Tipo de atendimento de ${client.name} para "${name}"`);
      const cNameLower = (client.name || '').trim().toLowerCase();
      COMMERCIAL_STATE.clients.forEach(c => {
        if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
          c.tipoAtendimento = name;
          c.status = name;
        }
      });
      saveCommercialData();
    }
    if (typeof showToast === 'function') {
      showToast(`Tipo de atendimento "${name}" salvo com cor personalizada!`, 'success', 2500);
    }
  } else if (type === 'nextstep') {
    saveCommercialCustomNextStep(name, colorVal);
    if (client) {
      recordCommercialUndo(`Próximo passo de ${client.name} para "${name}"`);
      const cNameLower = (client.name || '').trim().toLowerCase();
      COMMERCIAL_STATE.clients.forEach(c => {
        if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
          c.nextStep = name;
          if (c.task) c.task.action = name;
        }
      });
      saveCommercialData();
    }
    if (typeof showToast === 'function') {
      showToast(`Próximo passo "${name}" salvo com cor personalizada!`, 'success', 2500);
    }
  }

  closeCreateCustomOptionModal();
  renderCommercialApp();
}
window.handleSaveCustomOption = handleSaveCustomOption;

// Seletor de cor no modal de agendamento de tarefa comercial
function selectCommercialTaskColor(color, btnElement) {
  const hiddenInput = document.getElementById('comm-task-color');
  const customInput = document.getElementById('comm-task-custom-color');
  if (hiddenInput) hiddenInput.value = color;
  if (customInput) customInput.value = color;

  document.querySelectorAll('#comm-task-color-swatches .color-swatch-circle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === color || btn === btnElement);
  });
}
window.selectCommercialTaskColor = selectCommercialTaskColor;

// Quantidade de reuniões / tarefas agendadas do cliente (sem duplicidade entre tarefa ativa e histórico)
function getClientAppointmentsCount(client) {
  if (!client) return 0;
  const uniqueItems = [];

  // 1. Tarefa ativa na pauta
  if (client.task && (client.task.dueDate || client.task.action)) {
    uniqueItems.push({
      id: client.task.id || '',
      date: (client.task.dueDate || '').substring(0, 10),
      time: client.task.dueTime || '10:00',
      action: (client.task.action || '').trim().toLowerCase()
    });
  }

  // 2. Histórico de tarefas do cliente
  if (Array.isArray(client.taskHistory)) {
    client.taskHistory.forEach((h, idx) => {
      if (!h) return;
      const hDate = (h.dueDate || h.completedAt || '').substring(0, 10);
      const hTime = h.dueTime || '10:00';
      const hAction = (h.action || '').trim().toLowerCase();
      const hId = h.id || '';

      // Verifica se é a MESMA tarefa (mesmo id, ou mesma ação e mesma data)
      const isDuplicate = uniqueItems.some(item => {
        if (hId && item.id && hId === item.id) return true;
        if (hAction && item.action && hAction === item.action) {
          if (hDate && item.date && hDate === item.date) return true;
          if (!hDate || !item.date) return true;
        }
        return false;
      });

      if (!isDuplicate && (hDate || hAction)) {
        uniqueItems.push({
          id: hId || `hist_${idx}`,
          date: hDate,
          time: hTime,
          action: hAction
        });
      }
    });
  }

  // 3. Reuniões de STATE.meetings (Agenda Oficial Anti No-Show)
  if (window.STATE && Array.isArray(window.STATE.meetings)) {
    const cName = (client.name || '').trim().toLowerCase();
    const cPhone = cleanPhoneForWa(client.phone);
    window.STATE.meetings.forEach((m, idx) => {
      const mName = (m.clientName || '').trim().toLowerCase();
      const mPhone = cleanPhoneForWa(m.clientPhone);
      if ((cName && (mName === cName || mName.includes(cName) || cName.includes(mName))) || (cPhone && mPhone && cPhone === mPhone)) {
        const mDate = (m.date || m.meeting_date || '').substring(0, 10);
        const mTime = m.time || '';
        const mId = m.id || '';

        const isDuplicate = uniqueItems.some(item => {
          if (mId && item.id && mId === item.id) return true;
          if (mDate && item.date && mDate === item.date && mTime && item.time && mTime.substring(0, 5) === item.time.substring(0, 5)) return true;
          return false;
        });

        if (!isDuplicate) {
          uniqueItems.push({
            id: mId || `meet_${idx}`,
            date: mDate,
            time: mTime,
            action: (m.notes || m.type || 'reunião').toLowerCase()
          });
        }
      }
    });
  }

  return uniqueItems.length;
}
window.getClientAppointmentsCount = getClientAppointmentsCount;

// Último agendamento do cliente com verificação de prazo (Vermelho se fora do prazo, Azul Claro se dentro)
function getClientLatestAppointment(client) {
  if (!client) return null;
  const list = [];

  if (client.task && client.task.dueDate) {
    list.push({
      date: client.task.dueDate,
      time: client.task.dueTime || '10:00',
      action: client.task.action || 'Compromisso',
      status: client.task.status || 'pending',
      color: client.task.color || null,
      source: 'active'
    });
  }

  if (Array.isArray(client.taskHistory)) {
    client.taskHistory.forEach(h => {
      if (h && h.dueDate) {
        list.push({
          date: h.dueDate,
          time: h.dueTime || '10:00',
          action: h.action || 'Compromisso',
          status: h.status || 'done',
          color: h.color || null,
          source: 'history'
        });
      }
    });
  }

  if (window.STATE && Array.isArray(window.STATE.meetings)) {
    const cName = (client.name || '').trim().toLowerCase();
    const cPhone = cleanPhoneForWa(client.phone);
    const todayStr = new Date().toISOString().split('T')[0];
    window.STATE.meetings.forEach(m => {
      const mName = (m.clientName || '').trim().toLowerCase();
      const mPhone = cleanPhoneForWa(m.clientPhone);
      if ((cName && (mName === cName || mName.includes(cName) || cName.includes(mName))) || (cPhone && mPhone && cPhone === mPhone)) {
        list.push({
          date: m.date || m.meeting_date || todayStr,
          time: m.time || '10:00',
          action: m.action || 'Reunião com Advogado',
          status: m.status || 'pending',
          color: null,
          source: 'meeting'
        });
      }
    });
  }

  if (list.length === 0) return null;

  const now = new Date();
  const nowTs = now.getTime();

  list.forEach(apt => {
    const dt = new Date(`${apt.date}T${apt.time || '00:00'}:00`);
    apt.timestamp = isNaN(dt.getTime()) ? 0 : dt.getTime();
    apt.isOverdue = apt.timestamp < nowTs;
  });

  // Se o cliente tem tarefa ativa definida em client.task, prioriza-a
  const activeTask = list.find(item => item.source === 'active');
  if (activeTask) {
    return activeTask;
  }

  list.sort((a, b) => b.timestamp - a.timestamp);
  return list[0];
}
window.getClientLatestAppointment = getClientLatestAppointment;

function formatDateTimeShort(dateStr, timeStr) {
  if (!dateStr) return '';
  const parts = String(dateStr).split('T')[0].split('-');
  let d = dateStr;
  if (parts.length === 3) {
    d = `${parts[2]}/${parts[1]}`;
  }
  return timeStr ? `${d} às ${timeStr}` : d;
}
window.formatDateTimeShort = formatDateTimeShort;

function syncCommercialAreaDropdowns() {
  const customAreas = getCommercialCustomAreas();
  const defaultAreas = ['Trabalhista', 'Cível', 'Previdenciário'];
  const allAreas = [...defaultAreas];
  customAreas.forEach(ca => {
    const name = ca.name || ca;
    if (!allAreas.some(a => a.toLowerCase() === name.toLowerCase())) {
      allAreas.push(name);
    }
  });

  // 1. Popover de Filtro de Área (#comm-area-filter)
  const filterSelect = document.getElementById('comm-area-filter');
  if (filterSelect) {
    const currentVal = filterSelect.value || 'all';
    filterSelect.innerHTML = `
      <option value="all">Todas as Áreas</option>
      ${allAreas.map(a => `<option value="${escapeHtml(a)}" ${a === currentVal ? 'selected' : ''}>${escapeHtml(a)}</option>`).join('')}
    `;
  }

  // 2. Quick Add Bar (#comm-quick-area)
  const quickSelect = document.getElementById('comm-quick-area');
  if (quickSelect) {
    const currentVal = quickSelect.value || 'Trabalhista';
    quickSelect.innerHTML = allAreas.map(a => `<option value="${escapeHtml(a)}" ${a === currentVal ? 'selected' : ''}>${escapeHtml(a)}</option>`).join('') + '<option value="__CREATE_AREA__">➕ Criar Área...</option>';
  }

  // 3. Modal de Edição de Cliente (#comm-client-area)
  const modalSelect = document.getElementById('comm-client-area');
  if (modalSelect) {
    const currentVal = modalSelect.value || 'Trabalhista';
    modalSelect.innerHTML = allAreas.map(a => `<option value="${escapeHtml(a)}" ${a === currentVal ? 'selected' : ''}>${escapeHtml(a)}</option>`).join('') + '<option value="__CREATE_AREA__">➕ Criar Área...</option>';
  }
}
window.syncCommercialAreaDropdowns = syncCommercialAreaDropdowns;

// Rotina de limpeza profunda de valores de tokens e opções corrompidas
function cleanupDirtyCustomOptions() {
  try {
    // 1. Limpar tipos customizados salvos
    const rawTypes = localStorage.getItem('mvt_commercial_custom_types');
    if (rawTypes) {
      let parsed = JSON.parse(rawTypes);
      if (Array.isArray(parsed)) {
        parsed = parsed.filter(item => {
          const name = typeof item === 'string' ? item : (item && item.name);
          return name && !name.startsWith('__') && !name.toUpperCase().includes('CREATE_');
        });
        localStorage.setItem('mvt_commercial_custom_types', JSON.stringify(parsed));
      }
    }

    // 2. Limpar áreas customizadas salvas
    const rawAreas = localStorage.getItem('mvt_commercial_custom_areas');
    if (rawAreas) {
      let parsed = JSON.parse(rawAreas);
      if (Array.isArray(parsed)) {
        parsed = parsed.filter(item => {
          const name = typeof item === 'string' ? item : (item && item.name);
          return name && !name.startsWith('__') && !name.toUpperCase().includes('CREATE_');
        });
        localStorage.setItem('mvt_commercial_custom_areas', JSON.stringify(parsed));
      }
    }

    // 3. Limpar próximos passos customizados salvos
    const rawSteps = localStorage.getItem('mvt_commercial_custom_nextsteps');
    if (rawSteps) {
      let parsed = JSON.parse(rawSteps);
      if (Array.isArray(parsed)) {
        parsed = parsed.filter(item => {
          const name = typeof item === 'string' ? item : (item && item.name);
          return name && !name.startsWith('__') && !name.toUpperCase().includes('CREATE_');
        });
        localStorage.setItem('mvt_commercial_custom_nextsteps', JSON.stringify(parsed));
      }
    }
  } catch (err) {
    console.warn('Erro ao limpar opções customizadas corrompidas:', err);
  }
}
window.cleanupDirtyCustomOptions = cleanupDirtyCustomOptions;

// Função auxiliar para higienizar dados de clientes e garantir histórico de tarefas
function sanitizeCommercialClient(c) {
  if (!c) return c;
  if (!Array.isArray(c.taskHistory)) c.taskHistory = [];

  // Normalização para Áreas (Trabalhista, Cível, Previdenciário ou Área Dinâmica Personalizada)
  let aTrimmed = (c.area || '').trim();
  if (aTrimmed.startsWith('__') || aTrimmed.toUpperCase().includes('CREATE_')) {
    aTrimmed = 'Trabalhista';
  }
  const aLower = aTrimmed.toLowerCase();
  if (aLower.includes('cív') || aLower.includes('civ')) {
    c.area = 'Cível';
  } else if (aLower.includes('prev') || aLower.includes('aposent') || aLower.includes('aux')) {
    c.area = 'Previdenciário';
  } else if (aLower.includes('trab')) {
    c.area = 'Trabalhista';
  } else if (aTrimmed) {
    // Preserva área personalizada criada dinamicamente pelo usuário
    c.area = aTrimmed;
    saveCommercialCustomArea(aTrimmed);
  } else {
    c.area = 'Trabalhista';
  }

  // Normalização para os Tipos de Atendimento: Lead Novo, Follow-up, Indicação, Pronto para Fechar, Contrato Assinado ou Personalizado
  let sTrimmed = (c.tipoAtendimento || c.status || '').trim();
  if (sTrimmed.startsWith('__') || sTrimmed.toUpperCase().includes('CREATE_')) {
    sTrimmed = 'Follow-up';
  }
  const sLower = sTrimmed.toLowerCase();

  if (c.contratoAssinado === true) {
    c.status = 'Contrato Assinado';
    c.tipoAtendimento = 'Contrato Assinado';
    c.contratoAssinado = true;
  } else if (c.contratoAssinado === false) {
    if (c.status === 'Contrato Assinado' || c.status === 'Fechado') {
      c.status = c.prontoParaFechar ? 'Pronto para Fechar' : (c.originalStatus || 'Follow-up');
      c.tipoAtendimento = c.status;
    }
  } else if (sLower.includes('assinado') || sLower.includes('fechado')) {
    c.status = 'Contrato Assinado';
    c.tipoAtendimento = 'Contrato Assinado';
    c.contratoAssinado = true;
  } else {
    const customTypes = getCommercialCustomTypes();
    const matchCustomType = customTypes.find(ct => (ct.name || ct).toLowerCase() === sLower);
    if (matchCustomType) {
      c.status = matchCustomType.name || matchCustomType;
      c.tipoAtendimento = c.status;
    } else if (sLower.includes('fechar') || sLower.includes('pronto')) {
      c.status = 'Pronto para Fechar';
      c.tipoAtendimento = 'Pronto para Fechar';
    } else if (sLower.includes('novo') || sLower.includes('lead')) {
      c.status = 'Lead Novo';
      c.tipoAtendimento = 'Lead Novo';
    } else if (sLower.includes('indica')) {
      c.status = 'Indicação';
      c.tipoAtendimento = 'Indicação';
    } else if (sTrimmed && sTrimmed !== 'Follow-up') {
      c.status = sTrimmed;
      c.tipoAtendimento = sTrimmed;
      saveCommercialCustomType(sTrimmed);
    } else {
      c.status = 'Follow-up';
      c.tipoAtendimento = 'Follow-up';
    }
  }

  // Higienizar próximo passo
  if (c.nextStep && (c.nextStep.startsWith('__') || c.nextStep.toUpperCase().includes('CREATE_'))) {
    c.nextStep = 'Fazer ligação';
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

  c.desqualificado = Boolean(c.desqualificado);
  c.motivoDesqualificado = c.motivoDesqualificado ? String(c.motivoDesqualificado).trim() : '';

  return c;
}

// Carregar dados salvos no navegador (ou os dados padrao extraidos da planilha)
function loadCommercialData() {
  cleanupDirtyCustomOptions();
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

// Converte um objeto de cliente do COMMERCIAL_STATE para a linha da tabela Supabase
function _commercialClientToRow(c) {
  const today = new Date().toISOString().split('T')[0];
  let finalNotes = String(c.notes || '');
  if (c.desqualificado) {
    const tag = `[DESQUALIFICADO: ${c.motivoDesqualificado || 'Sem motivo'}]`;
    if (!finalNotes.includes('[DESQUALIFICADO:')) {
      finalNotes = finalNotes ? `${finalNotes} ${tag}` : tag;
    }
  } else {
    finalNotes = finalNotes.replace(/\[DESQUALIFICADO:.*?\]\s*/g, '').trim();
  }

  return {
    id: String(c.id || ('comm-' + Date.now())),
    name: String(c.name || 'Cliente Sem Nome'),
    phone: String(c.phone || ''),
    area: String(c.area || 'Trabalhista'),
    status: String(c.status || 'Lead Novo'),
    next_step: String(c.nextStep || 'Acompanhamento'),
    notes: finalNotes,
    date: c.date || today,
    responsible: String(c.responsible || 'Augusto'),
    pronto_para_fechar: Boolean(c.prontoParaFechar || c.status === 'Pronto para Fechar'),
    task: c.task ? c.task : null,
    task_history: Array.isArray(c.taskHistory) ? c.taskHistory : [],
    updated_at: new Date().toISOString()
  };
}

// Converte uma linha do banco Supabase para o formato do COMMERCIAL_STATE
function _rowToCommercialClient(row) {
  let rawNotes = String(row.notes || '');
  let desqualificado = Boolean(row.desqualificado);
  let motivoDesqualificado = row.motivo_desqualificado ? String(row.motivo_desqualificado) : '';

  if (!desqualificado && rawNotes.includes('[DESQUALIFICADO:')) {
    const match = rawNotes.match(/\[DESQUALIFICADO:\s*(.*?)\]/);
    if (match) {
      desqualificado = true;
      motivoDesqualificado = match[1] || '';
    }
  }
  const cleanNotes = rawNotes.replace(/\[DESQUALIFICADO:.*?\]\s*/g, '').trim();

  const client = {
    id: String(row.id),
    name: String(row.name || ''),
    phone: String(row.phone || ''),
    area: String(row.area || 'Trabalhista'),
    status: String(row.status || 'Lead Novo'),
    nextStep: String(row.next_step || 'Acompanhamento'),
    notes: cleanNotes,
    date: row.date ? String(row.date) : new Date().toISOString().split('T')[0],
    responsible: String(row.responsible || 'Augusto'),
    prontoParaFechar: Boolean(row.pronto_para_fechar),
    desqualificado: desqualificado,
    motivoDesqualificado: motivoDesqualificado,
    task: row.task || null,
    taskHistory: Array.isArray(row.task_history) ? row.task_history : []
  };
  return sanitizeCommercialClient(client);
}

// Registro de IDs de clientes excluídos para evitar ressuscitação por sincronização em nuvem
const DELETED_COMMERCIAL_CLIENT_IDS_KEY = 'mvt_deleted_commercial_client_ids';

function getDeletedCommercialClientIds() {
  try {
    const raw = localStorage.getItem(DELETED_COMMERCIAL_CLIENT_IDS_KEY);
    return raw ? new Set(JSON.parse(raw).map(String)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function recordDeletedCommercialClientId(id) {
  try {
    const ids = getDeletedCommercialClientIds();
    ids.add(String(id));
    localStorage.setItem(DELETED_COMMERCIAL_CLIENT_IDS_KEY, JSON.stringify(Array.from(ids)));
  } catch (e) {}
}
window.recordDeletedCommercialClientId = recordDeletedCommercialClientId;

// Mescla clientes locais com a nuvem preservando tarefas e históricos locais para nunca perder agendamentos
function mergeCommercialClients(localClients, cloudClients) {
  if (!Array.isArray(cloudClients) || cloudClients.length === 0) return localClients || [];
  if (!Array.isArray(localClients) || localClients.length === 0) return cloudClients || [];

  const deletedIds = getDeletedCommercialClientIds();
  const map = new Map();

  // 1. Inicia com dados recebidos da nuvem (descartando clientes excluídos)
  cloudClients.forEach(c => {
    if (c && c.id && !deletedIds.has(String(c.id))) {
      map.set(String(c.id), { ...c });
    }
  });

  // 2. Preserva clientes locais e NUNCA sobrescreve tarefas ou históricos válidos
  localClients.forEach(c => {
    if (!c || !c.id || deletedIds.has(String(c.id))) return;
    const cid = String(c.id);
    if (!map.has(cid)) {
      map.set(cid, c);
    } else {
      const merged = map.get(cid);
      // Se a tarefa foi excluída localmente, não ressuscita da nuvem
      if (c.task === null || c.task === undefined) {
        if (c._taskDeletedAt) {
          merged.task = null;
        }
      } else if (c.task && c.task.dueDate) {
        merged.task = c.task;
      }
      // Se cliente local possui histórico e a nuvem não tem ou tem menos itens, preserva histórico local
      if (Array.isArray(c.taskHistory) && c.taskHistory.length > (Array.isArray(merged.taskHistory) ? merged.taskHistory.length : 0)) {
        merged.taskHistory = c.taskHistory;
      }
      if (c.desqualificado !== undefined && c.desqualificado !== null) {
        merged.desqualificado = c.desqualificado;
        merged.motivoDesqualificado = c.motivoDesqualificado || '';
      }
    }
  });

  return Array.from(map.values());
}

let _saveCommercialSupabaseTimeout = null;
let _lastCommercialSnapshotId = null;
let _commercialSyncInterval = null;

// Salvar dados no localStorage e sincronizar em nuvem no Supabase
function saveCommercialData(skipCloud = false) {
  try {
    localStorage.setItem('mvt_commercial_clients', JSON.stringify(COMMERCIAL_STATE.clients));
  } catch (e) {
    console.warn('Erro ao salvar clientes comerciais no localStorage:', e);
  }

  if (skipCloud) return;

  // Sincronização em nuvem assíncrona com debounce (350ms)
  if (_saveCommercialSupabaseTimeout) {
    clearTimeout(_saveCommercialSupabaseTimeout);
  }
  _saveCommercialSupabaseTimeout = setTimeout(async () => {
    try {
      const getSb = window.getSupabaseClient;
      const sb = typeof getSb === 'function' ? getSb() : null;
      if (!sb) return;

      const clientsJson = JSON.stringify(COMMERCIAL_STATE.clients);
      let dedicatedOk = false;

      // 1. Tentar salvar na tabela estruturada clientes_comercial (se criada)
      try {
        const rows = COMMERCIAL_STATE.clients.map(_commercialClientToRow);
        if (rows.length > 0) {
          const { error } = await sb.from('clientes_comercial').upsert(rows, { onConflict: 'id' });
          if (!error) {
            dedicatedOk = true;
            console.log(`☁️ ${rows.length} clientes salvos em clientes_comercial.`);
          }
        }
      } catch (e) {}

      // 2. Snapshot em nuvem garantido: se a tabela estruturada não existir, salva no canal de eventos em nuvem
      if (!dedicatedOk) {
        const { data: inserted, error: insertErr } = await sb.from('historico_eventos').insert({
          tipo_evento: 'ESTADO_PLANILHA_COMERCIAL',
          client_name: 'MVT Comercial',
          lawyer: 'Augusto',
          meeting_time: new Date().toLocaleTimeString('pt-BR'),
          descricao: clientsJson,
          data_evento: new Date().toISOString()
        }).select();

        if (insertErr) {
          console.warn('⚠️ Falha ao salvar snapshot comercial no Supabase:', insertErr.message);
        } else {
          if (inserted && inserted[0]?.id) {
            _lastCommercialSnapshotId = inserted[0].id;
          }
          console.log(`☁️ Planilha Comercial sincronizada em nuvem via Supabase (${COMMERCIAL_STATE.clients.length} clientes)!`);
          // Limpa snapshots antigos para manter a tabela leve
          if (inserted && inserted[0]?.id) {
            sb.from('historico_eventos')
              .delete()
              .eq('tipo_evento', 'ESTADO_PLANILHA_COMERCIAL')
              .lt('id', inserted[0].id)
              .then(() => {});
          }
        }
      }
    } catch (err) {
      console.warn('⚠️ Falha ao salvar comercial no Supabase (não bloqueante):', err);
    }
  }, 350);
}

// Sincronizar clientes da Planilha Comercial com a nuvem Supabase (Tempo Real)
async function syncCommercialWithSupabase(force = false) {
  const getSb = window.getSupabaseClient;
  const sb = typeof getSb === 'function' ? getSb() : null;
  if (!sb) return false;

  try {
    let cloudLoadedClients = null;

    // 1. Tenta carregar da tabela estruturada clientes_comercial
    try {
      const { data, error } = await sb
        .from('clientes_comercial')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        cloudLoadedClients = data.map(_rowToCommercialClient);
      }
    } catch (e) {}

    // 2. Fallback de nuvem: busca o snapshot mais recente salvo em historico_eventos
    if (!cloudLoadedClients || cloudLoadedClients.length === 0) {
      const { data: eventData, error: eventErr } = await sb
        .from('historico_eventos')
        .select('id, descricao, data_evento')
        .eq('tipo_evento', 'ESTADO_PLANILHA_COMERCIAL')
        .order('id', { ascending: false })
        .limit(1);

      if (!eventErr && eventData && eventData.length > 0 && eventData[0].descricao) {
        const foundId = eventData[0].id;

        // Se já estamos com o snapshot mais recente na tela e não é chamada forçada, encerra sem reprocessamento
        if (!force && _lastCommercialSnapshotId && _lastCommercialSnapshotId === foundId) {
          return true;
        }

        try {
          const parsed = JSON.parse(eventData[0].descricao);
          if (Array.isArray(parsed) && parsed.length > 0) {
            cloudLoadedClients = parsed.map(sanitizeCommercialClient);
            _lastCommercialSnapshotId = foundId;
          }
        } catch (pe) {
          console.warn('Erro ao decodificar JSON do snapshot comercial:', pe);
        }
      }
    }

    if (cloudLoadedClients && cloudLoadedClients.length > 0) {
      const merged = mergeCommercialClients(COMMERCIAL_STATE.clients, cloudLoadedClients);
      COMMERCIAL_STATE.clients = merged;
      localStorage.setItem('mvt_commercial_clients', JSON.stringify(COMMERCIAL_STATE.clients));

      if (typeof renderCommercialApp === 'function') {
        renderCommercialApp();
      }
      console.log(`☁️ Planilha Comercial 100% online! ${COMMERCIAL_STATE.clients.length} clientes sincronizados.`);
      return true;
    } else {
      // Se a nuvem estiver vazia, faz o upload imediato dos clientes locais para que qualquer link aberto os veja
      if (COMMERCIAL_STATE.clients && COMMERCIAL_STATE.clients.length > 0) {
        console.log('☁️ Nuvem comercial vazia. Enviando clientes locais para a nuvem...');
        saveCommercialData(false);
      }
    }
  } catch (err) {
    console.warn('⚠️ Não foi possível sincronizar comercial com Supabase:', err);
  }
  return false;
}
window.syncCommercialWithSupabase = syncCommercialWithSupabase;

// Inicia escuta contínua para sincronização automática em tempo real entre todos os computadores/navegadores
function startCommercialRealtimeMonitoring() {
  if (_commercialSyncInterval) clearInterval(_commercialSyncInterval);

  // Monitora alterações a cada 3.5 segundos em segundo plano (ultra leve)
  _commercialSyncInterval = setInterval(() => {
    syncCommercialWithSupabase(false);
  }, 3500);

  // Atualização instantânea ao clicar na tela, alternar ou focar a janela
  window.addEventListener('focus', () => {
    syncCommercialWithSupabase(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      syncCommercialWithSupabase(true);
    }
  });
}
window.startCommercialRealtimeMonitoring = startCommercialRealtimeMonitoring;


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
  COMMERCIAL_STATE.taskAreaFilter = val;
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
  COMMERCIAL_STATE.taskAreaFilter = 'all';
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
      pending: 'Tarefa em Aberto',
      done: 'Tarefa Concluída',
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

  const durationWrapper = document.querySelector('.comm-duration-dropdown-wrapper');
  if (durationWrapper && !durationWrapper.contains(e.target)) {
    closeCommercialDurationDropdown();
  }
});

// Fechar com tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCommercialFilterDropdown();
    closeTableViewConfigDropdown();
    closeCommercialDurationDropdown();
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

// Helper unificado para verificar se o cliente possui contrato assinado
function isClientContratoAssinado(client) {
  if (!client) return false;
  if (client.contratoAssinado === false) return false;
  return Boolean(client.contratoAssinado === true || client.status === 'Contrato Assinado');
}
window.isClientContratoAssinado = isClientContratoAssinado;

// Alternar sub-aba comercial ('fechar', 'assinado', 'leads', 'kanban', 'tarefas') com histórico e toggle para retorno
let _subtabNavigating = false;
function setCommercialSubtab(subtab, recordHistory = true) {
  if (!subtab) return;
  if (_subtabNavigating) return;
  _subtabNavigating = true;
  setTimeout(() => { _subtabNavigating = false; }, 80);

  // Se o usuário clicar novamente na mesma sub-aba que já está aberta (ex: 'assinado', 'fechar', 'tarefas', 'kanban'),
  // ele volta / sai da aba retornando para a lista geral de Clientes ('leads')
  if (COMMERCIAL_STATE.subtab === subtab && subtab !== 'leads') {
    subtab = 'leads';
  }

  COMMERCIAL_STATE.subtab = subtab;
  try {
    sessionStorage.setItem('mvt_comm_active_subtab', subtab);
  } catch (e) {}

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
  const durations = [15, 30, 45, 60];
  durations.forEach(d => {
    const chk = document.getElementById(`duration-check-${d}`);
    const opt = document.querySelector(`.duration-option[data-duration="${d}"]`);
    if (chk) {
      chk.textContent = (COMMERCIAL_STATE.defaultDuration === d) ? '✓' : '';
    }
    if (opt) {
      opt.classList.toggle('active', COMMERCIAL_STATE.defaultDuration === d);
    }
  });
}
window.updateCommercialDurationUI = updateCommercialDurationUI;

function toggleCommercialDurationDropdown(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('comm-duration-menu');
  if (!menu) return;
  const isHidden = menu.style.display === 'none' || !menu.style.display;
  menu.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    updateCommercialDurationUI();
  }
}
window.toggleCommercialDurationDropdown = toggleCommercialDurationDropdown;

function closeCommercialDurationDropdown() {
  const menu = document.getElementById('comm-duration-menu');
  if (menu) menu.style.display = 'none';
}
window.closeCommercialDurationDropdown = closeCommercialDurationDropdown;

function setCommercialDefaultDuration(minutes) {
  const val = parseInt(minutes, 10) || 30;
  COMMERCIAL_STATE.defaultDuration = val;
  localStorage.setItem('mvt_comm_default_duration', String(val));
  updateCommercialDurationUI();
  closeCommercialDurationDropdown();
  if (typeof showToast === 'function') {
    showToast(`⏱️ Pauta ajustada para blocos de ${val} minutos`, 'info', 2000);
  }
  renderCommercialApp();
}
window.setCommercialDefaultDuration = setCommercialDefaultDuration;

function cycleCommercialDefaultDuration() {
  const durations = [15, 30, 45, 60];
  const cur = COMMERCIAL_STATE.defaultDuration || 30;
  const idx = durations.indexOf(cur);
  const next = durations[(idx + 1) % durations.length];
  setCommercialDefaultDuration(next);
}
window.cycleCommercialDefaultDuration = cycleCommercialDefaultDuration;

// Utilitário de data hoje YYYY-MM-DD
function getTodayYmd() {
  return new Date().toISOString().split('T')[0];
}
window.getTodayYmd = getTodayYmd;

// Renderizacao geral do modulo comercial
function renderCommercialApp() {
  syncCommercialAreaDropdowns();
  syncCommercialStatusDropdowns();
  syncCommercialNextStepDropdowns();
  const clients = COMMERCIAL_STATE.clients;

  // 1. Atualizar KPIs no banner superior
  const totalCount = clients.length;
  const fecharCount = clients.filter(c => c.prontoParaFechar || c.status === 'Pronto para Fechar' || c.status === 'Prontos para Fechar').length;
  const docsCount = clients.filter(c => c.status === 'Aguardando DOCS').length;
  const followupCount = clients.filter(c => c.status === 'Follow-up' || c.status === 'Aguardando Reunião' || c.status === 'Lead Novo').length;
  const fechadosCount = clients.filter(c => isClientContratoAssinado(c)).length;

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
      titleEl.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; width:100%; flex-wrap:wrap; gap:0.6rem;">
          <div style="display:flex; align-items:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e5b966" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:7px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Prontos para Fechar</span>
          </div>
          <button type="button" class="btn-back-to-leads" onclick="setCommercialSubtab('leads')" title="Voltar para a Tabela Geral de Clientes">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Voltar para Todos os Clientes</span>
          </button>
        </div>
      `;
      subtitleEl.textContent = 'Clientes qualificados em fase decisiva e prontos para fechamento de contrato';
    } else if (COMMERCIAL_STATE.subtab === 'assinado') {
      titleEl.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; width:100%; flex-wrap:wrap; gap:0.6rem;">
          <div style="display:flex; align-items:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:7px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span style="color: #34d399;">Contratos Assinados</span>
          </div>
          <button type="button" class="btn-back-to-leads" onclick="setCommercialSubtab('leads')" title="Voltar para a Tabela Geral de Clientes">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Voltar para Todos os Clientes</span>
          </button>
        </div>
      `;
      subtitleEl.textContent = 'Clientes com contrato devidamente assinado e fechamento confirmado';
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

  // Atualiza cabeçalho da coluna 8 dinamicamente
  const colHeaderFechar = document.querySelector('.comm-table-header-row .comm-col-fechar');
  if (colHeaderFechar) {
    if (COMMERCIAL_STATE.subtab === 'assinado') {
      colHeaderFechar.textContent = 'CONTRATO ASSINADO';
    } else if (COMMERCIAL_STATE.subtab === 'fechar') {
      colHeaderFechar.textContent = 'PRONTOS P/ FECHAR';
    } else {
      colHeaderFechar.textContent = 'PRONTOS P/ FECHAR';
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
  const tasksKpiStrip = document.getElementById('comm-tasks-kpi-strip');

  if (tasksKpiStrip) tasksKpiStrip.style.display = isTarefas ? 'flex' : 'none';
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
  let filtered = Array.isArray(clients) ? [...clients] : [];

  // Busca textual
  const q = (COMMERCIAL_STATE.search || '').trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(c => {
      if (!c) return false;
      return (c.name || '').toLowerCase().includes(q) ||
        (c.phone || '').includes(q) ||
        (c.area || '').toLowerCase().includes(q) ||
        (c.status || '').toLowerCase().includes(q) ||
        (c.nextStep || '').toLowerCase().includes(q) ||
        (c.notes || '').toLowerCase().includes(q);
    });
  }

  // Se sub-aba for "fechar", filtra apenas quem esta pronto para fechar
  if (COMMERCIAL_STATE.subtab === 'fechar') {
    filtered = filtered.filter(c => c && (c.prontoParaFechar || c.status === 'Pronto para Fechar' || c.status === 'Prontos para Fechar'));
  } else if (COMMERCIAL_STATE.subtab === 'assinado') {
    filtered = filtered.filter(c => c && isClientContratoAssinado(c));
  }

  // Filtro de Area
  if (COMMERCIAL_STATE.area && COMMERCIAL_STATE.area !== 'all') {
    const fAreaLower = COMMERCIAL_STATE.area.toLowerCase();
    filtered = filtered.filter(c => {
      if (!c) return false;
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
    filtered = filtered.filter(c => c && c.status === COMMERCIAL_STATE.statusFilter);
  }

  // Filtro de Tarefas de 30m
  if (COMMERCIAL_STATE.taskFilter && COMMERCIAL_STATE.taskFilter !== 'all') {
    const todayStr = getTodayYmd();
    if (COMMERCIAL_STATE.taskFilter === 'pending') {
      filtered = filtered.filter(c => c && c.task && c.task.dueDate && c.task.status !== 'done');
    } else if (COMMERCIAL_STATE.taskFilter === 'done') {
      filtered = filtered.filter(c => c && c.task && c.task.status === 'done');
    } else if (COMMERCIAL_STATE.taskFilter === 'has_task') {
      filtered = filtered.filter(c => c && c.task && c.task.dueDate);
    } else if (COMMERCIAL_STATE.taskFilter === 'overdue') {
      filtered = filtered.filter(c => c && c.task && c.task.dueDate && c.task.dueDate < todayStr && c.task.status !== 'done');
    } else if (COMMERCIAL_STATE.taskFilter === 'no_task') {
      filtered = filtered.filter(c => !c || !c.task || !c.task.dueDate);
    }
  }

  // 4. Ordenação cronológica por data dos clientes: mais novos em cima, mais antigos em baixo
  function parseClientSortTime(dStr) {
    if (!dStr) return 0;
    if (typeof dStr !== 'string') return 0;
    const clean = dStr.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(clean)) {
      return new Date(clean.substring(0, 10) + 'T12:00:00').getTime() || 0;
    }
    if (/^\d{2}\/\d{2}\/\d{4}/.test(clean)) {
      const parts = clean.split('/');
      if (parts.length === 3) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T12:00:00`).getTime() || 0;
      }
    }
    const t = new Date(clean).getTime();
    return isNaN(t) ? 0 : t;
  }

  filtered.sort((a, b) => {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    const timeA = parseClientSortTime(a.date);
    const timeB = parseClientSortTime(b.date);
    if (timeA !== timeB) {
      return timeB - timeA; // Mais novos em cima (maior timestamp), mais antigos em baixo
    }
    const idA = String(a.id || '');
    const idB = String(b.id || '');
    return idB.localeCompare(idA);
  });

  // 5. Atualizar contador de resultados na barra de ferramentas (com destaque bold igual a pauta)
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

  let textLabel = `<strong>${filtered.length}</strong> cliente${filtered.length === 1 ? '' : 's'}`;
  if (COMMERCIAL_STATE.subtab === 'fechar') {
    textLabel = `<strong>${filtered.length}</strong> pronto${filtered.length === 1 ? '' : 's'} para fechar`;
  } else if (COMMERCIAL_STATE.subtab === 'assinado') {
    textLabel = `<strong>${filtered.length}</strong> contrato${filtered.length === 1 ? '' : 's'} assinado${filtered.length === 1 ? '' : 's'}`;
  }
  if (counterPillText) counterPillText.innerHTML = textLabel;
  if (countBadge) countBadge.textContent = `${filtered.length} clientes`;

  renderCommercialFilterChips();

  // 5. Renderizar view correspondente
  try {
    if (isKanban) {
      renderCommercialKanban(clients);
    } else {
      renderCommercialTable(filtered);
    }
  } catch (err) {
    console.error('Erro ao renderizar view comercial:', err);
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
    case 'Contrato Assinado':
      return '<span class="comm-status-badge status-fechado">Contrato Assinado</span>';
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

// Badge Interativo com Select Embutido: Tipo de Atendimento (Com opção de criar novo com cor)
function getCommercialStatusSelect(client) {
  let status = client.tipoAtendimento || client.status || 'Follow-up';
  if (status === 'Pronto para Fechar' || status === 'Prontos para Fechar') {
    status = client.originalStatus || client.tipoAtendimento || 'Lead Novo';
  }

  const defaultTypes = ['Lead Novo', 'Follow-up', 'Indicação'];
  const customTypes = getCommercialCustomTypes();
  const customColor = getCommercialStatusColor(status);

  let statusClass = 'status-followup';
  let customStyle = `color: ${customColor} !important; border-color: ${customColor}55 !important; background: ${customColor}18 !important;`;

  const rawStatus = status.toLowerCase();
  if (rawStatus.includes('novo')) {
    statusClass = 'status-novo';
  } else if (rawStatus.includes('indica') || rawStatus.includes('indicaç')) {
    statusClass = 'status-indicacao';
  } else if (rawStatus.includes('fechar')) {
    statusClass = 'status-pronto';
  } else if (rawStatus.includes('assinado')) {
    statusClass = 'status-assinado';
  }

  const allTypes = [...defaultTypes];
  customTypes.forEach(ct => {
    const tName = ct.name || ct;
    if (tName && !tName.startsWith('__') && !tName.toUpperCase().includes('CREATE_') && !allTypes.some(t => t.toLowerCase() === tName.toLowerCase())) {
      allTypes.push(tName);
    }
  });
  if (status && !status.startsWith('__') && !status.toUpperCase().includes('CREATE_') && !allTypes.some(t => t.toLowerCase() === status.toLowerCase())) {
    allTypes.push(status);
  }

  const optionsHtml = allTypes.map(t => `
    <option value="${escapeHtml(t)}" ${t.toLowerCase() === status.toLowerCase() ? 'selected' : ''}>${escapeHtml(t)}</option>
  `).join('');

  return `
    <div class="comm-status-badge-container">
      <select class="comm-status-pill-select ${statusClass}" style="${customStyle}" onchange="changeCommercialStatus('${client.id}', this.value, this)" oninput="changeCommercialStatus('${client.id}', this.value, this)" title="Tipo de Atendimento: escolha uma opção ou crie uma nova com cor personalizada">
        ${optionsHtml}
        <option value="__CREATE_TYPE__">➕ Criar Tipo de Atendimento...</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getCommercialStatusSelect = getCommercialStatusSelect;

function changeCommercialStatus(clientId, newStatus, selectEl) {
  if (newStatus === '__CREATE_TYPE__' || (newStatus && newStatus.startsWith('__'))) {
    const currClient = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
    const prev = (currClient && (currClient.tipoAtendimento || currClient.status)) ? (currClient.tipoAtendimento || currClient.status) : (selectEl?.options[0]?.value || 'Lead Novo');
    if (selectEl) {
      setTimeout(() => { selectEl.value = prev; }, 60);
    }
    openCreateCustomOptionModal('type', clientId);
    return;
  }

  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client) return;

  recordCommercialUndo(`Tipo de atendimento de ${client.name} para "${newStatus}"`);
  const cNameLower = (client.name || '').trim().toLowerCase();
  COMMERCIAL_STATE.clients.forEach(c => {
    if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
      c.tipoAtendimento = newStatus;
      c.status = newStatus;
    }
  });

  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Tipo de atendimento de ${client.name} alterado para "${newStatus}".`, 'success', 2200);
  }
}
window.changeCommercialStatus = changeCommercialStatus;

// Badge Interativo com Select Embutido: Área (Trabalhista, Cível, Previdenciário ou Personalizada com Cor)
function getCommercialAreaSelect(client) {
  const currentArea = (client.area || 'Trabalhista').trim();
  const rawArea = currentArea.toLowerCase();
  const defaultAreas = ['Trabalhista', 'Cível', 'Previdenciário'];
  const customAreas = getCommercialCustomAreas();
  const customColor = getCommercialAreaColor(currentArea);

  let areaClass = 'custom';
  let customStyle = `color: ${customColor} !important; border-color: ${customColor}55 !important; background: ${customColor}18 !important;`;

  if (rawArea.includes('cív') || rawArea.includes('civ')) {
    areaClass = 'civel';
  } else if (rawArea.includes('prev') || rawArea.includes('aposent') || rawArea.includes('aux')) {
    areaClass = 'previdenciario';
  } else if (rawArea.includes('trab')) {
    areaClass = 'trabalhista';
  }

  const allAreas = [...defaultAreas];
  customAreas.forEach(ca => {
    const aName = ca.name || ca;
    if (aName && !aName.startsWith('__') && !aName.toUpperCase().includes('CREATE_') && !allAreas.some(a => a.toLowerCase() === aName.toLowerCase())) {
      allAreas.push(aName);
    }
  });
  if (currentArea && !currentArea.startsWith('__') && !currentArea.toUpperCase().includes('CREATE_') && !allAreas.some(a => a.toLowerCase() === currentArea.toLowerCase())) {
    allAreas.push(currentArea);
  }

  const optionsHtml = allAreas.map(a => `
    <option value="${escapeHtml(a)}" ${a.toLowerCase() === currentArea.toLowerCase() ? 'selected' : ''}>${escapeHtml(a)}</option>
  `).join('');

  return `
    <div class="comm-area-badge-container">
      <select class="comm-area-pill-select area-${areaClass}" style="${customStyle}" onchange="changeCommercialArea('${client.id}', this.value, this)" oninput="changeCommercialArea('${client.id}', this.value, this)" title="Clique para alterar a área ou criar uma nova área com cor personalizada">
        ${optionsHtml}
        <option value="__CREATE_AREA__">➕ Criar Área...</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getCommercialAreaSelect = getCommercialAreaSelect;

function changeCommercialArea(clientId, newArea, selectEl) {
  if (newArea === '__CREATE_AREA__' || (newArea && newArea.startsWith('__'))) {
    const currClient = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
    const prev = (currClient && currClient.area) ? currClient.area : (selectEl?.options[0]?.value || 'Trabalhista');
    if (selectEl) {
      setTimeout(() => { selectEl.value = prev; }, 60);
    }
    openCreateCustomOptionModal('area', clientId);
    return;
  }

  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client) return;

  recordCommercialUndo(`Área de ${client.name} para "${newArea}"`);
  const cNameLower = (client.name || '').trim().toLowerCase();
  COMMERCIAL_STATE.clients.forEach(c => {
    if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
      c.area = newArea;
    }
  });

  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Área de ${client.name} alterada para "${newArea}".`, 'success', 2200);
  }
}
window.changeCommercialArea = changeCommercialArea;

// Badge Interativo com Select Embutido: Próximo Passo (10 Opções Rápidas + Opções com Cor Personalizada)
function getCommercialNextStepSelect(client) {
  const currentStep = (client.nextStep || (client.task ? client.task.action : '') || 'Fazer ligação').trim();
  const customSteps = getCommercialCustomNextSteps();
  const customColor = getCommercialNextStepColor(currentStep);

  let customStyle = '';
  if (customColor) {
    customStyle = `color: ${customColor} !important; border-color: ${customColor}55 !important; background: ${customColor}18 !important;`;
  }

  const allSteps = [...NEXT_STEP_OPTIONS];
  customSteps.forEach(cs => {
    const sName = cs.name || cs;
    if (sName && !sName.startsWith('__') && !sName.toUpperCase().includes('CREATE_') && !allSteps.some(s => s.toLowerCase() === sName.toLowerCase())) {
      allSteps.push(sName);
    }
  });
  if (currentStep && !currentStep.startsWith('__') && !currentStep.toUpperCase().includes('CREATE_') && !allSteps.some(s => s.toLowerCase() === currentStep.toLowerCase())) {
    allSteps.push(currentStep);
  }

  const optionsHtml = allSteps.map(opt => `
    <option value="${escapeHtml(opt)}" ${opt.toLowerCase() === currentStep.toLowerCase() ? 'selected' : ''}>${escapeHtml(opt)}</option>
  `).join('');

  return `
    <div class="comm-nextstep-badge-container">
      <select class="comm-nextstep-pill-select" style="${customStyle}" onchange="changeCommercialNextStep('${client.id}', this.value, this)" oninput="changeCommercialNextStep('${client.id}', this.value, this)" title="Clique para alterar o próximo passo ou criar um novo com cor personalizada">
        ${optionsHtml}
        <option value="__CREATE_NEXTSTEP__">➕ Criar Próximo Passo...</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getCommercialNextStepSelect = getCommercialNextStepSelect;

function changeCommercialNextStep(clientId, newStep, selectEl) {
  if (newStep === '__CREATE_NEXTSTEP__' || (newStep && newStep.startsWith('__'))) {
    const currClient = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
    const prev = (currClient && currClient.nextStep) ? currClient.nextStep : (selectEl?.options[0]?.value || 'Fazer ligação');
    if (selectEl) {
      setTimeout(() => { selectEl.value = prev; }, 60);
    }
    openCreateCustomOptionModal('nextstep', clientId);
    return;
  }

  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client) return;

  recordCommercialUndo(`Próximo passo de ${client.name} para "${newStep}"`);
  const cNameLower = (client.name || '').trim().toLowerCase();
  COMMERCIAL_STATE.clients.forEach(c => {
    if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
      c.nextStep = newStep;
      if (c.task) {
        c.task.action = newStep;
      }
    }
  });

  saveCommercialData();
  renderCommercialApp();
  if (typeof showToast === 'function') {
    showToast(`Próximo passo de ${client.name} definido para "${newStep}".`, 'success', 2200);
  }
}
window.changeCommercialNextStep = changeCommercialNextStep;

function getAreaBadge(area) {
  const cleanArea = (area || 'Trabalhista').trim();
  const areaLower = cleanArea.toLowerCase();
  const customColor = getCommercialAreaColor(cleanArea);

  let cls = 'badge-area-trabalhista';
  let label = cleanArea;
  if (areaLower.includes('cív') || areaLower.includes('civ')) {
    cls = 'badge-area-civel';
    label = 'Cível';
  } else if (areaLower.includes('prev') || areaLower.includes('aposent') || areaLower.includes('aux')) {
    cls = 'badge-area-previdenciario';
    label = 'Previdenciário';
  } else if (areaLower.includes('trab')) {
    cls = 'badge-area-trabalhista';
    label = 'Trabalhista';
  } else {
    cls = 'badge-area-custom';
    label = cleanArea;
  }
  return `<span class="area-badge ${cls}" style="color: ${customColor}; border-color: ${customColor}55; background: ${customColor}18;">${escapeHtml(label)}</span>`;
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

    // Aplica Tema Dourado ou Esmeralda
    tableContainer.classList.remove('theme-fechar-gold', 'theme-assinado-emerald');
    if (COMMERCIAL_STATE.subtab === 'fechar') {
      tableContainer.classList.add('theme-fechar-gold');
    } else if (COMMERCIAL_STATE.subtab === 'assinado') {
      tableContainer.classList.add('theme-assinado-emerald');
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
            ? 'Não há nenhum cliente marcado como "Pronto para Fechar" no filtro atual. Clique em "Todos os Clientes" ou marque novos clientes.' 
            : COMMERCIAL_STATE.subtab === 'assinado'
            ? 'Nenhum contrato assinado ainda. Abra a aba "Prontos para Fechar" e clique em "Assinar Contrato" para registrar contratos assinados.'
            : 'Tente alterar os termos da busca ou filtre por outra área.'}
        </p>
        ${COMMERCIAL_STATE.subtab === 'fechar' || COMMERCIAL_STATE.subtab === 'assinado'
          ? `<button class="btn-primary" onclick="setCommercialSubtab('leads')" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.45rem;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Voltar para a Tabela Geral de Clientes</span>
            </button>`
          : `<button class="btn-primary" onclick="openCommercialModal()" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.45rem;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Cadastrar Novo Cliente Agora</span>
            </button>`
        }
      </div>
    `;
    return;
  }

  container.innerHTML = clients.filter(Boolean).map(client => {
    try {
      const waDigits = cleanPhoneForWa(client.phone);
      const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Tudo bem? Augusto da MVT Advogados por aqui.`)}` : '';
      const hasTask = Boolean(client.task && client.task.dueDate);
      const isOverdue = hasTask && client.task.dueDate < todayStr && client.task.status !== 'done';
      const historyCount = Array.isArray(client.taskHistory) ? client.taskHistory.length : 0;

    return `
      <div class="comm-lead-row ${client.desqualificado ? 'disqualified' : ''}" id="comm-row-${client.id}">
        <!-- Coluna 1: Data -->
        <div class="comm-col-date">
          <span class="comm-date-badge">${formatDateDisplay(client.date)}</span>
        </div>

        <!-- Coluna 2: Cliente -->
        <div class="comm-col-client">
          <span class="comm-client-name" title="${escapeHtml(client.name)}">${escapeHtml(client.name)}</span>
          ${client.desqualificado ? `
            <span class="badge-disqualified-tag" title="Motivo: ${escapeHtml(client.motivoDesqualificado || 'Sem motivo')}">
              ✕ ${escapeHtml(client.motivoDesqualificado || 'Desqualificado')}
            </span>
          ` : ''}
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

        <!-- Coluna 6: Agendamento de Tarefa (Horário & Data: Vermelho se fora do prazo, Azul Claro se dentro) -->
        <div class="comm-col-schedule">
          ${(() => {
            const latestApt = getClientLatestAppointment(client);
            if (latestApt) {
              const pillClass = latestApt.isOverdue ? 'overdue' : 'active-deadline';
              const shortDt = formatDateTimeShort(latestApt.date, latestApt.time);
              return `
                <span class="comm-task-due-pill ${pillClass}" onclick="openCommercialTaskModal('${client.id}')" title="Reunião/Tarefa: ${escapeHtml(latestApt.action)} em ${formatDateDisplay(latestApt.date)} às ${latestApt.time || '10:00'}${latestApt.isOverdue ? ' (Fora do prazo)' : ' (Dentro do prazo)'}. Clique para gerenciar.">
                  📅 ${shortDt}
                </span>
              `;
            }
            return `
              <button type="button" class="btn-schedule-shortcut" onclick="openCommercialTaskModal('${client.id}', 'form', true)" title="Clique para agendar data e horário para este próximo passo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>+ Agendar Tarefa</span>
              </button>
            `;
          })()}
        </div>

        <!-- Coluna 7: Tarefa & Ações Rápidas (com contador numérico após Marcar Tarefa e Ações Fixas na Direita) -->
        <div class="comm-col-actions">
          <div class="comm-actions-left">
            <button class="btn-task-action ${hasTask ? 'has-task' : ''} ${isOverdue ? 'overdue' : ''}" onclick="openCommercialTaskModal('${client.id}')" title="Marcar ou gerenciar tarefa de 30 minutos na pauta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Marcar Tarefa
            </button>
            ${(() => {
              const aptCount = getClientAppointmentsCount(client);
              if (aptCount > 0) {
                return `
                  <span class="comm-task-count-num" onclick="openCommercialTaskModal('${client.id}', 'history')" title="Ver histórico de ${aptCount} reunião(ões)/tarefa(s) agendada(s) deste cliente">
                    ${aptCount}
                  </span>
                `;
              }
              return '';
            })()}
          </div>

          <div class="comm-actions-right">
            <button class="btn-icon-clean" onclick="openCommercialModal('${client.id}')" title="Editar dados do cliente">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            
            <button class="btn-icon-clean btn-disqualify ${client.desqualificado ? 'active' : ''}" onclick="handleDisqualifyClick(event, '${client.id}')" title="${client.desqualificado ? `Cliente desqualificado: ${escapeHtml(client.motivoDesqualificado || 'Sem motivo')}. Clique para reativar` : 'Desqualificar cliente por algum motivo'}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
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

        <!-- Coluna 8: Ações de Fechamento / Contrato Assinado -->
        <div class="comm-col-fechar">
          ${getCommercialFecharCell(client)}
        </div>
      </div>
    `;
    } catch (err) {
      console.warn('Erro ao renderizar linha do cliente:', client, err);
      return '';
    }
  }).join('');
}

// Célula dinâmica da coluna 8 conforme a sub-aba ativa
function getCommercialFecharCell(client) {
  const isAssinado = isClientContratoAssinado(client);

  // Na aba "Contrato Assinado": exibe o ícone verde + badge de assinado (clique para desfazer)
  if (COMMERCIAL_STATE.subtab === 'assinado') {
    return `
      <div class="comm-fechar-cell-wrapper">
        <button type="button" class="btn-table-assinado-badge" onclick="handleTableAssinadoClick('${client.id}')" title="Contrato Assinado! Clique para desmarcar e remover da lista">
          <span>Assinado</span>
        </button>
        <div class="comm-contract-slot">
          <button type="button" class="btn-contract-icon active" onclick="handleTableAssinadoClick('${client.id}')" title="Contrato Assinado! Clique para desmarcar e remover da lista">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <polyline points="9 15 11 17 15 13"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Na aba "Prontos para Fechar":
  // Totalmente clean e despoluído: Estrela de Pronto para Fechar + Ícone discreto de Contrato (Cinza quando desmarcado, Verde quando clicado)
  if (COMMERCIAL_STATE.subtab === 'fechar') {
    return `
      <div class="comm-fechar-cell-wrapper">
        <button type="button" class="btn-table-fechar active" onclick="handleTableFecharClick('${client.id}')" title="Pronto para Fechar (Clique para remover)">
          <svg class="fechar-star-icon" width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span class="fechar-btn-text">Pronto p/ Fechar</span>
        </button>
        <div class="comm-contract-slot">
          <button type="button" class="btn-contract-icon ${isAssinado ? 'active' : ''}" onclick="handleTableAssinadoClick('${client.id}')" title="${isAssinado ? 'Contrato Assinado! Clique para desmarcar' : 'Clique para marcar Contrato Assinado'}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <polyline points="9 15 11 17 15 13"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Na visão geral de clientes (leads):
  // O slot do contrato na direita é fixo (25px) para NUNCA empurrar ou desalinhar o botão Pronto p/ Fechar
  return `
    <div class="comm-fechar-cell-wrapper">
      ${getCommercialFecharButton(client)}
      <div class="comm-contract-slot">
        ${isAssinado ? `
          <button type="button" class="btn-contract-icon active" onclick="handleTableAssinadoClick('${client.id}')" title="Contrato Assinado! Clique para desmarcar ou ver em Contratos Assinados">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <polyline points="9 15 11 17 15 13"></polyline>
            </svg>
          </button>
        ` : ''}
      </div>
    </div>
  `;
}
window.getCommercialFecharCell = getCommercialFecharCell;

// ============================================================
// CLIENTE DESQUALIFICADO & POPOVER COMPACTO FLUTUANTE
// ============================================================
let _currentDisqualifyClientId = null;

function handleDisqualifyClick(event, clientId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client) return;

  // Se já estiver desqualificado: ao clicar novamente no X, volta ao normal e sai a anotação
  if (client.desqualificado) {
    client.desqualificado = false;
    client.motivoDesqualificado = '';
    closeDisqualifyPopover();
    saveCommercialData();
    renderCommercialApp();
    if (typeof showToast === 'function') {
      showToast(`Cliente "${client.name}" reativado (desqualificação removida).`, 'info', 2500);
    }
    return;
  }

  // Se ainda não estiver desqualificado: abre o pop-up pequeno flutuando exatamente em cima do X
  openDisqualifyPopover(event ? event.currentTarget : null, clientId);
}
window.handleDisqualifyClick = handleDisqualifyClick;

function openDisqualifyPopover(anchorBtn, clientId) {
  _currentDisqualifyClientId = clientId;
  const popover = document.getElementById('popover-disqualify');
  const input = document.getElementById('disqualify-reason-input');
  if (!popover || !input) return;

  input.value = '';
  popover.style.display = 'block';

  if (anchorBtn && typeof anchorBtn.getBoundingClientRect === 'function') {
    const rect = anchorBtn.getBoundingClientRect();
    const popWidth = 290;
    const popHeight = 125;

    // Fica posicionado logo em cima do botão X
    let top = rect.top + window.scrollY - popHeight - 8;
    let left = rect.right + window.scrollX - popWidth;

    if (top < window.scrollY + 10) {
      // Se não couber em cima, abre logo abaixo
      top = rect.bottom + window.scrollY + 8;
    }
    if (left < 10) left = 10;

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  } else {
    popover.style.top = '120px';
    popover.style.left = '50%';
    popover.style.transform = 'translateX(-50%)';
  }

  setTimeout(() => {
    input.focus();
  }, 60);

  // Fecha se clicar fora
  setTimeout(() => {
    document.addEventListener('click', _handleOutsideDisqualifyClick);
  }, 100);
}
window.openDisqualifyPopover = openDisqualifyPopover;

function closeDisqualifyPopover() {
  const popover = document.getElementById('popover-disqualify');
  if (popover) {
    popover.style.display = 'none';
  }
  _currentDisqualifyClientId = null;
  document.removeEventListener('click', _handleOutsideDisqualifyClick);
}
window.closeDisqualifyPopover = closeDisqualifyPopover;

function _handleOutsideDisqualifyClick(e) {
  const popover = document.getElementById('popover-disqualify');
  if (popover && popover.style.display !== 'none' && !popover.contains(e.target)) {
    closeDisqualifyPopover();
  }
}

function confirmDisqualifyClient() {
  if (!_currentDisqualifyClientId) {
    closeDisqualifyPopover();
    return;
  }
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(_currentDisqualifyClientId));
  if (!client) {
    closeDisqualifyPopover();
    return;
  }

  const input = document.getElementById('disqualify-reason-input');
  const motivo = input ? input.value.trim() : '';

  client.desqualificado = true;
  client.motivoDesqualificado = motivo || 'Sem motivo informado';
  client.desqualificadoAt = new Date().toISOString();

  closeDisqualifyPopover();
  saveCommercialData();
  renderCommercialApp();

  if (typeof showToast === 'function') {
    showToast(`❌ Cliente "${client.name}" marcado como desqualificado.`, 'warning', 2500);
  }
}
window.confirmDisqualifyClient = confirmDisqualifyClient;

// Botão de ação rápida na tabela: Pronto para Fechar (proporcional, clean e integrado)
function getCommercialFecharButton(client) {
  const isFechar = Boolean(client.prontoParaFechar || client.status === 'Pronto para Fechar' || client.status === 'Prontos para Fechar');
  if (isFechar) {
    return `
      <button type="button" class="btn-table-fechar active" onclick="handleTableFecharClick('${client.id}')" title="Marcado como Pronto para Fechar! Clique para desmarcar">
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
      <span class="fechar-btn-text">+ Pronto p/ Fechar</span>
    </button>
  `;
}
window.getCommercialFecharButton = getCommercialFecharButton;

// Handler do clique em Assinar Contrato (Alternância / Confirmação de Fechamento)
function handleTableAssinadoClick(clientId) {
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client) return;

  const isAssinado = isClientContratoAssinado(client);
  const cNameLower = (client.name || '').trim().toLowerCase();

  if (isAssinado) {
    recordCommercialUndo(`Desmarcar Contrato Assinado de "${client.name}"`);
    COMMERCIAL_STATE.clients.forEach(c => {
      if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
        c.contratoAssinado = false;
        if (c.prontoParaFechar) {
          c.status = 'Pronto para Fechar';
        } else {
          const fallback = (c.originalStatus && c.originalStatus !== 'Contrato Assinado' && c.originalStatus !== 'Fechado')
            ? c.originalStatus
            : (c.tipoAtendimento || 'Follow-up');
          c.status = fallback;
        }
      }
    });

    saveCommercialData();
    renderCommercialApp();

    if (typeof showToast === 'function') {
      showToast(`Contrato de "${client.name}" desmarcado / reaberto.`, 'info', 2200);
    }
  } else {
    recordCommercialUndo(`Marcar Contrato Assinado para "${client.name}"`);
    COMMERCIAL_STATE.clients.forEach(c => {
      if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
        c.contratoAssinado = true;
        if (c.status !== 'Contrato Assinado') {
          c.originalStatus = (c.status !== 'Fechado') ? (c.tipoAtendimento || c.status) : 'Follow-up';
        }
        c.status = 'Contrato Assinado';
        c.tipoAtendimento = 'Contrato Assinado';
        c.assinadoAt = new Date().toISOString();
      }
    });

    saveCommercialData();
    renderCommercialApp();

    if (typeof showToast === 'function') {
      showToast(`✍️ Contrato assinado para "${client.name}"!`, 'success', 2500);
    }
  }
}
window.handleTableAssinadoClick = handleTableAssinadoClick;

// Handler do clique em Pronto para Fechar na tabela (Alternância / Toggle direta)
function handleTableFecharClick(clientId) {
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client) return;

  const isAlreadyFechar = Boolean(client.prontoParaFechar || client.status === 'Pronto para Fechar' || client.status === 'Prontos para Fechar');
  const cNameLower = (client.name || '').trim().toLowerCase();

  if (isAlreadyFechar) {
    // DESMARCAR: remove imediatamente sem bloqueio por popup
    recordCommercialUndo(`Remover "${client.name}" de Pronto para Fechar`);
    COMMERCIAL_STATE.clients.forEach(c => {
      if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
        c.prontoParaFechar = false;
        if (!isClientContratoAssinado(c)) {
          if (c.status === 'Pronto para Fechar' || c.status === 'Prontos para Fechar') {
            c.status = c.originalStatus || c.tipoAtendimento || 'Follow-up';
          }
        }
      }
    });

    saveCommercialData();
    renderCommercialApp();

    if (typeof showToast === 'function') {
      showToast(`⭐ Cliente "${client.name}" desmarcado de Prontos para Fechar.`, 'info', 2200);
    }
  } else {
    // MARCAR: Adiciona a Prontos para Fechar e mantém o usuário na tela atual
    recordCommercialUndo(`Marcar "${client.name}" como Pronto para Fechar`);
    COMMERCIAL_STATE.clients.forEach(c => {
      if (String(c.id) === String(clientId) || (cNameLower && c.name && c.name.trim().toLowerCase() === cNameLower)) {
        c.prontoParaFechar = true;
        if (!isClientContratoAssinado(c)) {
          if (c.status !== 'Pronto para Fechar' && c.status !== 'Prontos para Fechar') {
            c.originalStatus = c.tipoAtendimento || c.status;
          }
          c.status = 'Pronto para Fechar';
        }
      }
    });

    saveCommercialData();
    renderCommercialApp();

    if (typeof showToast === 'function') {
      showToast(`⭐ "${client.name}" marcado como Pronto para Fechar!`, 'success', 2200);
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

// Modal Popup de Confirmação para Exclusão de Cliente
let CLIENT_PENDING_DELETE = null;

function deleteCommercialClient(id) {
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(id));
  if (!client) return;

  CLIENT_PENDING_DELETE = client;

  const modal = document.getElementById('modal-delete-client-confirm');
  const nameEl = document.getElementById('confirm-delete-client-name');
  if (nameEl) nameEl.textContent = `"${client.name}"`;

  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  } else {
    confirmExecuteDeleteClient();
  }
}
window.deleteCommercialClient = deleteCommercialClient;

function closeDeleteClientModal() {
  CLIENT_PENDING_DELETE = null;
  const modal = document.getElementById('modal-delete-client-confirm');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}
window.closeDeleteClientModal = closeDeleteClientModal;

function confirmExecuteDeleteClient() {
  if (!CLIENT_PENDING_DELETE) return;
  const client = CLIENT_PENDING_DELETE;
  const clientId = String(client.id);

  recordCommercialUndo(`Exclusão do cliente "${client.name}"`);

  // Registra ID excluído para prevenir ressurreição via sync de nuvem
  recordDeletedCommercialClientId(clientId);

  COMMERCIAL_STATE.clients = COMMERCIAL_STATE.clients.filter(c => String(c.id) !== clientId);
  saveCommercialData(false);

  // Excluir também na nuvem Supabase
  try {
    const getSb = window.getSupabaseClient;
    const sb = typeof getSb === 'function' ? getSb() : null;
    if (sb && clientId) {
      sb.from('clientes_comercial').delete().eq('id', clientId).then(({ error }) => {
        if (error) console.warn('Erro ao deletar cliente comercial do Supabase:', error);
        else console.log(`☁️ Cliente ${clientId} (${client.name}) removido da nuvem Supabase.`);
      });
    }
  } catch (err) {
    console.warn('Erro ao disparar exclusão no Supabase:', err);
  }

  closeDeleteClientModal();
  renderCommercialApp();

  if (typeof showToast === 'function') {
    showToast(`Cliente "${client.name}" excluído com sucesso. Use a seta (←) para desfazer se necessário.`, 'info', 3200);
  }
}
window.confirmExecuteDeleteClient = confirmExecuteDeleteClient;

// Modal Popup de Confirmação para Exclusão de Tarefa da Pauta
let TASK_PENDING_DELETE = null;

function deleteCommercialTaskRow(clientId) {
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client || !client.task) return;

  TASK_PENDING_DELETE = client;

  const modal = document.getElementById('modal-delete-task-confirm');
  const nameEl = document.getElementById('confirm-delete-task-name');
  if (nameEl) nameEl.textContent = `"${client.name}"`;

  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  } else {
    confirmExecuteDeleteTask();
  }
}
window.deleteCommercialTaskRow = deleteCommercialTaskRow;
window.deleteCommercialTask = deleteCommercialTaskRow;

function closeDeleteTaskModal() {
  TASK_PENDING_DELETE = null;
  const modal = document.getElementById('modal-delete-task-confirm');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}
window.closeDeleteTaskModal = closeDeleteTaskModal;

function confirmExecuteDeleteTask() {
  if (!TASK_PENDING_DELETE) return;
  const client = TASK_PENDING_DELETE;

  recordCommercialUndo(`Exclusão de tarefa de "${client.name}"`);

  const tId = client.task ? client.task.id : null;
  if (Array.isArray(client.taskHistory)) {
    if (tId) {
      client.taskHistory = client.taskHistory.filter(h => h.id !== tId);
    } else if (client.task) {
      client.taskHistory = client.taskHistory.filter(h => !(h.action === client.task.action && h.dueDate === client.task.dueDate));
    }
  }

  client.task = null;
  client._taskDeletedAt = Date.now();

  closeDeleteTaskModal();
  saveCommercialData(false);
  renderCommercialApp();
  renderCommercialTasksView();

  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  if (typeof showToast === 'function') {
    showToast(`Tarefa de "${client.name}" excluída da pauta.`, 'info', 2500);
  }
}
window.confirmExecuteDeleteTask = confirmExecuteDeleteTask;

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

function setCommercialTaskAttendance(clientId, outcome) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !client.task) return;

  const currentStatus = client.task.status || 'pending';
  const currentAttendance = client.task.attendance || (currentStatus === 'done' ? 'attended' : null);

  let newStatus = 'pending';
  let newAttendance = null;

  if (outcome === 'attended') {
    if (currentStatus === 'done' || currentAttendance === 'attended') {
      newStatus = 'pending';
      newAttendance = null;
    } else {
      newStatus = 'done';
      newAttendance = 'attended';
    }
  } else if (outcome === 'noshow') {
    if (currentStatus === 'noshow' || currentAttendance === 'noshow') {
      newStatus = 'pending';
      newAttendance = null;
    } else {
      newStatus = 'noshow';
      newAttendance = 'noshow';
    }
  }

  client.task.status = newStatus;
  client.task.attendance = newAttendance;
  client.task.updatedAt = new Date().toISOString();

  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const taskId = client.task.id || ('task-' + Date.now());
  const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
  const updatedHist = {
    ...client.task,
    id: taskId,
    status: newStatus,
    attendance: newAttendance,
    completedAt: newStatus === 'done' ? new Date().toISOString() : null,
    noShowAt: newStatus === 'noshow' ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    client.taskHistory[existingIndex] = updatedHist;
  } else {
    client.taskHistory.unshift(updatedHist);
  }

  saveCommercialData();
  renderCommercialApp();
  renderCommercialTasksView();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  if (typeof showToast === 'function') {
    if (newStatus === 'done') {
      showToast(`✅ "${client.name}" marcado como Compareceu!`, 'success', 2800);
    } else if (newStatus === 'noshow') {
      showToast(`⚠️ "${client.name}" marcado como Não Compareceu!`, 'warning', 2800);
    } else {
      showToast(`Tarefa de "${client.name}" reaberta como pendente.`, 'info', 2200);
    }
  }
}
window.setCommercialTaskAttendance = setCommercialTaskAttendance;

function toggleCommercialTaskStatus(clientId) {
  setCommercialTaskAttendance(clientId, 'attended');
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

  const clients = COMMERCIAL_STATE.clients || [];
  const clientsWithTask = clients.filter(c => c && c.task && c.task.action);

  const todayStr = new Date().toISOString().split('T')[0];
  const totalTasks = clientsWithTask.length;
  const todayTasks = clientsWithTask.filter(c => c.task.dueDate === todayStr).length;
  const pendingTasks = clientsWithTask.filter(c => c.task.status !== 'done').length;
  const doneTasks = clientsWithTask.filter(c => c.task.status === 'done').length;

  // Atualiza indicadores KPI no topo
  const kpiTotal = document.getElementById('comm-tasks-kpi-total');
  const kpiToday = document.getElementById('comm-tasks-kpi-today');
  const kpiPending = document.getElementById('comm-tasks-kpi-pending');
  const kpiDone = document.getElementById('comm-tasks-kpi-done');

  if (kpiTotal) kpiTotal.textContent = totalTasks;
  if (kpiToday) kpiToday.textContent = todayTasks;
  if (kpiPending) kpiPending.textContent = pendingTasks;
  if (kpiDone) kpiDone.textContent = doneTasks;

  // Atualiza contadores na barra de filtros dedicados
  const cntAll = document.getElementById('task-filter-count-all');
  const cntPending = document.getElementById('task-filter-count-pending');
  const cntToday = document.getElementById('task-filter-count-today');
  const cntDone = document.getElementById('task-filter-count-done');

  if (cntAll) cntAll.textContent = totalTasks;
  if (cntPending) cntPending.textContent = pendingTasks;
  if (cntToday) cntToday.textContent = todayTasks;
  if (cntDone) cntDone.textContent = doneTasks;

  // Sincroniza classes ativas nos botões de filtro e KPIs
  const activeStatus = COMMERCIAL_STATE.taskStatusFilter || 'all';
  ['all', 'pending', 'today', 'done'].forEach(st => {
    const pill = document.getElementById(`btn-filter-task-${st}`);
    if (pill) {
      if (st === activeStatus) pill.classList.add('active');
      else pill.classList.remove('active');
    }
    const kpi = document.getElementById(`kpi-task-filter-${st}`);
    if (kpi) {
      if (st === activeStatus) kpi.classList.add('active-filter');
      else kpi.classList.remove('active-filter');
    }
  });

  // Preenche opções de área no dropdown da pauta se existirem opções personalizadas
  const taskAreaSelect = document.getElementById('comm-task-area-filter');
  if (taskAreaSelect) {
    const curArea = COMMERCIAL_STATE.taskAreaFilter || 'all';
    const customList = typeof getCommercialCustomAreas === 'function' ? getCommercialCustomAreas() : [];
    const customNames = customList.map(a => typeof a === 'string' ? a : a.name).filter(Boolean);
    const baseAreas = ['Trabalhista', 'Cível', 'Previdenciário'];
    const mergedAreas = Array.from(new Set([...baseAreas, ...customNames]));

    const desiredHtml = ['<option value="all">Todas as Áreas</option>']
      .concat(mergedAreas.map(a => `<option value="${escapeHtml(a)}"${a === curArea ? ' selected' : ''}>${escapeHtml(a)}</option>`))
      .join('');
    if (taskAreaSelect.innerHTML !== desiredHtml) {
      taskAreaSelect.innerHTML = desiredHtml;
    }
    taskAreaSelect.value = curArea;
  }

  // Filtragem
  let tasksList = [...clientsWithTask];

  // 1. Filtragem por Status da Tarefa (Todas, ⏳ Em Aberto, 📅 Hoje, ✓ Concluídas)
  if (activeStatus === 'pending') {
    tasksList = tasksList.filter(c => c.task.status !== 'done');
  } else if (activeStatus === 'today') {
    tasksList = tasksList.filter(c => c.task.dueDate === todayStr);
  } else if (activeStatus === 'done') {
    tasksList = tasksList.filter(c => c.task.status === 'done');
  }

  // 2. Filtragem por Área da Tarefa
  const activeArea = COMMERCIAL_STATE.taskAreaFilter || 'all';
  if (activeArea !== 'all') {
    const fAreaLower = activeArea.toLowerCase();
    tasksList = tasksList.filter(c => (c.area || '').toLowerCase().includes(fAreaLower));
  } else if (COMMERCIAL_STATE.area && COMMERCIAL_STATE.area !== 'all') {
    const fAreaLower = COMMERCIAL_STATE.area.toLowerCase();
    tasksList = tasksList.filter(c => (c.area || '').toLowerCase().includes(fAreaLower));
  }

  // 3. Busca textual
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
    const statusNotice = activeStatus === 'pending'
      ? 'Não há tarefas em aberto pendentes de execução.'
      : activeStatus === 'done'
      ? 'Nenhuma tarefa concluída nesta seleção.'
      : activeStatus === 'today'
      ? 'Nenhuma tarefa agendada para hoje.'
      : 'Nenhuma tarefa de 30 minutos agendada.';

    container.innerHTML = `
      <div class="empty-state" style="padding: 3.5rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px dashed var(--border-subtle); text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⏱️</div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #ffffff;">${statusNotice}</div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.4rem auto 1.4rem auto; max-width: 480px; line-height: 1.4;">
          ${activeStatus !== 'all' ? 'Alterne os filtros acima para visualizar outros compromissos ou agende uma nova tarefa.' : 'Ao clicar no botão "Marcar Tarefa" ao lado de qualquer cliente, o sistema agenda automaticamente um compromisso de 30 minutos nesta pauta.'}
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          ${activeStatus !== 'all' ? `
            <button type="button" class="btn-secondary" onclick="setCommercialTaskStatusFilter('all')" style="font-size: 0.8rem; padding: 0.45rem 1rem;">
              Ver Todas as Tarefas (${totalTasks})
            </button>
          ` : ''}
          <button type="button" class="btn-primary" onclick="setCommercialSubtab('leads')" style="font-size: 0.8rem; padding: 0.45rem 1.1rem;">
            👥 Ver Todos os Clientes
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = tasksList.map(client => {
    const task = client.task;
    const isAttended = task.status === 'done' || task.status === 'attended' || task.attendance === 'attended';
    const isNoShow = task.status === 'noshow' || task.attendance === 'noshow';
    const isToday = task.dueDate === todayStr;
    const startTime = task.dueTime || '10:00';
    const endTime = task.endTime || calculateEndTime30m(startTime);
    const dateBadge = isToday ? 'Hoje' : formatDateDisplay(task.dueDate);
    const waDigits = cleanPhoneForWa(client.phone);
    const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Olá, ${client.name}! Tudo bem? Augusto da MVT Advogados por aqui.`)}` : '';

    return `
      <div class="comm-task-row ${isAttended ? 'status-done' : ''} ${isNoShow ? 'status-noshow' : ''}" id="comm-task-row-${client.id}">
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
          <span class="task-action-main" title="${escapeHtml(task.action)}" style="${(isAttended || isNoShow) ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; opacity: 0.85;"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
            <span class="task-action-text">${escapeHtml(task.action)}</span>
          </span>
          ${isNoShow ? `
            <span class="task-notes-sub" style="color: #fca5a5; font-weight: 600;">
              ⚠️ Não Compareceu
            </span>
          ` : (task.notes ? `
            <span class="task-notes-sub" title="${escapeHtml(task.notes)}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px; opacity:0.7; flex-shrink: 0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>${escapeHtml(task.notes)}
            </span>
          ` : '')}
        </div>

        <!-- Coluna 6: Status & Ações Rápidas -->
        <div class="comm-col-actions" style="justify-content: flex-end; gap: 0.3rem; flex-wrap: nowrap;">
          <button type="button" class="btn-task-attend ${isAttended ? 'completed' : ''}" onclick="setCommercialTaskAttendance('${client.id}', 'attended')" title="${isAttended ? 'Marcado como Compareceu! Clique para reabrir como pendente' : 'Marcar que o cliente compareceu'}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Compareceu</span>
          </button>

          <button type="button" class="btn-task-noshow ${isNoShow ? 'active' : ''}" onclick="setCommercialTaskAttendance('${client.id}', 'noshow')" title="${isNoShow ? 'Marcado como Não Compareceu! Clique para reabrir como pendente' : 'Marcar que o cliente NÃO compareceu'}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px;">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Não Compareceu</span>
          </button>

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
          <button type="button" class="btn-icon-clean danger" onclick="deleteCommercialTaskRow('${client.id}')" title="Excluir esta tarefa">
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

  const displayBox = document.getElementById('comm-task-client-display');
  const selectWrapper = document.getElementById('comm-task-client-select-wrapper');
  if (displayBox) displayBox.style.display = 'flex';
  if (selectWrapper) selectWrapper.style.display = 'none';

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

    // Botões de Compareceu e Não Compareceu no Modal
    const isAttended = client.task.status === 'done' || client.task.status === 'attended' || client.task.attendance === 'attended';
    const isNoShow = client.task.status === 'noshow' || client.task.attendance === 'noshow';

    const btnConclude = document.querySelector('.btn-action-conclude-next');
    if (btnConclude) {
      if (isAttended) {
        btnConclude.classList.add('is-done');
        btnConclude.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>✓ Compareceu</span>`;
        btnConclude.title = 'Marcado como Compareceu! Clique para reabrir como pendente se necessário.';
      } else {
        btnConclude.classList.remove('is-done');
        btnConclude.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Compareceu</span>`;
        btnConclude.title = 'Marcar que o cliente compareceu e atualizar histórico';
      }
    }

    const btnNoShow = document.querySelector('.btn-action-noshow-next');
    if (btnNoShow) {
      if (isNoShow) {
        btnNoShow.classList.add('is-noshow');
        btnNoShow.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span>Não Compareceu</span>`;
        btnNoShow.title = 'Marcado como Não Compareceu! Clique para reabrir como pendente se necessário.';
      } else {
        btnNoShow.classList.remove('is-noshow');
        btnNoShow.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span>Não Compareceu</span>`;
        btnNoShow.title = 'Marcar que o cliente NÃO compareceu e atualizar histórico';
      }
    }

    const activePill = document.querySelector('.active-task-pill');
    if (activePill) {
      if (isAttended) {
        activePill.style.background = 'rgba(16, 185, 129, 0.2)';
        activePill.style.color = '#34d399';
        activePill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        activePill.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"></polyline></svg> Cliente Compareceu (30m)`;
      } else if (isNoShow) {
        activePill.style.background = 'rgba(239, 68, 68, 0.2)';
        activePill.style.color = '#f87171';
        activePill.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        activePill.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Não Compareceu (30m)`;
      } else {
        activePill.style.background = '';
        activePill.style.color = '';
        activePill.style.borderColor = '';
        activePill.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Tarefa Agendada (30m)`;
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

  // Define cor do agendamento no seletor
  const taskColor = (client.task && client.task.color) ? client.task.color : '#a855f7';
  if (typeof selectCommercialTaskColor === 'function') {
    selectCommercialTaskColor(taskColor);
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
        <div class="history-item-actions" style="display: flex; align-items: center; gap: 0.35rem;">
          ${!isActiveNow ? `
            <button type="button" class="btn-history-reactivate" onclick="reopenCommercialTaskFromHistory('${client.id}', '${itemKey}')" title="Restaurar esta tarefa como ativa na pauta">
              ↩ Reativar
            </button>
          ` : ''}
          <button type="button" class="btn-icon-clean danger" onclick="deleteCommercialTaskFromHistory('${client.id}', '${itemKey}')" title="Excluir esta tarefa">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}
window.renderCommercialTaskHistory = renderCommercialTaskHistory;

// Excluir tarefa do histórico permanente (ou ativa)
function deleteCommercialTaskFromHistory(clientId, taskKey) {
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  if (!confirm('Deseja realmente excluir esta tarefa?')) return;

  // 1. Remover do histórico
  if (Array.isArray(client.taskHistory)) {
    const idx = client.taskHistory.findIndex((item, i) => item.id === taskKey || `idx-${i}` === taskKey || String(i) === taskKey);
    if (idx >= 0) {
      const removed = client.taskHistory.splice(idx, 1)[0];
      // Se for a tarefa ativa atual, limpa também
      if (client.task && (client.task.id === taskKey || (removed && removed.id === client.task.id))) {
        client.task = null;
      }
    }
  }

  // 2. Se for a tarefa ativa na pauta
  if (client.task && client.task.id === taskKey) {
    client.task = null;
  }

  saveCommercialData();
  renderCommercialTaskHistory(client);
  renderCommercialApp();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  if (typeof showToast === 'function') {
    showToast('Tarefa excluída com sucesso!', 'info', 2200);
  }
}
window.deleteCommercialTaskFromHistory = deleteCommercialTaskFromHistory;



// Marcar Compareceu na tarefa ativa do modal
function concludeCurrentActiveTask() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !client.task) return;

  if (client.task.status === 'done') {
    client.task.status = 'pending';
    client.task.attendance = null;
    delete client.task.completedAt;
    client.task.updatedAt = new Date().toISOString();
    saveCommercialData();
    renderCommercialApp();
    renderCommercialTasksView();
    if (typeof window.renderCalendarGrid === 'function') {
      window.renderCalendarGrid();
    }
    openCommercialTaskModal(client.id);
    if (typeof showToast === 'function') {
      showToast(`⏳ Tarefa de "${client.name}" reaberta como em aberto.`, 'info', 2500);
    }
    return;
  }

  client.task.status = 'done';
  client.task.attendance = 'attended';
  client.task.completedAt = new Date().toISOString();
  client.task.updatedAt = new Date().toISOString();

  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const taskId = client.task.id || ('task-done-' + Date.now());
  const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
  const archivedTask = {
    ...client.task,
    id: taskId,
    status: 'done',
    attendance: 'attended',
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    client.taskHistory[existingIndex] = archivedTask;
  } else {
    client.taskHistory.unshift(archivedTask);
  }

  saveCommercialData();
  renderCommercialApp();
  renderCommercialTasksView();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  closeCommercialTaskModal();
  if (typeof showToast === 'function') {
    showToast(`✅ "${client.name}" marcado como Compareceu!`, 'success', 2800);
  }
}
window.concludeCurrentActiveTask = concludeCurrentActiveTask;

// Marcar Não Compareceu na tarefa ativa do modal
function noshowCurrentActiveTask() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => c.id === clientId);
  if (!client || !client.task) return;

  if (client.task.status === 'noshow') {
    client.task.status = 'pending';
    client.task.attendance = null;
    delete client.task.noShowAt;
    client.task.updatedAt = new Date().toISOString();
    saveCommercialData();
    renderCommercialApp();
    renderCommercialTasksView();
    if (typeof window.renderCalendarGrid === 'function') {
      window.renderCalendarGrid();
    }
    openCommercialTaskModal(client.id);
    if (typeof showToast === 'function') {
      showToast(`⏳ Tarefa de "${client.name}" reaberta como em aberto.`, 'info', 2500);
    }
    return;
  }

  client.task.status = 'noshow';
  client.task.attendance = 'noshow';
  client.task.noShowAt = new Date().toISOString();
  client.task.updatedAt = new Date().toISOString();

  if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
  const taskId = client.task.id || ('task-noshow-' + Date.now());
  const existingIndex = client.taskHistory.findIndex(h => h.id === taskId);
  const archivedTask = {
    ...client.task,
    id: taskId,
    status: 'noshow',
    attendance: 'noshow',
    noShowAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    client.taskHistory[existingIndex] = archivedTask;
  } else {
    client.taskHistory.unshift(archivedTask);
  }

  saveCommercialData();
  renderCommercialApp();
  renderCommercialTasksView();
  if (typeof window.renderCalendarGrid === 'function') {
    window.renderCalendarGrid();
  }

  closeCommercialTaskModal();
  if (typeof showToast === 'function') {
    showToast(`⚠️ "${client.name}" marcado como Não Compareceu!`, 'warning', 2800);
  }
}
window.noshowCurrentActiveTask = noshowCurrentActiveTask;

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
function prepareScheduleNewTask(forceNew = true) {
  const activeCard = document.getElementById('comm-task-active-card');
  const formElement = document.getElementById('form-commercial-task');
  const inputAction = document.getElementById('comm-task-action');
  const inputDate = document.getElementById('comm-task-date');
  const inputTime = document.getElementById('comm-task-time');
  const inputNotes = document.getElementById('comm-task-notes');
  const formTitle = document.getElementById('comm-task-form-section-title');
  const modeInput = document.getElementById('comm-task-edit-mode');

  if (activeCard) activeCard.style.display = 'none';
  if (formElement) formElement.style.display = 'block';
  if (modeInput) modeInput.value = 'new';
  if (formTitle) formTitle.textContent = 'Agendar Nova Tarefa / Próximo Passo:';
  
  if (forceNew) {
    if (inputAction) inputAction.value = '';
    if (inputNotes) inputNotes.value = '';
  }
  if (inputDate) {
    inputDate.value = new Date().toISOString().split('T')[0];
  }
  if (inputTime && !inputTime.value) {
    inputTime.value = '10:00';
  }

  switchTaskModalTab('form');
  setTimeout(() => inputAction?.focus(), 80);

  if (typeof showToast === 'function') {
    showToast('Modo de Nova Tarefa ativado. Preencha e salve.', 'info', 2200);
  }
}
window.prepareScheduleNewTask = prepareScheduleNewTask;

// Abre modal para agendar nova tarefa diretamente da página de Tarefas
function openNewTaskForClientModal() {
  if (!COMMERCIAL_STATE.clients || COMMERCIAL_STATE.clients.length === 0) {
    if (typeof showToast === 'function') showToast('Cadastre um cliente antes de agendar uma tarefa.', 'warning');
    return;
  }

  const sortedClients = [...COMMERCIAL_STATE.clients].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  const firstClient = sortedClients[0];

  const clientSelect = document.getElementById('comm-task-client-select');
  if (clientSelect) {
    clientSelect.innerHTML = sortedClients.map(c => `
      <option value="${c.id}">${escapeHtml(c.name)} (${escapeHtml(c.area || 'Geral')})</option>
    `).join('');
    clientSelect.value = firstClient.id;
  }

  openCommercialTaskModal(firstClient.id, 'form', true);

  const displayBox = document.getElementById('comm-task-client-display');
  const selectWrapper = document.getElementById('comm-task-client-select-wrapper');
  if (displayBox) displayBox.style.display = 'none';
  if (selectWrapper) selectWrapper.style.display = 'block';
}
window.openNewTaskForClientModal = openNewTaskForClientModal;

function onSelectTaskClientChange(selectedId) {
  const inputClientId = document.getElementById('comm-task-client-id');
  if (inputClientId) inputClientId.value = selectedId;
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(selectedId));
  if (client) {
    renderCommercialTaskHistory(client);
  }
}
window.onSelectTaskClientChange = onSelectTaskClientChange;

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
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
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

// Excluir tarefa ativa atual da pauta
function removeCurrentActiveTask() {
  const inputClientId = document.getElementById('comm-task-client-id');
  const clientId = inputClientId?.value;
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (!client || !client.task) return;

  closeCommercialTaskModal();
  deleteCommercialTaskRow(clientId);
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
    const taskColor = document.getElementById('comm-task-color')?.value || '#a855f7';
    const taskId = client.task.id;
    client.task.action = action;
    client.task.dueDate = dueDate;
    client.task.dueTime = dueTime;
    client.task.endTime = endTime;
    client.task.notes = notes;
    client.task.color = taskColor;
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
        color: taskColor,
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
    const taskColor = document.getElementById('comm-task-color')?.value || '#a855f7';
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
      color: taskColor,
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

  // Fechar modal de opções personalizadas com clique fora
  const customOptModal = document.getElementById('modal-create-custom-option');
  customOptModal?.addEventListener('click', (e) => {
    if (e.target === customOptModal) closeCreateCustomOptionModal();
  });

  // Gatilhos de criação nos selects de Quick Add e Modal
  const bindCreateOptionSelect = (selectId, type) => {
    const el = document.getElementById(selectId);
    el?.addEventListener('change', (e) => {
      if (e.target.value && e.target.value.startsWith('__CREATE_')) {
        openCreateCustomOptionModal(type);
      }
    });
  };
  bindCreateOptionSelect('comm-quick-area', 'area');
  bindCreateOptionSelect('comm-client-area', 'area');
  bindCreateOptionSelect('comm-quick-type', 'type');
  bindCreateOptionSelect('comm-client-status', 'type');
  bindCreateOptionSelect('comm-quick-nextstep', 'nextstep');
  bindCreateOptionSelect('comm-client-next-step', 'nextstep');

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

  // Botoes de alternancia das sub-abas internas
  document.querySelectorAll('.comm-view-btn').forEach(btn => {
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener('click', () => {
        const target = btn.dataset.subtab || btn.dataset.subtabTarget || btn.dataset.commView || (btn.id || '').replace('btn-comm-view-', '').replace('comm-view-', '');
        if (target) setCommercialSubtab(target);
      });
    }
  });

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

  // Input do popover de desqualificação: Enter confirma, Esc fecha
  const disqInput = document.getElementById('disqualify-reason-input');
  disqInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmDisqualifyClient();
    } else if (e.key === 'Escape') {
      closeDisqualifyPopover();
    }
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

// ========================================================
// SISTEMA DE ALARME E NOTIFICAÇÃO DE TAREFAS NO TOPO DIREITO
// ========================================================
const DEFAULT_TASK_ALARM_SETTINGS = {
  enabled: true,
  antecedence: 0, // 0 (no horário exato), 5, 10, 15, 30 minutos
  sound: 'chime', // 'chime', 'crystal', 'digital', 'harp', 'gong'
  volume: 80 // 0 a 100%
};

let COMMERCIAL_ALARM_SETTINGS = { ...DEFAULT_TASK_ALARM_SETTINGS };
try {
  const savedAlarmSettings = localStorage.getItem('mvt_task_alarm_settings');
  if (savedAlarmSettings) {
    COMMERCIAL_ALARM_SETTINGS = { ...DEFAULT_TASK_ALARM_SETTINGS, ...JSON.parse(savedAlarmSettings) };
  }
} catch (e) {}

function saveTaskAlarmSettings() {
  try {
    localStorage.setItem('mvt_task_alarm_settings', JSON.stringify(COMMERCIAL_ALARM_SETTINGS));
  } catch (e) {}
  syncTaskAlarmInputs();
}

const COMMERCIAL_TASK_ALARMS = {
  dismissed: new Set(),
  activeNotifs: new Set(),
  timer: null
};

// Sintetizador Web Audio API: 5 Timbres Profissionais sem necessidade de arquivos externos
function playTaskAlarmSound(soundType, volumePercent) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const type = soundType || COMMERCIAL_ALARM_SETTINGS.sound || 'chime';
    const volSetting = typeof volumePercent === 'number' ? volumePercent : (COMMERCIAL_ALARM_SETTINGS.volume ?? 80);
    const vol = Math.max(0, Math.min(100, volSetting)) / 100;
    if (vol <= 0) return;

    const now = ctx.currentTime;

    if (type === 'crystal') {
      // 1. Sino Cristalino (Harmônicos triplos cristalinos estilo Apple / Slack)
      const freqs = [1046.5, 1318.51, 1567.98];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.24 * vol, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.85);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.85);
      });
    } else if (type === 'digital') {
      // 2. Alerta Digital (Dois pings modernos e nítidos em 1200Hz)
      [0, 0.12].forEach(startOffset => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now + startOffset);
        gain.gain.setValueAtTime(0.001, now + startOffset);
        gain.gain.linearRampToValueAtTime(0.3 * vol, now + startOffset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + startOffset);
        osc.stop(now + startOffset + 0.095);
      });
    } else if (type === 'harp') {
      // 3. Acorde Relaxante (Arpejo suave em 4 notas A4 -> C#5 -> E5 -> A5)
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.24 * vol, now + idx * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.95);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.95);
      });
    } else if (type === 'gong') {
      // 4. Gongo Corporativo (Ressonância rica e encorpada em 329.63Hz com harmônico)
      [329.63, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime((idx === 0 ? 0.35 : 0.15) * vol, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.45);
      });
    } else {
      // 5. Chime Suave (Campainha Dupla clássica D5 -> A5)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.28 * vol, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
      osc.start(now);
      osc.stop(now + 0.75);
    }
  } catch (e) {
    // Silencia caso bloqueado por autoplay policy antes de qualquer clique do usuário
  }
}
window.playTaskAlarmSound = playTaskAlarmSound;

// Sincroniza controles de input da aba de configurações e do modal rápido
function syncTaskAlarmInputs() {
  const chk = document.getElementById('alarm-setting-enabled-toggle');
  const lbl = document.getElementById('alarm-setting-enabled-label');
  const ant = document.getElementById('alarm-setting-antecedence');
  const snd = document.getElementById('alarm-setting-sound');
  const vol = document.getElementById('alarm-setting-volume');
  const volDsp = document.getElementById('alarm-volume-display');

  const mChk = document.getElementById('modal-alarm-setting-enabled-toggle');
  const mAnt = document.getElementById('modal-alarm-setting-antecedence');
  const mSnd = document.getElementById('modal-alarm-setting-sound');
  const mVol = document.getElementById('modal-alarm-setting-volume');
  const mVolDsp = document.getElementById('modal-alarm-volume-display');

  const en = Boolean(COMMERCIAL_ALARM_SETTINGS.enabled);
  if (chk) chk.checked = en;
  if (mChk) mChk.checked = en;
  if (lbl) {
    lbl.textContent = en ? 'Alertas Ativados' : 'Alertas Desativados';
    lbl.style.color = en ? '#10b981' : 'var(--text-muted)';
  }

  const antVal = String(COMMERCIAL_ALARM_SETTINGS.antecedence ?? 0);
  if (ant) ant.value = antVal;
  if (mAnt) mAnt.value = antVal;

  const sndVal = COMMERCIAL_ALARM_SETTINGS.sound || 'chime';
  if (snd) snd.value = sndVal;
  if (mSnd) mSnd.value = sndVal;

  const volVal = String(COMMERCIAL_ALARM_SETTINGS.volume ?? 80);
  if (vol) vol.value = volVal;
  if (mVol) mVol.value = volVal;
  if (volDsp) volDsp.textContent = `${volVal}%`;
  if (mVolDsp) mVolDsp.textContent = `${volVal}%`;
}
window.syncTaskAlarmInputs = syncTaskAlarmInputs;

function updateTaskAlarmAntecedence(val) {
  COMMERCIAL_ALARM_SETTINGS.antecedence = parseInt(val, 10) || 0;
  saveTaskAlarmSettings();
  if (typeof showToast === 'function') {
    const txt = COMMERCIAL_ALARM_SETTINGS.antecedence === 0 ? 'no horário exato marcado' : `${COMMERCIAL_ALARM_SETTINGS.antecedence} min antes`;
    showToast(`⏱️ Alarme ajustado para disparar ${txt}.`, 'info', 2200);
  }
}
window.updateTaskAlarmAntecedence = updateTaskAlarmAntecedence;

function updateTaskAlarmSoundType(val) {
  COMMERCIAL_ALARM_SETTINGS.sound = val;
  saveTaskAlarmSettings();
  playTaskAlarmSound(val);
}
window.updateTaskAlarmSoundType = updateTaskAlarmSoundType;

function updateTaskAlarmVolume(val) {
  COMMERCIAL_ALARM_SETTINGS.volume = parseInt(val, 10);
  saveTaskAlarmSettings();
}
window.updateTaskAlarmVolume = updateTaskAlarmVolume;

function toggleTaskAlarmEnabled(checked) {
  COMMERCIAL_ALARM_SETTINGS.enabled = Boolean(checked);
  saveTaskAlarmSettings();
  if (typeof showToast === 'function') {
    showToast(checked ? '🔔 Alertas sonoros ativados!' : '🔕 Alertas sonoros desativados.', checked ? 'success' : 'info', 2200);
  }
}
window.toggleTaskAlarmEnabled = toggleTaskAlarmEnabled;

function testCurrentAlarmSound() {
  playTaskAlarmSound();
  if (typeof showToast === 'function') {
    showToast('🔊 Tocando som de teste...', 'info', 1500);
  }
}
window.testCurrentAlarmSound = testCurrentAlarmSound;

function openTaskAlarmSettingsModal() {
  syncTaskAlarmInputs();
  const m = document.getElementById('modal-task-alarm-settings');
  if (m) m.classList.add('active');
}
window.openTaskAlarmSettingsModal = openTaskAlarmSettingsModal;

function closeTaskAlarmSettingsModal() {
  const m = document.getElementById('modal-task-alarm-settings');
  if (m) m.classList.remove('active');
}
window.closeTaskAlarmSettingsModal = closeTaskAlarmSettingsModal;

// Recarregar a página e sincronizar dados com animação no botão
function reloadCommercialPage() {
  const btn = document.getElementById('btn-header-reload-page');
  if (btn) btn.classList.add('is-spinning');
  window.location.reload();
}
window.reloadCommercialPage = reloadCommercialPage;

// Filtros da Pauta de Tarefas
function setCommercialTaskStatusFilter(status) {
  COMMERCIAL_STATE.taskStatusFilter = status;
  renderCommercialTasksView();
}
window.setCommercialTaskStatusFilter = setCommercialTaskStatusFilter;

function onCommercialTaskAreaFilterChange(area) {
  COMMERCIAL_STATE.taskAreaFilter = area;
  renderCommercialTasksView();
}
window.onCommercialTaskAreaFilterChange = onCommercialTaskAreaFilterChange;

// Verificação periódica com garantia de disparo no horário (mesmo alterado)
function checkCommercialTaskAlarms() {
  if (!COMMERCIAL_ALARM_SETTINGS.enabled) return;

  const container = document.getElementById('task-alarm-notification-container');
  if (!container) return;

  const clients = COMMERCIAL_STATE.clients || [];
  const now = new Date();
  const todayStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const antecedence = parseInt(COMMERCIAL_ALARM_SETTINGS.antecedence || 0, 10);

  clients.forEach(client => {
    if (!client || !client.task || !client.task.dueDate || client.task.status === 'done') return;

    // Apenas tarefas agendadas para hoje
    if (client.task.dueDate !== todayStr) return;

    const dueTime = client.task.dueTime || '10:00';
    const [tH, tM] = dueTime.split(':').map(Number);
    if (isNaN(tH)) return;
    const taskMinutes = tH * 60 + (tM || 0);

    // O horário de disparo considera a antecedência
    const triggerMinutes = taskMinutes - antecedence;

    // Se já deu o horário de disparo (ou passou recentemente nos últimos 60 minutos)
    if (currentMinutes >= triggerMinutes && currentMinutes <= triggerMinutes + 60) {
      // A chave inclui dueTime e antecedência: se o horário for alterado para outro valor, o alarme tocará no novo horário!
      const alarmKey = `alarm-${client.id}-${client.task.dueDate}_${dueTime}_ant${antecedence}`;
      
      if (!COMMERCIAL_TASK_ALARMS.dismissed.has(alarmKey) && !COMMERCIAL_TASK_ALARMS.activeNotifs.has(alarmKey)) {
        triggerTaskAlarmNotification(client, alarmKey, antecedence);
      }
    }
  });
}
window.checkCommercialTaskAlarms = checkCommercialTaskAlarms;

function triggerTaskAlarmNotification(client, alarmKey, antecedence = 0) {
  const container = document.getElementById('task-alarm-notification-container');
  if (!container) return;

  COMMERCIAL_TASK_ALARMS.activeNotifs.add(alarmKey);
  playTaskAlarmSound();

  const task = client.task;
  const startTime = task.dueTime || '10:00';
  const timeLabel = antecedence > 0 ? `⏰ ${startTime} (em ${antecedence}m)` : `⏰ ${startTime}`;

  const card = document.createElement('div');
  card.className = 'task-alarm-card';
  card.id = alarmKey;
  card.innerHTML = `
    <div class="task-alarm-header">
      <div class="task-alarm-title-box task-alarm-title-group">
        <span class="task-alarm-bell">🔔</span>
        <span class="task-alarm-title">Lembrete de Tarefa</span>
      </div>
      <div style="display:flex; align-items:center; gap: 6px;">
        <span class="task-alarm-time-badge task-alarm-badge-time">${timeLabel}</span>
        <button type="button" class="btn-task-alarm-dismiss" onclick="dismissTaskAlarm('${alarmKey}')" title="Dispensar aviso">✕</button>
      </div>
    </div>
    <div class="task-alarm-body">
      <div class="task-alarm-client-name task-alarm-client">
        <strong>${escapeHtml(client.name || 'Cliente')}</strong>
        ${client.phone ? `<span style="opacity:0.75; font-size:0.75rem;">• ${formatPhoneDisplay(client.phone)}</span>` : ''}
      </div>
      <div class="task-alarm-action">${escapeHtml(task.action || 'Compromisso Comercial')}</div>
      ${task.notes ? `<div class="task-alarm-notes" style="font-size: 0.74rem; color: #94a3b8; margin-top: 2px;">${escapeHtml(task.notes)}</div>` : ''}
    </div>
    <div class="task-alarm-actions">
      <button type="button" class="btn-task-alarm-done" onclick="quickCompleteTaskFromAlarm('${client.id}', '${alarmKey}')" title="Marcar como concluída">
        ✓ Concluir
      </button>
      <button type="button" class="btn-task-alarm-view" onclick="openTaskFromAlarm('${client.id}', '${alarmKey}')" title="Abrir detalhes da tarefa">
        Ver Detalhes
      </button>
    </div>
  `;

  container.appendChild(card);
}

function dismissTaskAlarm(alarmKey) {
  COMMERCIAL_TASK_ALARMS.dismissed.add(alarmKey);
  COMMERCIAL_TASK_ALARMS.activeNotifs.delete(alarmKey);
  const card = document.getElementById(alarmKey);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateX(50px)';
    card.style.transition = 'all 0.25s ease';
    setTimeout(() => card.remove(), 260);
  }
}
window.dismissTaskAlarm = dismissTaskAlarm;

function quickCompleteTaskFromAlarm(clientId, alarmKey) {
  const client = COMMERCIAL_STATE.clients.find(c => String(c.id) === String(clientId));
  if (client && client.task) {
    client.task.status = 'done';
    client.task.completedAt = new Date().toISOString();
    if (!Array.isArray(client.taskHistory)) client.taskHistory = [];
    client.taskHistory.unshift({ ...client.task });
    saveCommercialData();
    renderCommercialApp();
    renderCommercialTasksView();
    if (typeof window.renderCalendarGrid === 'function') {
      window.renderCalendarGrid();
    }
    if (typeof showToast === 'function') {
      showToast(`✅ Tarefa de "${client.name}" concluída!`, 'success');
    }
  }
  dismissTaskAlarm(alarmKey);
}
window.quickCompleteTaskFromAlarm = quickCompleteTaskFromAlarm;

function openTaskFromAlarm(clientId, alarmKey) {
  openCommercialTaskModal(clientId);
  dismissTaskAlarm(alarmKey);
}
window.openTaskFromAlarm = openTaskFromAlarm;

function startCommercialTaskAlarmMonitor() {
  if (COMMERCIAL_TASK_ALARMS.timer) clearInterval(COMMERCIAL_TASK_ALARMS.timer);
  syncTaskAlarmInputs();
  checkCommercialTaskAlarms();
  // Monitoramento a cada 5 segundos para precisão pontual no horário
  COMMERCIAL_TASK_ALARMS.timer = setInterval(checkCommercialTaskAlarms, 5000);
}
window.startCommercialTaskAlarmMonitor = startCommercialTaskAlarmMonitor;

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
  startCommercialRealtimeMonitoring();
  startCommercialTaskAlarmMonitor();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startCommercialTaskAlarmMonitor();
}
