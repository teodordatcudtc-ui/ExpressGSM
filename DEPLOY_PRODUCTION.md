# Deploy pe Hosting Tradițional (VPS, Shared Hosting, etc.)

## SQLite pe Hosting Real

Pe un host tradițional (nu serverless), SQLite funcționează **perfect**! Nu sunt limitări ca pe Vercel.

### Avantaje pe Hosting Tradițional:
✅ Sistem de fișiere writable permanent  
✅ Datele persistă între restarts  
✅ Nu sunt limitări serverless  
✅ Funcționează exact ca în development local  

## Pași pentru Deploy

### 1. Pregătirea Proiectului

```bash
# Build pentru producție
npm run build

# Test local
npm start
```

### 2. Upload pe Server

**Opțiuni:**
- **FTP/SFTP**: Upload manual al fișierelor
- **Git**: Clone repository pe server
- **SSH**: Deploy prin SSH

**Fișiere importante de upload:**
```
✓ .next/ (folder build)
✓ public/
✓ package.json
✓ next.config.js
✓ tsconfig.json
✓ tailwind.config.js
✓ postcss.config.js
✓ node_modules/ (sau instalează cu npm install)
```

**NU uploada:**
- `.git/`
- `node_modules/` (instalează pe server)
- `.env.local` (creează pe server)

### 3. Configurare pe Server

#### A. Instalare Dependențe

```bash
npm install --production
```

#### B. Variabile de Mediu

Creează `.env.local` pe server:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=parola_ta_secreta
NODE_ENV=production
```

#### C. Permisiuni pentru Baza de Date

```bash
# Creează folderul data dacă nu există
mkdir -p data

# Setează permisiuni (important!)
chmod 755 data
chmod 644 data/shop.db  # după ce se creează
```

### 4. Rulare Next.js

#### Opțiunea A: PM2 (Recomandat)

```bash
# Instalează PM2 global
npm install -g pm2

# Pornește aplicația
pm2 start npm --name "express-gsm" -- start

# Salvează configurația
pm2 save
pm2 startup
```

#### Opțiunea B: Systemd Service

Creează `/etc/systemd/system/express-gsm.service`:
```ini
[Unit]
Description=Express GSM Network
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/express-gsm-network
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Apoi:
```bash
sudo systemctl enable express-gsm
sudo systemctl start express-gsm
```

#### Opțiunea C: Nginx Reverse Proxy

Configurare Nginx (`/etc/nginx/sites-available/express-gsm`):
```nginx
server {
    listen 80;
    server_name domeniul-tau.ro www.domeniul-tau.ro;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activează:
```bash
sudo ln -s /etc/nginx/sites-available/express-gsm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL/HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d domeniul-tau.ro -d www.domeniul-tau.ro
```

## Backup Baza de Date

### Backup Manual

```bash
# Backup
cp data/shop.db data/shop.db.backup-$(date +%Y%m%d)

# Restore
cp data/shop.db.backup-YYYYMMDD data/shop.db
```

### Backup Automat (Cron)

Creează script `/path/to/backup-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
DB_PATH="/path/to/express-gsm-network/data/shop.db"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
cp $DB_PATH "$BACKUP_DIR/shop_$DATE.db"
# Șterge backup-urile mai vechi de 30 zile
find $BACKUP_DIR -name "shop_*.db" -mtime +30 -delete
```

Cron job (rulează zilnic la 2 AM):
```bash
crontab -e
# Adaugă:
0 2 * * * /path/to/backup-db.sh
```

## Structura Directoare pe Server

```
/var/www/express-gsm-network/
├── .next/              # Build Next.js
├── app/                # Cod sursă
├── components/         # Componente
├── lib/                # Utilitare
├── public/             # Fișiere statice
│   └── uploads/        # Imagini produse
├── data/               # Baza de date SQLite
│   └── shop.db         # Fișier baza de date
├── node_modules/       # Dependențe
├── package.json
└── .env.local          # Variabile de mediu
```

## Verificare Funcționare

1. **Verifică procesul:**
   ```bash
   pm2 status
   # sau
   sudo systemctl status express-gsm
   ```

2. **Verifică log-urile:**
   ```bash
   pm2 logs express-gsm
   # sau
   sudo journalctl -u express-gsm -f
   ```

3. **Testează aplicația:**
   - Accesează `http://domeniul-tau.ro`
   - Verifică admin: `http://domeniul-tau.ro/admin/login`
   - Testează adăugarea produselor
   - Verifică baza de date: `ls -lh data/shop.db`

## Probleme Comune

### Eroare: "Cannot write to database"
**Soluție:** Verifică permisiunile folderului `data/`
```bash
chmod 755 data
chown www-data:www-data data
```

### Eroare: "Port 3000 already in use"
**Soluție:** Schimbă portul sau oprește procesul vechi
```bash
# Găsește procesul
lsof -i :3000
# Oprește-l
kill -9 PID
```

### Baza de date nu se creează
**Soluție:** Verifică că folderul `data/` există și are permisiuni
```bash
mkdir -p data
chmod 755 data
```

## Migrare de la Development la Production

1. **Export date din development:**
   ```bash
   # Copiază baza de date
   cp data/shop.db data/shop.db.backup
   ```

2. **Upload pe server:**
   ```bash
   scp data/shop.db user@server:/path/to/express-gsm-network/data/
   ```

3. **Verifică permisiuni:**
   ```bash
   chmod 644 data/shop.db
   ```

## Monitorizare

### PM2 Monitoring
```bash
pm2 monit
```

### Logs
```bash
pm2 logs express-gsm --lines 100
```

## Actualizare Aplicație

```bash
# 1. Backup baza de date
cp data/shop.db data/shop.db.backup

# 2. Pull noile modificări
git pull

# 3. Instalează dependențe noi
npm install

# 4. Rebuild
npm run build

# 5. Restart
pm2 restart express-gsm
```

## Concluzie

Pe hosting tradițional, SQLite funcționează **perfect** fără modificări! Tot ce trebuie să faci:

1. ✅ Upload fișierele
2. ✅ Instalează dependențe (`npm install`)
3. ✅ Configurează variabile de mediu
4. ✅ Setează permisiuni pentru folderul `data/`
5. ✅ Pornește aplicația (PM2 sau systemd)
6. ✅ Configurează Nginx/Apache ca reverse proxy
7. ✅ Activează SSL cu Let's Encrypt

**Nu ai nevoie de baze de date externe sau servicii suplimentare!** 🎉

