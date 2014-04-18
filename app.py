#!/usr/bin/env python
import os

from eve import Eve
from flask import url_for, redirect, send_from_directory

app = Eve()

@app.route('/media/<path:filename>')
def send_foo(filename):
    path = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(path, 'static'), filename)

if __name__ == '__main__':
    app.run(debug=True)