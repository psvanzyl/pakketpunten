#!/bin/bash
set -e
cd /root/pakketpunten
source venv/bin/activate

echo "[$(date)] Fetching carrier data..."
python scripts/dhl_grid_fetch.py 2>&1 | tail -3 || echo "DHL fetch had issues"
python scripts/dpd_fetch_all.py 2>&1 | tail -3 || echo "DPD fetch had issues"
python scripts/viatim_fetch_all.py 2>&1 | tail -3 || echo "ViaTim fetch had issues"
python scripts/budbee_fetch_all.py 2>&1 | tail -3 || echo "Budbee fetch had issues"

echo "[$(date)] Generating municipality data..."
python scripts/batch_generate.py 2>&1 | tail -5

echo "[$(date)] Creating national overview..."
python scripts/create_national_overview.py 2>&1 | tail -3

echo "[$(date)] Updating totals history..."
python scripts/update_totals_history.py 2>&1 | tail -3

echo "[$(date)] Restarting webapp..."
systemctl restart pakketpunten

echo "[$(date)] Data refresh complete!"
