import webbrowser
import sys

line = sys.stdin.readline()

webbrowser.open("https://google.ca/#q=" + line)
webbrowser.open("http://internetthoughts.net/results?input=" + line)
