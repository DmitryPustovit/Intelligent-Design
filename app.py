import os
import json
from flask import Flask, render_template, url_for

#  _______                    _ 
# |__   __|                  | |
#    | | ___  _ __ ___   ___ | |
#    | |/ _ \| '_ ` _ \ / _ \| |
#    | | (_) | | | | | | (_) |_|
#    |_|\___/|_| |_| |_|\___/(_)
#

#Sanity check message. Python Works!
print ("Generating Amazingness. Please Hold.")

# Global Configs
# Honestly, all of the bools should be false in a production enviorment
debug = False

# Tomo generates based on what modules are avalible making development simple
moduleSections = []
modulesRoot ='static'
modulesLocation = os.listdir(modulesRoot)

if os.path.isfile('config.json'):
    data = json.load(open('config.json'))
    for moduleSection in data["groups"]:
        moduleSections.append(moduleSection)

for module in modulesLocation:
    if os.path.isfile(modulesRoot + '/' + module +'/config.json'):
        data = json.load(open(modulesRoot + "/" + module +'/config.json'))
        if not data["disable"]:
            if debug: print ("Loading module: " + module)
            data["icon_src"] = modulesRoot + "/" + module + "/" + data["icon_src"]
            data["page_src"] = modulesRoot + "/" + module + "/" + data["page_src"]
            moduleSections[data["section"]]["modules"].append(data) 

for moduleSection in moduleSections:
    moduleSection["modules"] = sorted(moduleSection["modules"],key=lambda l:l["order"], reverse=False)

moduleSections = sorted(moduleSections,key=lambda l:l["order"], reverse=False)

#
# Flask specifc configs here 
# 

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('index.html', moduleSections = moduleSections)

if __name__ == '__main__':
    app.run(port=5000, debug=debug)
