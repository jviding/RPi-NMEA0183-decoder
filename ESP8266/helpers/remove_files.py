import os

# Remove all contents from a directory

def wipe(path):
  for file_or_dir in os.listdir(path):
    new_path = path + "/" + file_or_dir
    try:
      print("Opening", new_path)
      wipe(new_path)
    except:
      print("Not a dir, removing")
    try:
      print("Removing", new_path)
      os.remove(new_path)
    except:
      print("Couldn't remove")

