# Data Repository Setup Guide

**Purpose:** Keep JSON data files separate from code to prevent data loss during builds/deployments.

## Setup Steps

### 1. GitHub mein new repo create karo
- Repo name: **nexaVm-data**
- Make it **Public** (taaki deployment server easily access kar sake)
- Add README.md

### 2. GitHub repo URL set karo
Update `scripts/sync-data.ps1` mein:
```powershell
$repoUrl = "https://github.com/junaid1109/nexaVm-data.git"
```

### 3. First time setup - Initial push
```powershell
# Terminal mein chalao:
cd app/data
git init
git add *.json
git commit -m "Initial data files"
git remote add origin https://github.com/junaid1109/nexaVm-data.git
git push -u origin main
```

### 4. Development mein - Data pull karna
```powershell
./scripts/sync-data.ps1
```

### 5. Production mein - Deployment script
Deployment ke baad automatically data files sync ho jayenge

## File Structure
```
Main Project (nexaVm)
  ├── app/data/ (ignored in git)
  │   ├── blogs.json
  │   ├── boxes.json
  │   ├── customers.json
  │   ├── offices.json
  │   ├── partners.json
  │   └── admin.json
  └── scripts/
      └── sync-data.ps1 (sync karte hain separate repo se)

Separate Repo (nexaVm-data)
  └── *.json (master copies)
```

## How it works
1. Data changes → nexaVm-data repo mein push karo
2. Main project mein `sync-data.ps1` chalao
3. Latest data pull ho jayega
4. Build/Deploy safe rahega - data loss na hoga ✅
