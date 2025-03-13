export interface Directory {
   id: string
   name: string
   type: string
   url?: string
   children?: Directory[]
}

export const data: Directory[] = [{
   "id": "root",
   "name": "MyProject",
   "type": "directory",
   "children": [
     {
       "id": "dir1",
       "name": "docs",
       "type": "directory",
       "children": [
         {
           "id": "file1",
           "name": "README.md",
           "type": "file",
           "url": "https://raw.githubusercontent.com/facebook/react/main/README.md"
         },
         {
           "id": "file2",
           "name": "CHANGELOG.md",
           "type": "file",
           "url": "https://raw.githubusercontent.com/facebook/react/main/CHANGELOG.md"
         }
       ]
     },
     {
       "id": "dir2",
       "name": "src",
       "type": "directory",
       "children": [
         {
           "id": "dir3",
           "name": "hooks",
           "type": "directory",
           "children": [
             {
               "id": "file3",
               "name": "useComment.js",
               "type": "file",
               "url": "https://raw.githubusercontent.com/facebook/react/main/packages/react/src/ReactHooks.js"
             }
           ]
         },
         {
           "id": "file4",
           "name": "index.js",
           "type": "file",
           "url": "https://raw.githubusercontent.com/facebook/react/main/packages/react/src/React.js"
         }
       ]
     },
     {
       "id": "file5",
       "name": "package.json",
       "type": "file",
       "url": "https://raw.githubusercontent.com/facebook/react/main/package.json"
     }
   ]
 }]