# Recipe Tree

## Local Development

### Frontend

`cd client` to access the frontend folder

Run `nvm use` to use the nvm version

Run `npm ci` to install requirements

Run `npm run dev` to run local website

### Backend

`cd server` to access the backend folder

Recommend using a virtualenv - `python3.12 -m venv .venv`, then `source .venv/bin/activate`

`pip install -r requirements.txt` to install requirements

`PYTHONPATH=. fastapi dev app.py` to run local server
