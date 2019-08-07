# -*- coding: utf-8 -*-

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

# These are only used in debug, not sure how bad this is
import time
from random import seed
from random import randint



#  _______                    _ 
# |__   __|                  | |
#    | | ___  _ __ ___   ___ | |
#    | |/ _ \| '_ ` _ \ / _ \| |
#    | | (_) | | | | | | (_) |_|
#    |_|\___/|_| |_| |_|\___/(_)
#

#
# Sanity check message. 
# Congrats! Python Works!
#
print ("Python Sanity Check. You can never be too careful. :)")

#
# Global Configs
# Honestly, all of the bools should be false in a production enviorment
# Changing things here can break things in production
# Avoid commiting any changes if you are testing locally 
# All of these should be overwritten in a production enviorment or should default to the production value
#
debug = bool(os.environ.get('DEBUG', True))
host = '0.0.0.0'
port = int(os.environ.get('PORT', 5000))

# 
# Tomo auto generation
# Tomo generates based on what modules are avalible making development simple
# Everything is based on config.json files
# This needs to be documented a bit better once it's not as subject to change
# Not Sure if a lot of these should go into the configs section or if they should be in a config json file
#
moduleSections = []
modulesRoot ='static'
modulesLocation = os.listdir(modulesRoot)

CLIENT_SECRETS_FILE = "client_secret.json"

SCOPES =['https://www.googleapis.com/auth/drive']
API_SERVICE_NAME = "drive"
API_VERSION = "v3"

app.secret_key = os.urandom(24)

# Geneating core from global json
if os.path.isfile('config.json'):
    data = json.load(open('config.json'))
    #Debug
    if debug: 
        seed(time.time())
        print ('Global json file found!')
        print (data["Load_Message"][randint(0, len(data["Load_Message"])-1)])
    #Debug End
    for moduleSection in data["groups"]:
        moduleSections.append(moduleSection)

# Generating modules from module files
for module in modulesLocation:
    if os.path.isfile(modulesRoot + '/' + module +'/config.json'):
        data = json.load(open(modulesRoot + "/" + module +'/config.json'))
        if not data["disable"]:
            #Debug
            if debug: print ("Loading module: " + module)
            #Debug End
            data["icon_src"] = modulesRoot + "/" + module + "/" + data["icon_src"]
            data["page_src"] = modulesRoot + "/" + module + "/" + data["page_src"]
            moduleSections[data["section"]]["modules"].append(data) 

for moduleSection in moduleSections:
    moduleSection["modules"] = sorted(moduleSection["modules"],key=lambda l:l["order"], reverse=False)

moduleSections = sorted(moduleSections,key=lambda l:l["order"], reverse=False)

#
# Flask specifc configs here 
# This controls the actual page endpoint
# Flask alone is not a production ready enviroment as it will warn you
# Everything should load twice in the console for some reason
# In production it is run with gunicorn
# 
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('index.html', moduleSections = moduleSections)
  
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

