export type ToolCategory = 'read' | 'write';

export interface ToolDefinition {
  name: string;
  description: string;
  category: ToolCategory;
  inputSchema: object;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: 'get_project_structure',
    category: 'read',
    description: 'Get full game hierarchy. Increase maxDepth (default 3) for deeper traversal. Use scriptsOnly to filter.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string' },
        maxDepth: { type: 'number' },
        scriptsOnly: { type: 'boolean' }
      }
    }
  },
  {
    name: 'search_objects',
    category: 'read',
    description: 'Find instances by name, class, or property value.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        searchType: { type: 'string', enum: ['name', 'class', 'property'] },
        propertyName: { type: 'string' }
      },
      required: ['query']
    }
  },
  {
    name: 'get_instance_properties',
    category: 'read',
    description: 'Get all properties of an instance. Set excludeSource=true for scripts to skip source.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        excludeSource: { type: 'boolean' }
      },
      required: ['instancePath']
    }
  },
  {
    name: 'get_instance_children',
    category: 'read',
    description: 'Get children and class types of an instance.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' }
      },
      required: ['instancePath']
    }
  },
  {
    name: 'get_place_info',
    category: 'read',
    description: 'Get place ID, name, and game settings.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'set_property',
    category: 'write',
    description: 'Set a property on an instance.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        propertyName: { type: 'string' },
        propertyValue: { description: 'string, number, boolean, or {x,y,z} object' }
      },
      required: ['instancePath', 'propertyName', 'propertyValue']
    }
  },
  {
    name: 'mass_set_property',
    category: 'write',
    description: 'Set a property on multiple instances.',
    inputSchema: {
      type: 'object',
      properties: {
        paths: { type: 'array', items: { type: 'string' } },
        propertyName: { type: 'string' },
        propertyValue: {}
      },
      required: ['paths', 'propertyName', 'propertyValue']
    }
  },
  {
    name: 'create_object',
    category: 'write',
    description: 'Create a new instance with optional properties.',
    inputSchema: {
      type: 'object',
      properties: {
        className: { type: 'string' },
        parent: { type: 'string' },
        name: { type: 'string' },
        properties: { type: 'object' }
      },
      required: ['className', 'parent']
    }
  },
  {
    name: 'mass_create_objects',
    category: 'write',
    description: 'Create multiple instances in one call.',
    inputSchema: {
      type: 'object',
      properties: {
        objects: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              className: { type: 'string' },
              parent: { type: 'string' },
              name: { type: 'string' },
              properties: { type: 'object' }
            },
            required: ['className', 'parent']
          }
        }
      },
      required: ['objects']
    }
  },
  {
    name: 'delete_object',
    category: 'write',
    description: 'Delete an instance.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' }
      },
      required: ['instancePath']
    }
  },
  {
    name: 'smart_duplicate',
    category: 'write',
    description: 'Duplicate an instance with offset, rotation, scale, and property variations.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        count: { type: 'number' },
        options: {
          type: 'object',
          properties: {
            namePattern: { type: 'string' },
            positionOffset: { type: 'array', items: { type: 'number' } },
            rotationOffset: { type: 'array', items: { type: 'number' } },
            scaleOffset: { type: 'array', items: { type: 'number' } },
            propertyVariations: { type: 'object' },
            targetParents: { type: 'array', items: { type: 'string' } }
          }
        }
      },
      required: ['instancePath', 'count']
    }
  },
  {
    name: 'mass_duplicate',
    category: 'write',
    description: 'Batch smart_duplicate operations.',
    inputSchema: {
      type: 'object',
      properties: {
        duplications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              instancePath: { type: 'string' },
              count: { type: 'number' },
              options: { type: 'object' }
            },
            required: ['instancePath', 'count']
          }
        }
      },
      required: ['duplications']
    }
  },
  {
    name: 'grep_scripts',
    category: 'read',
    description: 'Search script sources. Returns matches grouped by script with line/column numbers.',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: { type: 'string' },
        caseSensitive: { type: 'boolean' },
        usePattern: { type: 'boolean' },
        contextLines: { type: 'number' },
        maxResults: { type: 'number' },
        maxResultsPerScript: { type: 'number' },
        filesOnly: { type: 'boolean' },
        path: { type: 'string' },
        classFilter: { type: 'string', enum: ['Script', 'LocalScript', 'ModuleScript'] }
      },
      required: ['pattern']
    }
  },
  {
    name: 'get_script_source',
    category: 'read',
    description: 'Get script source. Returns source and numberedSource. Use startLine/endLine for large scripts.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        startLine: { type: 'number' },
        endLine: { type: 'number' }
      },
      required: ['instancePath']
    }
  },
  {
    name: 'set_script_source',
    category: 'write',
    description: 'Replace entire script source.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        source: { type: 'string' }
      },
      required: ['instancePath', 'source']
    }
  },
  {
    name: 'edit_script_lines',
    category: 'write',
    description: 'Replace a range of lines (1-indexed, inclusive).',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        startLine: { type: 'number' },
        endLine: { type: 'number' },
        newContent: { type: 'string' }
      },
      required: ['instancePath', 'startLine', 'endLine', 'newContent']
    }
  },
  {
    name: 'insert_script_lines',
    category: 'write',
    description: 'Insert lines after a line number (0 = beginning).',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        afterLine: { type: 'number' },
        newContent: { type: 'string' }
      },
      required: ['instancePath', 'newContent']
    }
  },
  {
    name: 'delete_script_lines',
    category: 'write',
    description: 'Delete a range of lines (1-indexed, inclusive).',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        startLine: { type: 'number' },
        endLine: { type: 'number' }
      },
      required: ['instancePath', 'startLine', 'endLine']
    }
  },
  {
    name: 'set_attribute',
    category: 'write',
    description: 'Set an attribute. Supports string, number, boolean, Vector3, Color3, UDim2.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        attributeName: { type: 'string' },
        attributeValue: {},
        valueType: { type: 'string' }
      },
      required: ['instancePath', 'attributeName', 'attributeValue']
    }
  },
  {
    name: 'get_attributes',
    category: 'read',
    description: 'Get all attributes on an instance.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' }
      },
      required: ['instancePath']
    }
  },
  {
    name: 'delete_attribute',
    category: 'write',
    description: 'Delete an attribute.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        attributeName: { type: 'string' }
      },
      required: ['instancePath', 'attributeName']
    }
  },
  {
    name: 'add_tag',
    category: 'write',
    description: 'Add a CollectionService tag to an instance.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        tagName: { type: 'string' }
      },
      required: ['instancePath', 'tagName']
    }
  },
  {
    name: 'remove_tag',
    category: 'write',
    description: 'Remove a CollectionService tag from an instance.',
    inputSchema: {
      type: 'object',
      properties: {
        instancePath: { type: 'string' },
        tagName: { type: 'string' }
      },
      required: ['instancePath', 'tagName']
    }
  },
  {
    name: 'get_tagged',
    category: 'read',
    description: 'Get all instances with a specific CollectionService tag.',
    inputSchema: {
      type: 'object',
      properties: {
        tagName: { type: 'string' }
      },
      required: ['tagName']
    }
  },
  {
    name: 'get_selection',
    category: 'read',
    description: 'Get currently selected objects in Studio.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'execute_luau',
    category: 'write',
    description: 'Execute Luau code in plugin context. Use print()/warn() for output.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string' }
      },
      required: ['code']
    }
  },
  {
    name: 'start_playtest',
    category: 'read',
    description: 'Start playtest (play or run mode). Poll output with get_playtest_output.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['play', 'run'] }
      },
      required: ['mode']
    }
  },
  {
    name: 'stop_playtest',
    category: 'read',
    description: 'Stop playtest and return all captured output.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_playtest_output',
    category: 'read',
    description: 'Poll playtest output buffer. Returns isRunning and messages.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'undo',
    category: 'write',
    description: 'Undo last Studio change.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'redo',
    category: 'write',
    description: 'Redo last undone Studio change.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'generate_build',
    category: 'write',
    description: `Generate a build via JS code. ONE call for the whole scene. Call get_build first when editing existing builds.

HIGH-LEVEL: room(x,y,z,w,h,d,wallKey,floorKey?,ceilKey?) roof(x,y,z,w,d,style,key) stairs(x1,y1,z1,x2,y2,z2,w,key) column(x,y,z,h,r,key) arch(x,y,z,w,h,thick,key) fence(x1,z1,x2,z2,y,key)
BASIC: part(x,y,z,sx,sy,sz,key,shape?,transp?) rpart(...,rx,ry,rz,...) wall(x1,z1,x2,z2,h,thick,key) floor(x1,z1,x2,z2,y,thick,key) fill(x1,y1,z1,x2,y2,z2,key) beam(x1,y1,z1,x2,y2,z2,thick,key)
REPEAT: row(x,y,z,n,sx,sz,fn) grid(x,y,z,nx,nz,sx,sz,fn)
Shapes: Block,Wedge,Cylinder,Ball,CornerWedge. Cylinders extend X-axis; upright=(h,dia,dia) rz=90. Max 10000 parts. Math+rng() available.`,
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        style: { type: 'string', enum: ['medieval', 'modern', 'nature', 'scifi', 'misc'] },
        palette: { type: 'object', description: '{"a":["BrickColor","Material"]}' },
        code: { type: 'string' },
        seed: { type: 'number' }
      },
      required: ['id', 'style', 'palette', 'code']
    }
  },
  {
    name: 'import_build',
    category: 'write',
    description: 'Import a build into Studio. Pass a library ID string or full build data object.',
    inputSchema: {
      type: 'object',
      properties: {
        buildData: {},
        targetPath: { type: 'string' },
        position: { type: 'array', items: { type: 'number' } }
      },
      required: ['buildData', 'targetPath']
    }
  },
  {
    name: 'get_build',
    category: 'read',
    description: 'Get a build from the library by ID. Always call before modifying an existing build.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  {
    name: 'import_scene',
    category: 'write',
    description: 'Import a full scene. Provide models (key→libraryId) and placements.',
    inputSchema: {
      type: 'object',
      properties: {
        sceneData: {
          type: 'object',
          properties: {
            models: { type: 'object' },
            place: { type: 'array' },
            custom: { type: 'array' }
          }
        },
        targetPath: { type: 'string' }
      },
      required: ['sceneData']
    }
  },
  {
    name: 'search_materials',
    category: 'read',
    description: 'Search MaterialVariant instances in MaterialService for use in build palettes.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        maxResults: { type: 'number' }
      }
    }
  },
  {
    name: 'search_assets',
    category: 'read',
    description: 'Search Roblox Creator Store. Requires ROBLOX_OPEN_CLOUD_API_KEY.',
    inputSchema: {
      type: 'object',
      properties: {
        assetType: { type: 'string', enum: ['Audio', 'Model', 'Decal', 'Plugin', 'MeshPart', 'Video', 'FontFamily'] },
        query: { type: 'string' },
        maxResults: { type: 'number' },
        sortBy: { type: 'string', enum: ['Relevance', 'Trending', 'Top', 'AudioDuration', 'CreateTime', 'UpdatedTime', 'Ratings'] },
        verifiedCreatorsOnly: { type: 'boolean' }
      },
      required: ['assetType']
    }
  },
  {
    name: 'insert_asset',
    category: 'write',
    description: 'Insert a Roblox asset into Studio by asset ID.',
    inputSchema: {
      type: 'object',
      properties: {
        assetId: { type: 'number' },
        parentPath: { type: 'string' },
        position: { type: 'object', properties: { x: { type: 'number' }, y: { type: 'number' }, z: { type: 'number' } } }
      },
      required: ['assetId']
    }
  },
  {
    name: 'capture_screenshot',
    category: 'read',
    description: 'Capture Studio viewport as PNG. Requires EditableImage API enabled in Game Settings.',
    inputSchema: { type: 'object', properties: {} }
  },
];

export const getReadOnlyTools = () => TOOL_DEFINITIONS.filter(t => t.category === 'read');
export const getAllTools = () => [...TOOL_DEFINITIONS];
