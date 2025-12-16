import json
from datetime import datetime, timedelta

OUTPUT_FILE = "huge_data.json"
TOTAL_RECORDS = 1_000_000   # change this number for more/less data

# command to run the file python generate_big_file.py

start_time = datetime(2025, 1, 1)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    for i in range(1, TOTAL_RECORDS + 1):
        record = {
            "id": i,
            "username": f"user_{i}",
            "email": f"user_{i}@example.com",
            "isActive": i % 2 == 0,
            "createdAt": (start_time + timedelta(seconds=i)).isoformat() + "Z"
        }

        f.write(json.dumps(record) + "\n")

print(f"Generated {TOTAL_RECORDS} records in {OUTPUT_FILE}")
