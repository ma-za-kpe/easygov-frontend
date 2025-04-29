// src/lib/mockData.ts
export const mockSummaries = [
  {
    id: 1,
    document_title: "Uganda Budget 2025/26",
    text: "The budget allocates $50M for women's health programs, including maternal care and education initiatives, to promote gender equality.",
    language: "en",
    created_at: "2025-04-25T10:00:00Z",
    factCheck: {
      source_url: "https://example.com/uganda-budget-2025.pdf",
      is_verified: true,
    },
  },
  {
    id: 2,
    document_title: "Uganda Budget 2025/26",
    text: "Bajeti inalenga $50M kwa ajili ya programu za afya za wanawake, ikijumuisha huduma za wajawazito na mipango ya elimu, ili kukuza usawa wa kijinsia.",
    language: "sw",
    created_at: "2025-04-25T10:00:00Z",
    factCheck: {
      source_url: "https://example.com/uganda-budget-2025.pdf",
      is_verified: true,
    },
  },
  {
    id: 3,
    document_title: "Uganda Budget 2025/26",
    text: "$20M is dedicated to regional development projects to reduce inequalities, focusing on rural infrastructure and education access.",
    language: "en",
    created_at: "2025-04-25T11:00:00Z",
    factCheck: {
      source_url: "https://example.com/uganda-budget-2025.pdf",
      is_verified: false,
    },
  },
  {
    id: 4,
    document_title: "Uganda Budget 2025/26",
    text: "$20M imetengwa kwa miradi ya maendeleo ya mikoa ili kupunguza ukosefu wa usawa, ikilenga miundombinu ya vijijini na upatikanaji wa elimu.",
    language: "sw",
    created_at: "2025-04-25T11:00:00Z",
    factCheck: {
      source_url: "https://example.com/uganda-budget-2025.pdf",
      is_verified: false,
    },
  },
];

export const mockRegions = [
  { id: 1, name: "Uganda", code: "UG" },
  { id: 2, name: "Kenya", code: "KE" },
  { id: 3, name: "Tanzania", code: "TZ" },
  { id: 4, name: "Rwanda", code: "RW" },
  { id: 5, name: "Burundi", code: "BI" },
  { id: 6, name: "South Sudan", code: "SS" },
  { id: 7, name: "Ethiopia", code: "ET" },
  { id: 8, name: "Somalia", code: "SO" },
  { id: 9, name: "Democratic Republic of Congo", code: "CD" },
];