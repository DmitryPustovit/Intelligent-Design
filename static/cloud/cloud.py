import os
import json
import base64
from flask import Flask, redirect, request, session, render_template, url_for
import requests
import re
from apiclient.http import MediaFileUpload

import google.oauth2.credentials
from oauth2client.file import Storage
import google_auth_oauthlib.flow
import googleapiclient.discovery

CLIENT_SECRETS_FILE = "client_secret.json"

SCOPES =['https://www.googleapis.com/auth/drive']
API_SERVICE_NAME = "drive"
API_VERSION = "v3"

app.secret_key = os.urandom(24)

@app.route('/authorize')
def authorize():
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            CLIENT_SECRETS_FILE, 
            scopes=SCOPES,
            )

    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url( 
            access_type='offline',
            include_granted_scopes='true')

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

    return redirect("/")


@app.route('/upload', methods=['POST'])
def upload():

    image_b64 = request.values['imageBase64']
    image_data = re.sub('^data:image/.+;base64,', '', image_b64)
    future = open("image.png", "wb")
    future.write(image_data.decode('base64'))
    future.close()

    if 'credentials' not in session:
        return redirect(url_for('authorize'))

    credentials = google.oauth2.credentials.Credentials(**session['credentials'])

    drive_service = googleapiclient.discovery.build( API_SERVICE_NAME, API_VERSION, credentials=credentials)

    file_metadata = {'newimage': 'photo.png'}
    
    media = MediaFileUpload('image.png', mimetype='image/png')
    
    file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()

    return redirect('/')


@app.route('/revoke')
def revoke():
  if 'credentials' not in session:
    return 

  credentials = google.oauth2.credentials.Credentials(
    **session['credentials'])

  revoke = requests.post('https://accounts.google.com/o/oauth2/revoke',
      params={'token': credentials.token},
      headers = {'content-type': 'application/x-www-form-urlencoded'})
  
  status_code = getattr(revoke, 'status_code')
  if status_code == 200:
    return('Credentials successfully revoked.')
  else:
    return('An error occurred.')
  

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

