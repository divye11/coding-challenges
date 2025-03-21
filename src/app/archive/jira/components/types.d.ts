declare interface LaneItem {
   id: string;
   status: string;
   title: string;
   tags: string[];
   points: number;
   assignee: {
      firstName: string;
      lastName: string;
   }
}