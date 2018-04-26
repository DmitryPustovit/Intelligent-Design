import os
import json
from flask import Flask, render_template, url_for
app = Flask(__name__)

print ("Generating Amazingness. Please Hold.")

moduleRoot ='static'
moduleLocation = os.listdir(moduleRoot)
modules = []

for module in moduleLocation:
    if os.path.isfile(moduleRoot + '/' + module +'/config.json'):
        #Order, Name, icon location, page location, popout, x, y, id
        data = json.load(open(moduleRoot + "/" + module +'/config.json'))
        modules.append([data["order"],data["name"], moduleRoot + "/" + module + "/" +
                        data["icon_src"], moduleRoot + "/" + module + "/" + data["page_src"], data["popout"],
                       data["defaultX"], data["defaultY"], data["id"], data["action"], data["action_function"]])

modules = sorted(modules,key=lambda l:l[0], reverse=False)

#for subdir, dirs, files in os.walk(moduleRoot):
#    for file in files:
#       print os.path.join(subdir, file)

#@app.errorhandler(500)
#def page_not_found(e):
#    return render_template('500.html'), 500

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('index.html', modules = modules)

if __name__ == "__main__":
    app.run()
