# -*- coding: utf-8 -*-

import os
import json
from flask import Flask, render_template, url_for
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
settings = {}
moduleSections = []
modulesRoot ='static'
modulesLocation = os.listdir(modulesRoot)

# Geneating core from global json
if os.path.isfile('config.json'):
    data = json.load(open('config.json'))

    #Debug
    if debug: 
        seed(time.time())
        print ('Global json file found!')
        print (data["Load_Message"][randint(0, len(data["Load_Message"])-1)])
    #Debug End

    # Settings
    # Nice and simple
    settings = data["Settings"]

    # Main Menu buttons
    for moduleSection in data["groups"]:
        moduleSections.append(moduleSection)

# Generating modules from module files
for module in modulesLocation:
    if os.path.isfile(modulesRoot + '/' + module +'/config.json'):
        data = json.load(open(modulesRoot + "/" + module +'/config.json'))
        # Disabled check
        if not data["disable"]:

            #Debug
            if debug: print ("Loading module: " + module)
            #Debug End

            # All of the locations are optional
            # This might not be desired, will revist later
            if "icon_src" in data: data["icon_src"] = modulesRoot + "/" + module + "/" + data["icon_src"]
            if "page_src" in data: data["page_src"] = modulesRoot + "/" + module + "/" + data["page_src"]
            if "script_src" in data: 
                scripts = []
                for script in data["script_src"]: 
                    scripts.append(modulesRoot + "/" + module + "/" + script)
                data["script_src"] = scripts
                
            # Actually adding the data to something flask will read
            moduleSections[data["section"]]["modules"].append(data) 

# Ordering Modules
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
    return render_template('index.html', moduleSections = moduleSections, settings = settings)

if __name__ == "__main__":
    app.run(host=host, port=port, debug=debug)
