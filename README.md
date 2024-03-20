
# React Mind Map Project

This project is a comprehensive mind map application built using React, React Flow, and Vite. It empowers you to visually organize your thoughts and ideas with a rich set of features.

![home-page](https://github.com/Cypher-aman/mindmap-maker/assets/71575102/d7194824-86f7-47ea-b350-aa06bb13d228)


### Features

-   **Create and Edit Nodes:**  Add, edit, and connect nodes to represent concepts and relationships.
-   **Context Menu:**  Right-click on a node or in the workspace to access a contextual menu with relevant actions:
  
    ![context-menu](https://github.com/Cypher-aman/mindmap-maker/assets/71575102/2c11524a-8ec9-404b-903f-46afb8e2dc3c)
    -   **Duplicate:**  Creates a copy of the selected node, streamlining the process of replicating existing concepts and relationships. 
    -   **Delete:**  Removes the selected node from the mind map. Be sure to confirm deletion if necessary to avoid accidental removal of important information.
    -   **Edit:**  Opens a sidebar for detailed editing of the selected node's properties.
-  **Sidebar:**  Opens upon clicking "Edit" in the context menu and provides options for customizing the selected node:
  
   ![sidebar](https://github.com/Cypher-aman/mindmap-maker/assets/71575102/b3807aeb-4641-45d8-ad9d-282e4f697661)
    -   **Change Title:**  Edit the main title of the node. 
    -   **Change Color:**  Select a new color from a color picker or palette to visually distinguish the node. 
    -   **Change Description:**  Modify the text description associated with the node for more detailed information.
-   **Node Interaction:**
    -   **Hover Details:**  Gain quick insights into node content upon hovering over them.
    -   ![hover](https://github.com/Cypher-aman/mindmap-maker/assets/71575102/f866dc8a-5afd-493a-b72e-b919a15b2a6d)

    -   **Deep View:**  Dive deeper into a node by clicking on it. This opens a popup.
    -   ![onNodeClick](https://github.com/Cypher-aman/mindmap-maker/assets/71575102/2290f17c-81eb-47f3-8c97-f34645316957)

-   **Save and Download:**  Preserve your mind maps (specify file format) and download them as images for easy sharing.
-   ![reactflow (9)](https://github.com/Cypher-aman/mindmap-maker/assets/71575102/ea71a71e-0726-4bb2-b61a-7a95be9676b6)


**Getting Started**

**Prerequisites:**

-   Node.js and npm (or yarn) installed on your system.

**Setup:**

1.  Clone this repository:
    
    Bash
    
    ```
    git clone https://github.com/Cypher-aman/mindmap-maker.git
    
    ```
    
   
    

    
2.  Navigate to the project directory:
    
    Bash
    
    ```
    cd <your-repo-name>
    
    ```
    


    
3.  Install dependencies:
    
    Bash
    
    ```
    npm install
    ``` (or `yarn install`)
    
    
    ```
    

    

    
4.  Run the development server:
    
    Bash
    
    ```
    npm run dev
    ``` (or `yarn dev`)
    
    
    ```
    


    

This will start the development server and open the application in your default web browser (usually at http://localhost:5173/).

**Usage:**

The user interface should be intuitive, allowing you to interact with the mind map through the toolbar, keyboard shortcuts, and node selection.

**Tech Stack:**

-   React: JavaScript library for building user interfaces
-   React Flow: Library for creating interactive node-based diagrams
-   Vite: Build tool for modern web development

**Contributing:**

Feel free to fork this repository and contribute your own improvements. Please create pull requests for any changes you'd like to share.

**License:**

This project is licensed under the MIT License (see LICENSE file for details).
