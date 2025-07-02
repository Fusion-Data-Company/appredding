#!/bin/bash
echo "Running production prep..."
npm run build
npm prune --production
echo "Build complete. Check dist/ folder"