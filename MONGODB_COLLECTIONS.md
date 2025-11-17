# MongoDB Collections Reference

## ✅ Unique Collection Names - No Conflicts!

All Savage Squad CMS collections use the **`savagesquad_`** prefix, so you can safely use a **shared MongoDB database** with other sites.

---

## Collection Names

Your CMS will create these 4 collections in your MongoDB database:

| Collection Name | Purpose | Documents |
|----------------|---------|-----------|
| `savagesquad_site_content` | Main editable content | Text, images, links |
| `savagesquad_analytics` | Visitor tracking data | Daily stats |
| `savagesquad_content_versions` | Version history | Backup of all edits |
| `savagesquad_admin_sessions` | Admin login sessions | Session tokens |

---

## Database Options

### Option 1: Shared Database (Recommended if you have other sites)

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/my-shared-db
```

**Collections in `my-shared-db`:**
```
├── savagesquad_site_content      ← Savage Squad CMS
├── savagesquad_analytics         ← Savage Squad CMS
├── savagesquad_content_versions  ← Savage Squad CMS
├── savagesquad_admin_sessions    ← Savage Squad CMS
├── othersite_users               ← Your other site
├── othersite_posts               ← Your other site
└── blog_articles                 ← Another site
```

✅ **No conflicts!** All Savage Squad collections are prefixed.

---

### Option 2: Dedicated Database

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/savagesquad
```

**Collections in `savagesquad` database:**
```
├── savagesquad_site_content
├── savagesquad_analytics
├── savagesquad_content_versions
└── savagesquad_admin_sessions
```

✅ **Cleaner** if this is your only site.

---

## Collection Details

### 1. `savagesquad_site_content`
**Purpose:** Stores all editable website content

**Example Document:**
```json
{
  "_id": "...",
  "section_id": "hero_title",
  "content_type": "rich_text",
  "content": {
    "text": "Welcome to Savage Squad",
    "html": "<h1>Welcome to Savage Squad</h1>"
  },
  "metadata": {
    "section_name": "Hero Title",
    "page": "home",
    "order": 1
  },
  "updated_at": "2025-01-17T12:00:00Z",
  "updated_by": "admin@savagesquad.com"
}
```

**Indexes:**
- `section_id` (unique)
- `metadata.page`

---

### 2. `savagesquad_analytics`
**Purpose:** Track page views and visitors

**Example Document:**
```json
{
  "_id": "...",
  "date": "2025-01-17T00:00:00Z",
  "total_views": 1523,
  "unique_visitors": 842,
  "visitor_ips": ["hash1", "hash2", "..."],
  "page_views": {
    "home": 856,
    "about": 234,
    "contact": 433
  },
  "updated_at": "2025-01-17T23:59:59Z"
}
```

**Indexes:**
- `date` (unique)

---

### 3. `savagesquad_content_versions`
**Purpose:** Version history for undo/restore

**Example Document:**
```json
{
  "_id": "...",
  "section_id": "hero_title",
  "version": 3,
  "content_type": "rich_text",
  "content": {
    "text": "Old version of hero title",
    "html": "<h1>Old version of hero title</h1>"
  },
  "metadata": { "page": "home", "order": 1 },
  "created_at": "2025-01-17T12:00:00Z",
  "created_by": "admin@savagesquad.com",
  "change_description": "Content updated"
}
```

**Indexes:**
- `section_id`
- `{section_id: 1, version: -1}` (compound)

---

### 4. `savagesquad_admin_sessions` (Optional)
**Purpose:** Store admin login sessions

**Example Document:**
```json
{
  "_id": "...",
  "session_id": "abc123...",
  "email": "admin@savagesquad.com",
  "created_at": "2025-01-17T10:00:00Z",
  "expires_at": "2025-01-24T10:00:00Z",
  "last_activity": "2025-01-17T14:30:00Z"
}
```

**Indexes:**
- `session_id` (unique)
- `expires_at` (with TTL for auto-cleanup)

---

## Migration from Other Sites

If you already have content in different collections, you can:

1. **Keep both** - They won't conflict
2. **Migrate data** - Write a script to copy data to `savagesquad_*` collections
3. **Use multiple databases** - Point each site to its own database

---

## Verification

After connecting, verify your collections:

```javascript
// In MongoDB Compass or CLI
db.getCollectionNames()

// Should show:
[
  "savagesquad_site_content",
  "savagesquad_analytics",
  "savagesquad_content_versions",
  "savagesquad_admin_sessions"
]
```

---

## Summary

✅ **Safe to use shared MongoDB database**
✅ **All collections prefixed with `savagesquad_`**
✅ **No naming conflicts possible**
✅ **Indexes created automatically**
✅ **Version history isolated per site**

Your data is completely isolated from other sites! 🔒
