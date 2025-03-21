export interface SearchResult {
   id: string
   type: string
   text: string
   link?: string
}

const searchResults: SearchResult[] = [
   { id: "1", type: "suggestion", text: "engineering jobs" },
   { id: "2", type: "suggestion", text: "marketing trends 2024" },
   { id: "3", type: "department", text: "Engineering", link: "/departments/engineering" },
   { id: "4", type: "department", text: "Marketing", link: "/departments/marketing" },
   { id: "5", type: "employee", text: "Alice Johnson - Software Engineer", link: "/employees/alice-johnson" },
   { id: "6", type: "employee", text: "Bob Smith - DevOps Engineer", link: "/employees/bob-smith" },
   { id: "7", type: "project", text: "AI-driven Marketing Automation", link: "/projects/ai-marketing" },
   { id: "8", type: "news", text: "Tech Industry Layoffs in 2024", link: "https://techcrunch.com/tech-layoffs-2024" },
   { id: "9", type: "suggestion", text: "remote work opportunities" },
   { id: "10", type: "suggestion", text: "data science trends 2024" },
   { id: "11", type: "department", text: "Human Resources", link: "/departments/hr" },
   { id: "12", type: "department", text: "Finance", link: "/departments/finance" },
   { id: "13", type: "employee", text: "Charlie Davis - Data Scientist", link: "/employees/charlie-davis" },
   { id: "14", type: "employee", text: "Diana Lee - Product Manager", link: "/employees/diana-lee" },
   { id: "15", type: "project", text: "Blockchain for Supply Chain", link: "/projects/blockchain-supply-chain" },
   { id: "16", type: "news", text: "AI Breakthroughs in 2024", link: "https://ai-news.com/ai-breakthroughs-2024" },
   { id: "17", type: "suggestion", text: "cybersecurity best practices" },
   { id: "18", type: "suggestion", text: "cloud computing trends" },
   { id: "19", type: "department", text: "Legal", link: "/departments/legal" },
   { id: "20", type: "department", text: "Operations", link: "/departments/operations" },
   { id: "21", type: "employee", text: "Eve Martinez - UX Designer", link: "/employees/eve-martinez" },
   { id: "22", type: "employee", text: "Frank Wilson - QA Engineer", link: "/employees/frank-wilson" },
   { id: "23", type: "project", text: "Green Energy Initiative", link: "/projects/green-energy" },
   { id: "24", type: "news", text: "Quantum Computing Advances", link: "https://quantum-news.com/advances-2024" },
   { id: "25", type: "suggestion", text: "machine learning tutorials" },
   { id: "26", type: "suggestion", text: "startup funding tips" },
   { id: "27", type: "department", text: "Sales", link: "/departments/sales" },
   { id: "28", type: "department", text: "Customer Support", link: "/departments/support" },
   { id: "29", type: "employee", text: "Grace Kim - Marketing Specialist", link: "/employees/grace-kim" },
   { id: "30", type: "employee", text: "Henry Brown - Business Analyst", link: "/employees/henry-brown" },
   { id: "31", type: "project", text: "E-commerce Platform Upgrade", link: "/projects/ecommerce-upgrade" },
   { id: "32", type: "news", text: "Global Economic Trends 2024", link: "https://economy-news.com/global-trends-2024" },
   { id: "33", type: "suggestion", text: "best programming languages 2024" },
   { id: "34", type: "suggestion", text: "how to improve productivity" },
   { id: "35", type: "department", text: "IT", link: "/departments/it" },
   { id: "36", type: "department", text: "Research and Development", link: "/departments/rnd" },
   { id: "37", type: "employee", text: "Ivy Nguyen - Research Scientist", link: "/employees/ivy-nguyen" },
   { id: "38", type: "employee", text: "Jack Taylor - Network Engineer", link: "/employees/jack-taylor" },
   { id: "39", type: "project", text: "5G Network Expansion", link: "/projects/5g-expansion" },
   { id: "40", type: "news", text: "Space Exploration Updates", link: "https://space-news.com/exploration-2024" },
];

const filterResults = (query: string): SearchResult[] => {
   return searchResults.filter((result) => {
      return result.text.includes(query);
   })
}

export const fetchResults = (query: string): Promise<SearchResult[] | []> => {
    if (!query) {
      return Promise.resolve([]);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
         resolve(filterResults(query))
      }, 5000)
    })
}

export const debounceCalls = (cb: (query: string) => void, delay: number) => {
   let timerId: NodeJS.Timeout;

   return function(query: string) {
      if (timerId) {
         console.log('clearing timeout', timerId)
         clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
         cb(query)
      }, delay);
   }
}