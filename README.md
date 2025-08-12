# BiteSpeed Chatbot Flow Builder

A modern, extensible chatbot flow builder built with React, TypeScript, and React Flow. Create interactive conversation flows with drag-and-drop ease.

## 🌐 Live Demo

**[Try the live application here](https://bitespeed-fe-task.netlify.app/)**

## ✨ Features

### 🗨️ Text Node

- **Visual Design**: Chat bubble icon with blue theme
- **Real-time Editing**: Instant text updates in settings panel
- **Multiple Instances**: Add unlimited text nodes to your flow
- **Drag & Drop**: Easy placement from the nodes panel

### 📤 File Upload Node

- **Configurable Settings**: Customize label, file types, size limits
- **Multiple Files**: Toggle single or multiple file uploads
- **File Type Restrictions**: Add/remove allowed file extensions
- **Visual Preview**: See upload configuration at a glance
- **Green Theme**: Distinct visual identity with upload icon

### 🎛️ Nodes Panel

- **Icon-based Design**: Visual node identification with colored icons
- **Extensible Architecture**: Easy to add new node types
- **Drag & Drop**: Intuitive node placement on canvas
- **Hover Effects**: Smooth visual feedback

### 🔗 Edge Connections

- **Smart Handles**: Source (right) and target (left) handles
- **Connection Rules**: One outgoing edge per source, multiple incoming per target
- **Visual Arrows**: Clear direction indication with blue arrows
- **Auto-validation**: Real-time connection validation

### ⚙️ Settings Panel

- **Dynamic Content**: Changes based on selected node type
- **Auto-save**: Changes applied instantly, no manual save needed
- **Delete Functionality**: Remove nodes with red delete button
- **Keyboard Shortcuts**: Delete key support for quick removal

### 💾 Save & Validation

- **Flow Validation**: Ensures proper flow structure
- **Error Prevention**: Prevents multiple disconnected endpoints
- **Success Feedback**: Clear success/error messages
- **Auto-clear**: Messages disappear after 3 seconds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bitespeed-fe-task

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Use

### 1. Add Nodes

- **Drag** "Text Message" or "File Upload" from the left panel to the canvas
- **Click** on any node to open its settings panel

### 2. Connect Nodes

- **Drag** from a node's right handle (source) to another node's left handle (target)
- **Visual feedback** shows valid connection points

### 3. Configure Nodes

- **Text Nodes**: Edit message content in real-time
- **File Upload Nodes**: Set label, file types, size limits, and multiple file options

### 4. Delete Nodes

- **Click** the red "Delete" button in settings panel
- **Or press** Delete key when a node is selected

### 5. Save Flow

- **Click** "Save" button in header to validate and save your flow
- **Check console** for the flow JSON output

## 🏗️ Architecture

### Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type safety and better DX
- **React Flow** - Professional flow builder library
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool

### Project Structure

```
src/
├── components/
│   └── FlowBuilder/
│       ├── FlowCanvas.tsx          # Main flow builder
│       ├── NodeTypes/
│       │   ├── TextNode.tsx        # Text message node
│       │   ├── FileUploadNode.tsx  # File upload node
│       │   ├── SettingsPanel.tsx   # Text node settings
│       │   └── FileUploadSettingsPanel.tsx # File upload settings
│       ├── Panels/
│       │   └── NodesPanel.tsx      # Draggable nodes panel
│       └── Toolbar/
│           └── SaveButton.tsx      # Save and validate
├── hooks/
│   └── useFlowState.ts             # Zustand store
├── types/
│   └── flow.ts                     # TypeScript definitions
└── utils/
    └── validateFlow.ts             # Flow validation logic
```

## 🔧 Extensibility

### Adding New Node Types

1. **Define Types** in `src/types/flow.ts`
2. **Create Component** in `src/components/FlowBuilder/NodeTypes/`
3. **Add Settings Panel** if needed
4. **Register** in `FlowCanvas.tsx`
5. **Add to Panel** in `NodesPanel.tsx`

### Example: Adding a Condition Node

```typescript
// 1. Add to types
export type ConditionNodeData = {
  condition: string;
  type: "condition";
};

// 2. Create component
const ConditionNode = ({ data, isConnectable }: NodeProps<AppNode>) => {
  // Implementation
};

// 3. Register in nodeTypes
const nodeTypes = {
  text: TextNode,
  fileUpload: FileUploadNode,
  condition: ConditionNode,
};
```

## 🎨 Design System

### Color Themes

- **Text Nodes**: Blue theme (#3B82F6)
- **File Upload Nodes**: Green theme (#10B981)
- **Error States**: Red theme (#EF4444)
- **Success States**: Green theme (#10B981)

### Icons

- **Text**: Chat bubble icon
- **File Upload**: Cloud upload icon
- **Consistent sizing**: 16px for panel, 24px for nodes

### Layout

- **Responsive design**: Works on different screen sizes
- **Dark canvas**: Gray-800 background for better contrast
- **Clean panels**: White backgrounds with subtle borders

## 🔍 Validation Rules

### Flow Structure

- **Single Entry**: One node can have no incoming edges
- **Connected Flow**: All other nodes must have connections
- **No Loops**: Prevents circular dependencies
- **Clear Path**: Ensures logical conversation flow

### Error Messages

- Clear, actionable error messages
- Visual indicators for validation issues
- Real-time feedback during editing

## 🚀 Performance Optimizations

### Code Splitting

- Lazy loading for future node types
- Optimized bundle size with Vite

### React Optimizations

- `memo` for node components
- `useCallback` for event handlers
- Efficient state updates with Zustand

### Memory Management

- Proper cleanup of event listeners
- Optimized re-renders with React Flow

## 📝 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Type Checking

```bash
npx tsc --noEmit     # Check TypeScript types
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Add** your changes with proper types
4. **Test** thoroughly
5. **Submit** a pull request

---

**Built with ❤️ using React, TypeScript, and React Flow**
