import webbrowser
import sys

def search(arg):
    search = arg

    webbrowser.open("https://google.ca/#q=" + "+".join(search.strip().split()))


line = sys.stdin.readline()

    

search(line)
