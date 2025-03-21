const DUMMY_TICKETS: LaneItem[] = [
   {
      id: "ticket-1",
      status: "todo",
      title: "Fix login issue",
      tags: ["bug", "backend"],
      points: 3,
      assignee: {
         firstName: "John",
         lastName: "Doe"
      }
   },
   {
      id: "ticket-2",
      status: "in-progress",
      title: "Implement dark mode",
      tags: ["feature", "frontend"],
      points: 5,
      assignee: {
         firstName: "Jane",
         lastName: "Smith"
      }
   },
   {
      id: "ticket-3",
      status: "done",
      title: "Optimize database queries",
      tags: ["performance", "database"],
      points: 8,
      assignee: {
         firstName: "Mike",
         lastName: "Johnson"
      }
   },
   {
      id: "ticket-4",
      status: "in-review",
      title: "Update API documentation",
      tags: ["documentation"],
      points: 2,
      assignee: {
         firstName: "Emily",
         lastName: "Clark"
      }
   },
   {
      id: "ticket-5",
      status: "todo",
      title: "Refactor authentication module",
      tags: ["refactor", "backend"],
      points: 6,
      assignee: {
         firstName: "Chris",
         lastName: "Brown"
      }
   }
];


export const fetchApi = async (): Promise<LaneItem[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(DUMMY_TICKETS)
      }, 100)
   })
}