import os
import json
from flask import Flask, redirect, session, render_template, url_for
import requests

import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

app = Flask(__name__)

print ("Generating Amazingness. Please Hold.")

moduleSections = []
modulesRoot ='static'
modulesLocation = os.listdir(modulesRoot)

CLIENT_SECRETS_FILE = "client_secret.json"

SCOPES =['https://www.googleapis.com/auth/drive']
API_SERVICE_NAME = "drive"
API_VERSION = "v2"

app.secret_key = os.urandom(24)

if os.path.isfile('config.json'):
    data = json.load(open('config.json'))
    for moduleSection in data["groups"]:
        moduleSections.append(moduleSection)

for module in modulesLocation:
    if os.path.isfile(modulesRoot + '/' + module +'/config.json'):
        data = json.load(open(modulesRoot + "/" + module +'/config.json'))
        data["icon_src"] = modulesRoot + "/" + module + "/" + data["icon_src"]
        data["page_src"] = modulesRoot + "/" + module + "/" + data["page_src"]
        moduleSections[data["section"]]["modules"].append(data)


for moduleSection in moduleSections:
    moduleSection["modules"] = sorted(moduleSection["modules"],key=lambda l:l["order"], reverse=False)

moduleSections = sorted(moduleSections,key=lambda l:l["order"], reverse=False)

@app.errorhandler(500)
def page_not_found(e):
    return render_template('500.html'), 500

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('index.html', moduleSections = moduleSections)

@app.route('/authorize')
def authorize():
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            CLIENT_SECRETS_FILE, 
            scopes=SCOPES,
            )

    flow.redirect_uri = 'https://127.0.0.1:5000/oauth2callback'

    authorization_url, state = flow.authorization_url( access_type='offline', include_granted_scopes='true')

    session['state'] = state

    return redirect(authorization_url)


@app.route('/oauth2callback')
def oauth2callback():
    state = session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)

    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)

    return redirect('/')


@app.route('/upload')
def upload():

    if 'credentials' not in session:
        return redirect(url_for('authorize'))

    imagefile = flask.request.files.get('imagefile', '')

    credentials = google.oauth2.credentials.Credentials(**session['credentials'])

    file_metadata = {'name': 'photo.jpg'}
    
    media = MediaFileUpload('files/photo.jpg', mimetype='image/jpeg')
    
    file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()

    return redirect('/')

@app.route('/revoke')
def revoke():
  if 'credentials' not in flask.session:
    return ('You need to <a href="/authorize">authorize</a> before ' +
            'testing the code to revoke credentials.')

  credentials = google.oauth2.credentials.Credentials(
    **session['credentials'])

  revoke = requests.post('https://accounts.google.com/o/oauth2/revoke',
      params={'token': credentials.token},
      headers = {'content-type': 'application/x-www-form-urlencoded'})
  return

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

if __name__ == "__main__":
    
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1' #do not let this into live
    
    app.run()



