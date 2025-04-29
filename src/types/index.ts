export interface Region {
    id: number;
    name: string;
    code: string;
  }
  
  export interface FactCheck {
    source_url: string;
    is_verified: boolean;
  }
  
  export interface Summary {
    id: number;
    document_title: string;
    text: string;               // Main summary text
    original_text?: string;     // Original excerpt from the PDF document
    explanation?: string;       // Simplified explanation of how it affects people
    language: string;           // 'en' or 'sw'
    created_at: string;
    factCheck: FactCheck;
  }