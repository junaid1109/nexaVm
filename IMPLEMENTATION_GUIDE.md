# Implementation Steps for Separate Data Repository

## ✅ Done in Main Project
- `.gitignore` updated - data files excluded ✓
- `sync-data.ps1` script created ✓
- `DATA_SETUP.md` guide created ✓

## 📝 Manual Setup Required

### Step 1: Create GitHub Repository
```
GitHub Website → Create New Repository
Repository Name: nexaVm-data
Description: Data files for NexaVM project (blogs, customers, partners, etc)
Visibility: Public
Initialize with: README.md
```

GitHub repo URL: `https://github.com/junaid1109/nexaVm-data`

### Step 2: Initialize Data Repository (First Time Only)
```powershell
# Navigate to project root
cd "d:\xampp\htdocs\project\sanq\nex\Website-main\app\data"

# Initialize git in data folder
git init

# Add all JSON files
git add *.json

# Commit
git commit -m "Initial data files - blogs, customers, partners, etc"

# Add remote
git remote add origin https://github.com/junaid1109/nexaVm-data.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Update Main Project
From project root:
```powershell
# Commit .gitignore and setup files
git add .gitignore DATA_SETUP.md scripts/sync-data.ps1
git commit -m "Add data repository setup - separate data management"
git push
```

### Step 4: Verify Setup
```powershell
# Test sync script
.\scripts\sync-data.ps1

# Check if data files are present
Get-ChildItem app/data
```

## 📊 Now Your Architecture Looks Like:

```
GitHub - NexaVM (Main Code)
├── All code files
├── .gitignore (data files excluded)
├── scripts/sync-data.ps1
└── ❌ NO JSON data files

GitHub - NexaVM-Data (Data Repository)
├── blogs.json
├── boxes.json
├── customers.json
├── offices.json
├── partners.json
└── admin.json
```

## 🔄 Workflow

### Development
```powershell
# Pull latest data
.\scripts\sync-data.ps1

# Make changes
npm run dev

# Update data? Push to nexaVm-data repo
```

### Deployment
```powershell
# Build happens without data conflicts
npm run build

# Post-deployment, sync data
.\scripts\sync-data.ps1

# Done! Data is fresh
```

## ✨ Benefits
✅ Data never lost during builds
✅ Code and data Management separate
✅ Easy rollback of data/code independently  
✅ Multiple environments can have different data
✅ GitHub acting as backup

## 🆘 If Data is Already in Git
```powershell
# Remove from git history
git rm --cached app/data/*.json
git commit -m "Remove JSON data files from tracking"
git push

# Then switch to new data repo
```

Ready? 🚀
